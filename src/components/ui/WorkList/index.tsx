import type { Work } from "@/lib/microcms";
import WorkCard from "../WorkCard";

type WorkListProps = {
  works: Work[];
};

export default function WorkList({ works }: WorkListProps) {
  return (
    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {works.map((work) => (
        <WorkCard
          key={work.id}
          href={`/works/${work.id}`}
          imageSrc={work.thumbnail?.url || "/images/default.jpeg"}
          alt={work.title}
          title={work.title}
          techs={work.techs}
        />
      ))}
    </ul>
  );
}
