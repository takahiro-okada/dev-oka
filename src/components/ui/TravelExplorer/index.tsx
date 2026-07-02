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
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 bg-[#edf3f5]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:12.5%_25%]" />
          <div className="absolute inset-x-[14%] top-[24%] h-[52%] rounded-[50%] border border-gray-300 bg-white/55" />
          <div className="absolute inset-x-[24%] top-[34%] h-[34%] rounded-[50%] border border-gray-300" />
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
