// Preload only in CI to build and smoke-test without production CMS credentials.
if (
  process.env.MICROCMS_SERVICE_DOMAIN !== "ci-build" ||
  process.env.MICROCMS_API_KEY !== "ci-placeholder"
) {
  throw new Error(
    "CMS fixtures require the dedicated CI placeholder credentials",
  );
}

const originalFetch = globalThis.fetch;
const timestamp = "2026-01-01T00:00:00.000Z";
const common = {
  createdAt: timestamp,
  updatedAt: timestamp,
  publishedAt: timestamp,
  revisedAt: timestamp,
  thumbnail: { url: "/images/myself.jpg", width: 307, height: 230 },
};
const fixtures = {
  notes: {
    ...common,
    id: "ci-note",
    title: "CI fixture note",
    description: "A note used to verify production rendering.",
    category: { ...common, id: "ci-category", name: "CI" },
    content: "<p>CI fixture note body</p>",
  },
  work: {
    ...common,
    id: "ci-work",
    title: "CI fixture work",
    techs: ["Next.js"],
    summary: "CI fixture work summary",
    contents: [
      {
        fieldId: "content",
        contentTitle: "Build verification",
        contentDescription: "<p>CI fixture work body</p>",
      },
    ],
  },
  travel: {
    ...common,
    id: "ci-travel",
    place: "Christchurch",
    country: "New Zealand",
    visitedAt: timestamp,
    latitude: -43.532,
    longitude: 172.6362,
  },
};

globalThis.fetch = async (input, init) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url,
  );
  if (url.hostname !== "ci-build.microcms.io") {
    return originalFetch(input, init);
  }
  const method =
    init?.method ?? (input instanceof Request ? input.method : "GET");
  if (method !== "GET") throw new Error(`Unexpected CMS method: ${method}`);
  const [, api, version, endpoint, id] = url.pathname.split("/");
  const fixture = fixtures[endpoint];
  if (
    api !== "api" ||
    version !== "v1" ||
    !fixture ||
    (id && id !== fixture.id)
  ) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }
  return Response.json(
    id ? fixture : { contents: [fixture], totalCount: 1, offset: 0, limit: 10 },
  );
};
