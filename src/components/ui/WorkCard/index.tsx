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
    <li className="relative">
      <span className="absolute right-[-20] top-[-10] text-2xl font-just-me-again-down-here rotate-20 text-[#F16A3B] font-bold">
        Click Me
      </span>
      <Link href={href} className="">
        <div className="">
          <Image
            src={imageSrc}
            alt={alt}
            width={307}
            height={230}
            className="rounded-lg w-full object-cover aspect-[232/154]"
          />
        </div>
        <div className="">
          <div className="flex items-center gap-1 mt-2">
            <h3 className="font-bold">{title}</h3>
          </div>
          <div className="flex gap-1.5 mt-2.5">
            <WorkTag techs={techs} />
          </div>
        </div>
      </Link>
    </li>
  );
}
