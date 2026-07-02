import type {
  ActivitySourceKey,
  ActivityTimelineEntry,
} from "@/lib/activityLog";

type ActivityTimelineProps = {
  entries: ActivityTimelineEntry[];
};

const sourceStyles = {
  github: {
    label: "GitHub",
    className: "bg-gray-800 text-white",
  },
  note: {
    label: "note",
    className: "bg-emerald-500 text-white",
  },
  okalog: {
    label: "okalog",
    className: "bg-amber-500 text-white",
  },
  youtube: {
    label: "YouTube",
    className: "bg-red-500 text-white",
  },
} satisfies Record<ActivitySourceKey, { className: string; label: string }>;

const formatTimelineDate = (dateString: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

export default function ActivityTimeline({ entries }: ActivityTimelineProps) {
  if (entries.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 px-5 py-8 text-center text-sm text-gray-500">
        Activity is not available yet.
      </p>
    );
  }

  return (
    <ol className="relative border-l border-gray-200 pl-5">
      {entries.map((entry) => {
        const source = sourceStyles[entry.source];
        const title = (
          <>
            <span
              className={`inline-flex shrink-0 items-center rounded px-2 py-1 text-xs font-bold ${source.className}`}
            >
              {source.label}
            </span>
            <span className="text-base font-bold text-gray-900">
              {entry.title}
            </span>
          </>
        );

        return (
          <li key={entry.id} className="relative pb-8 last:pb-0">
            <span className="-left-[27px] absolute mt-1 size-3 rounded-full border-2 border-white bg-gray-900" />
            <time className="text-sm font-semibold text-gray-500">
              {formatTimelineDate(entry.date)}
            </time>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-wrap items-center gap-2 hover:opacity-70"
                >
                  {title}
                </a>
              ) : (
                <div className="inline-flex flex-wrap items-center gap-2">
                  {title}
                </div>
              )}
            </div>

            {entry.description && (
              <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                {entry.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
