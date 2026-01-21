import { createPageMetadata } from "@/utils/createMetadata";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkCard from "@/components/ui/WorkCard";
import { getWorkList } from "@/lib/microcms";

export const metadata = createPageMetadata("works");

export default async function WorksPage() {
  const works = await getWorkList();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Works</SectionTitle>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {works.contents.map((work) => (
          <WorkCard
            key={work.id}
            imageSrc={work.thumbnail?.url}
            alt="Work"
            title={work.title}
            techs={work.techs}
            href={`/works/${work.id}`}
          />
        ))}
      </ul>
    </div>
  );
}
