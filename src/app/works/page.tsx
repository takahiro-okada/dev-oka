import SectionTitle from "@/components/ui/SectionTitle";
import WorkCard from "@/components/ui/WorkCard";

export default function WorksPage() {
  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Works</SectionTitle>


      <div className="flex gap-4 mt-12">
        <button className="px-4 py-2 rounded-md border border-black">
          ALL
        </button>
        <button className="px-4 py-2 border border-black rounded-md">
          PERSONAL
        </button>
        <button className="px-4 py-2 border border-black rounded-md">
          CLIENT
        </button>
      </div>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <WorkCard
            key={index}
            imageSrc="/images/sample.jpg"
            alt={`Work ${index + 1}`}
            title={"Work Title 1Work Title 1Work Title 1Work Title 1"}
            tag="#personal"
            techs={[
              "Next.js",
              "TypeScript",
              "Tailwind",
              "Tailwind",
              "Tailwind",
            ]}
            href="#"
          />
        ))}
      </ul>
    </div>
  );
}
