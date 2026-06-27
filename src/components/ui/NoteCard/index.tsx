import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/formatDate";

type NoteCardProps = {
  href: string;
  imageSrc?: string;
  alt: string;
  title: string;
  date?: string;
};

export default function NoteCard({
  href,
  imageSrc,
  alt,
  title,
  date,
}: NoteCardProps) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-5 rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-[#ECF3F6] hover:bg-[#f7fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16A3B] focus-visible:ring-offset-4 md:gap-7"
      >
        {imageSrc ? (
          <div className="shrink-0 overflow-hidden rounded-2xl bg-[#ecf3f6]">
            <Image
              src={imageSrc}
              alt={alt}
              width={88}
              height={88}
              className="h-22 w-22 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-22 w-22 shrink-0 rounded-2xl bg-[#ecf3f6]" />
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug group-hover:text-[#F16A3B]">
            {title}
          </h3>
          {date && (
            <time className="mt-1 block text-sm text-gray-500">
              {formatDate(date)}
            </time>
          )}
        </div>
      </Link>
    </li>
  );
}
