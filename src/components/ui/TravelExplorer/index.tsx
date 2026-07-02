"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { TravelLog } from "@/lib/microcms";
import { formatDate } from "@/utils/formatDate";

type TravelExplorerProps = {
  logs: TravelLog[];
};

const getCoverPhoto = (log: TravelLog) => log.photos?.[0] ?? log.photo;

const getPhotos = (log: TravelLog) =>
  log.photos?.length ? log.photos : log.photo ? [log.photo] : [];

const hasCoordinates = (
  log: TravelLog,
): log is TravelLog & { latitude: number; longitude: number } =>
  typeof log.latitude === "number" && typeof log.longitude === "number";

const toPinPosition = (latitude: number, longitude: number) => ({
  left: `${((longitude + 180) / 360) * 100}%`,
  top: `${((90 - latitude) / 180) * 100}%`,
});

const MAP_VERTICAL_LINES = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];
const MAP_HORIZONTAL_LINES = [0, 100, 200, 300, 400, 500];

export default function TravelExplorer({ logs }: TravelExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>("all");
  const selectedLog = logs.find((log) => log.id === selectedId);
  const visibleLogs = selectedLog ? [selectedLog] : logs;
  const logsWithCoordinates = useMemo(
    () => logs.filter(hasCoordinates),
    [logs],
  );

  if (logs.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 px-5 py-8 text-center text-sm text-gray-500">
        Travel logs are not available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div>
        <div className="relative aspect-[2/1] overflow-hidden rounded-lg border border-gray-200 bg-[#dcecf2]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 500"
            className="absolute inset-0 h-full w-full"
          >
            <rect width="1000" height="500" fill="#dcecf2" />
            <g stroke="#c2d3dc" strokeWidth="1">
              {MAP_VERTICAL_LINES.map((x) => (
                <line key={`vertical-${x}`} x1={x} y1="0" x2={x} y2="500" />
              ))}
              {MAP_HORIZONTAL_LINES.map((y) => (
                <line key={`horizontal-${y}`} x1="0" y1={y} x2="1000" y2={y} />
              ))}
            </g>
            <g fill="#f7fbf9" stroke="#b9c9c5" strokeWidth="2">
              <path d="M116 120L170 82L248 92L303 135L280 198L226 219L189 252L129 232L92 181Z" />
              <path d="M248 225L304 251L327 316L306 392L254 451L224 387L199 322L214 268Z" />
              <path d="M455 105L541 86L648 109L721 151L688 207L601 212L531 194L463 173Z" />
              <path d="M500 211L586 224L620 291L594 372L536 407L491 348L472 282Z" />
              <path d="M664 190L736 159L827 189L891 243L850 305L774 284L706 242Z" />
              <path d="M777 325L828 310L873 348L858 400L807 395Z" />
              <path d="M885 360L928 377L944 429L907 444L876 407Z" />
              <path d="M21 382L86 370L131 397L114 430L42 425Z" />
            </g>
          </svg>
          {logsWithCoordinates.map((log) => {
            const isSelected = selectedId === log.id;

            return (
              <button
                key={log.id}
                type="button"
                onClick={() => setSelectedId(log.id)}
                className={`absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition ${
                  isSelected
                    ? "scale-125 bg-[#F16A3B]"
                    : "bg-gray-900 hover:scale-110"
                }`}
                style={toPinPosition(log.latitude, log.longitude)}
                aria-label={log.place}
              />
            );
          })}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Logs</h2>
            <button
              type="button"
              onClick={() => setSelectedId("all")}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-gray-400"
            >
              All
            </button>
          </div>

          <ol className="grid gap-5 md:grid-cols-2">
            {visibleLogs.map((log) => {
              const photos = getPhotos(log);
              const coverPhoto = getCoverPhoto(log);

              return (
                <li
                  key={log.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  {coverPhoto ? (
                    <Image
                      src={coverPhoto.url}
                      alt={log.place}
                      width={coverPhoto.width}
                      height={coverPhoto.height}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-[#edf3f5]" />
                  )}
                  <div className="p-4">
                    <time className="text-sm font-semibold text-gray-500">
                      {formatDate(log.visitedAt)}
                    </time>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {log.title ?? log.place}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {[log.place, log.country].filter(Boolean).join(", ")}
                    </p>
                    {log.description && (
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {log.description}
                      </p>
                    )}
                    {photos.length > 1 && (
                      <ul className="mt-4 grid grid-cols-4 gap-2">
                        {photos.slice(1, 5).map((photo) => (
                          <li
                            key={photo.url}
                            className="overflow-hidden rounded bg-[#edf3f5]"
                          >
                            <Image
                              src={photo.url}
                              alt=""
                              width={photo.width}
                              height={photo.height}
                              className="aspect-square w-full object-cover"
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <aside>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Dates</h2>
        <ol className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
          {logs.map((log) => {
            const isSelected = selectedId === log.id;

            return (
              <li key={log.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setSelectedId(log.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <time className="block text-sm font-semibold opacity-70">
                    {formatDate(log.visitedAt)}
                  </time>
                  <span className="mt-1 block whitespace-nowrap text-sm font-bold">
                    {log.place}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
