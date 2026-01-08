import Image from "next/image";
import Link from "next/link";

type NoteCardProps = {
  href: string;
  imageSrc: string;
  alt: string;
  title: string;
  date?: string;
};

export default function NoteCard({ href, imageSrc, alt, title, date }: NoteCardProps) {
  return (
    <li>
      <Link href={href} className="flex items-center md:gap-8 gap-6 py-2 rounded-lg">
        <Image
          src={imageSrc}
          alt={alt}
          width={100}
          height={100}
          className="w-rounded-lg bg-[#ecf3f6] object-cover rounded-3xl aspect-square"
        />
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {date && <time className="text-sm text-gray-500">{date}</time>}
        </div>
      </Link>
    </li>
  );
}