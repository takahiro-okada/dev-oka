import Image from "next/image";
import Link from "next/link";
import WorkTag from "../WorkTag";

type Props = {
  title?: string;
  tag?: string;
  techs?: string[];
  href?: string;
  imageSrc?: string;
  alt?: string;
};

export default function WorkCard({
  title = "Work Title",
  techs = [],
  href = "#",
  imageSrc = "/images/sample.jpg",
  alt = "Work",
}: Props) {
  return (
    <li className="relative group">
      <h2 className="absolute right-[-14px] top-[-12px] z-10 text-2xl font-just-me-again-down-here rotate-12 text-[#F16A3B] font-bold transition-transform group-hover:rotate-6">
        Click Me
      </h2>
      <Link
        href={href}
        className="block rounded-lg outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#F16A3B] focus-visible:ring-offset-4"
      >
        <div className="overflow-hidden rounded-lg bg-[#ECF3F6]">
          <Image
            src={imageSrc}
            alt={alt}
            width={307}
            height={230}
            className="w-full object-cover aspect-[232/154] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div>
          <div className="flex items-center gap-1 mt-2">
            <h3 className="font-bold leading-snug">{title}</h3>
          </div>
          <div className="flex gap-1.5 mt-2.5">
            <WorkTag techs={techs} />
          </div>
        </div>
      </Link>
    </li>
  );
}
