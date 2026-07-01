export type ActivitySourceKey = "github" | "note" | "okalog" | "youtube";

export type MonthlyActivity = {
  month: string;
  values: Record<ActivitySourceKey, number>;
};

type ActivityPeriod = {
  endExclusive: Date;
  label: string;
  months: Array<{
    key: string;
    label: string;
    start: Date;
  }>;
  start: Date;
};

type GitHubSearchResponse = {
  items?: Array<{
    created_at?: string;
    pull_request?: {
      merged_at?: string | null;
    };
    repository_url?: string;
    state?: string;
  }>;
};

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        commitContributionsByRepository?: Array<{
          repository?: {
            createdAt?: string;
            nameWithOwner?: string;
            owner?: {
              login?: string;
            };
          };
        }>;
      };
    };
  };
};

type GitHubRepository = {
  created_at?: string;
  full_name?: string;
};

type NoteContentsResponse = {
  data?: {
    contents?: Array<{
      publishAt?: string;
    }>;
    isLastPage?: boolean;
  };
};

type WordPressPost = {
  date?: string;
};

type YouTubeChannelsResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items?: Array<{
    contentDetails?: {
      videoPublishedAt?: string;
    };
    snippet?: {
      publishedAt?: string;
    };
  }>;
  nextPageToken?: string;
};

const SOURCE_KEYS = ["github", "note", "okalog", "youtube"] as const;
const MONTH_COUNT = 12;
const REVALIDATE_SECONDS = 60 * 60 * 6;

const createEmptyValues = (): Record<ActivitySourceKey, number> => ({
  github: 0,
  note: 0,
  okalog: 0,
  youtube: 0,
});

const createPeriod = (now = new Date()): ActivityPeriod => {
  const currentMonthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const start = new Date(
    Date.UTC(
      currentMonthStart.getUTCFullYear(),
      currentMonthStart.getUTCMonth() - (MONTH_COUNT - 1),
      1,
    ),
  );
  const endExclusive = new Date(
    Date.UTC(
      currentMonthStart.getUTCFullYear(),
      currentMonthStart.getUTCMonth() + 1,
      1,
    ),
  );
  const months = Array.from({ length: MONTH_COUNT }, (_, index) => {
    const date = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + index, 1),
    );

    return {
      key: toMonthKey(date),
      label: `${date.getUTCMonth() + 1}月`,
      start: date,
    };
  });
  const firstMonth = months[0].start;
  const lastMonth = months[months.length - 1].start;

  return {
    endExclusive,
    label: `${formatPeriodMonth(firstMonth)} - ${formatPeriodMonth(lastMonth)}`,
    months,
    start,
  };
};

const formatPeriodMonth = (date: Date) =>
  `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

const toMonthKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

const toDateKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getUTCDate()).padStart(2, "0")}`;

const getMonthKeyFromDateString = (dateString?: string) => {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return toMonthKey(date);
};

const isBeforePeriod = (
  dateString: string | undefined,
  period: ActivityPeriod,
) => {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);

  return !Number.isNaN(date.getTime()) && date < period.start;
};

const addCount = (
  monthlyActivities: MonthlyActivity[],
  sourceKey: ActivitySourceKey,
  dateString: string | undefined,
) => {
  const monthKey = getMonthKeyFromDateString(dateString);

  if (!monthKey) {
    return;
  }

  const activity = monthlyActivities.find((item) => item.month === monthKey);

  if (activity) {
    activity.values[sourceKey] += 1;
  }
};

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const fetchGitHubCounts = async (
  period: ActivityPeriod,
  monthlyActivities: MonthlyActivity[],
) => {
  const username = process.env.ACTIVITY_GITHUB_USERNAME;
  const token = process.env.ACTIVITY_GITHUB_TOKEN;

  if (!username || !token) {
    return;
  }

  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: `
        query ActivityRepositories($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              commitContributionsByRepository(maxRepositories: 100) {
                repository {
                  createdAt
                  nameWithOwner
                  owner {
                    login
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        from: period.start.toISOString(),
        login: username,
        to: new Date().toISOString(),
      },
    }),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    method: "POST",
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repositories: ${response.status}`);
  }

  const json = (await response.json()) as GitHubContributionsResponse;
  const repositoryContributions =
    json.data?.user?.contributionsCollection?.commitContributionsByRepository ??
    [];
  const activityRepositoryNames = new Set(
    repositoryContributions
      .map((contribution) => contribution.repository?.nameWithOwner)
      .filter((name): name is string => Boolean(name)),
  );

  for (const repositoryName of await fetchGitHubPullRequestCounts({
    period,
    monthlyActivities,
    token,
    username,
  })) {
    activityRepositoryNames.add(repositoryName);
  }

  for (const repository of await fetchGitHubRepositories(username, token)) {
    if (
      repository.full_name &&
      activityRepositoryNames.has(repository.full_name)
    ) {
      addCount(monthlyActivities, "github", repository.created_at);
    }
  }
};

const fetchGitHubRepositories = async (username: string, token: string) => {
  const repositories: GitHubRepository[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const url = new URL(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
    );
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "created");
    url.searchParams.set("direction", "desc");

    const repos = await fetchJson<GitHubRepository[]>(url.toString(), {
      headers: {
        authorization: `Bearer ${token}`,
        "user-agent": "activity-log",
      },
    });

    repositories.push(...repos);

    if (repos.length < 100) {
      break;
    }
  }

  return repositories;
};

const fetchGitHubPullRequestCounts = async ({
  period,
  monthlyActivities,
  token,
  username,
}: {
  period: ActivityPeriod;
  monthlyActivities: MonthlyActivity[];
  token: string;
  username: string;
}) => {
  const repositoryNames = new Set<string>();
  const lastDay = new Date(period.endExclusive.getTime() - 1);
  const query = [
    "is:public",
    "type:pr",
    `author:${username}`,
    `created:${toDateKey(period.start)}..${toDateKey(lastDay)}`,
  ].join(" ");

  for (let page = 1; page <= 10; page += 1) {
    const url = new URL("https://api.github.com/search/issues");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("q", query);

    const json = await fetchJson<GitHubSearchResponse>(url.toString(), {
      headers: {
        authorization: `Bearer ${token}`,
        "user-agent": "activity-log",
      },
    });
    const items = json.items ?? [];

    for (const item of items) {
      if (item.state === "open" || item.pull_request?.merged_at) {
        addCount(monthlyActivities, "github", item.created_at);

        if (item.repository_url) {
          repositoryNames.add(item.repository_url.split("/repos/")[1]);
        }
      }
    }

    if (items.length < 100) {
      break;
    }
  }

  return repositoryNames;
};

const fetchNoteCounts = async (
  period: ActivityPeriod,
  monthlyActivities: MonthlyActivity[],
) => {
  const username = process.env.ACTIVITY_NOTE_USERNAME;

  if (!username) {
    return;
  }

  for (let page = 1; page <= 30; page += 1) {
    const json = await fetchJson<NoteContentsResponse>(
      `https://note.com/api/v2/creators/${encodeURIComponent(
        username,
      )}/contents?kind=note&page=${page}`,
    );
    const contents = json.data?.contents ?? [];

    for (const content of contents) {
      addCount(monthlyActivities, "note", content.publishAt);
    }

    if (
      json.data?.isLastPage ||
      contents.some((content) => isBeforePeriod(content.publishAt, period))
    ) {
      break;
    }
  }
};

const fetchOkaLogCounts = async (
  period: ActivityPeriod,
  monthlyActivities: MonthlyActivity[],
) => {
  const baseUrl = process.env.ACTIVITY_OKALOG_BASE_URL;

  if (!baseUrl) {
    return;
  }

  const url = new URL("/wp-json/wp/v2/posts", baseUrl);
  url.searchParams.set("after", period.start.toISOString());
  url.searchParams.set("before", period.endExclusive.toISOString());
  url.searchParams.set("orderby", "date");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", "100");
  url.searchParams.set("_fields", "date");

  for (let page = 1; page <= 10; page += 1) {
    url.searchParams.set("page", String(page));

    const posts = await fetchJson<WordPressPost[]>(url.toString());

    for (const post of posts) {
      addCount(monthlyActivities, "okalog", post.date);
    }

    if (posts.length < 100) {
      break;
    }
  }
};

const fetchYouTubeCounts = async (
  period: ActivityPeriod,
  monthlyActivities: MonthlyActivity[],
) => {
  const apiKey = process.env.ACTIVITY_YOUTUBE_API_KEY;
  const handle = process.env.ACTIVITY_YOUTUBE_HANDLE;

  if (!apiKey || !handle) {
    return;
  }

  const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
  channelUrl.searchParams.set("part", "contentDetails");
  channelUrl.searchParams.set("forHandle", `@${handle.replace(/^@/, "")}`);
  channelUrl.searchParams.set("key", apiKey);

  const channelJson = await fetchJson<YouTubeChannelsResponse>(
    channelUrl.toString(),
  );
  const uploadsPlaylistId =
    channelJson.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    return;
  }

  let pageToken: string | undefined;

  for (let page = 1; page <= 20; page += 1) {
    const playlistUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems",
    );
    playlistUrl.searchParams.set("part", "contentDetails,snippet");
    playlistUrl.searchParams.set("maxResults", "50");
    playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
    playlistUrl.searchParams.set("key", apiKey);

    if (pageToken) {
      playlistUrl.searchParams.set("pageToken", pageToken);
    }

    const playlistJson = await fetchJson<YouTubePlaylistItemsResponse>(
      playlistUrl.toString(),
    );
    const items = playlistJson.items ?? [];

    for (const item of items) {
      addCount(
        monthlyActivities,
        "youtube",
        item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt,
      );
    }

    if (
      !playlistJson.nextPageToken ||
      items.some((item) =>
        isBeforePeriod(
          item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt,
          period,
        ),
      )
    ) {
      break;
    }

    pageToken = playlistJson.nextPageToken;
  }
};

export const getActivityLog = async () => {
  const period = createPeriod();
  const monthlyActivities = period.months.map<MonthlyActivity>((month) => ({
    month: month.key,
    values: createEmptyValues(),
  }));

  await Promise.allSettled([
    fetchGitHubCounts(period, monthlyActivities),
    fetchNoteCounts(period, monthlyActivities),
    fetchOkaLogCounts(period, monthlyActivities),
    fetchYouTubeCounts(period, monthlyActivities),
  ]);

  return {
    monthlyActivities: monthlyActivities.map((activity, index) => ({
      ...activity,
      month: period.months[index].label,
    })),
    periodLabel: period.label,
    sources: SOURCE_KEYS,
  };
};
