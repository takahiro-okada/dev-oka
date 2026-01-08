import Image from "next/image";
import Header from "@/components/layouts/Header";
import SnsIcons from "@/components/ui/SnsIcons";
import WorkCard from "@/components/ui/WorkCard";
import SectionTitle from "@/components/ui/SectionTitle";
import NoteCard from "@/components/ui/NoteCard";
import LinkButton from "@/components/ui/LinkButton";

export default function Home() {
  return (
    <>
      <section>
        <div className="max-w-(--content-width) mx-auto px-5">
          <div className="md:py-20 md:flex md:flex-row-reverse md:gap-10">
            <div datatype="mv-image" className="md:shrink-0 rounded-lg">
              <Image
                src="/images/myself.jpg"
                alt="Takahiro Okada"
                width={307}
                height={230}
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-4">
                <SnsIcons />
              </div>
            </div>
            <div datatype="mv-text" className="mt-8 md:mt-0">
              <p>
                I'm <strong>Takahiro Okada</strong>, a Web Engineer based in
                Japan.
              </p>
              <p className="mt-4">
                I've worked at a production company building e-commerce sites
                with Shopify, and served as a Web Engineer at a business
                company.
              </p>
              <p className="mt-4">
                From February 2026, I'll be studying Computer Science at Lincoln
                University in New Zealand while working as an IT Engineer.
              </p>
              <p className="mt-4">
                I'm a proud father of three boys in a family of five. I also
                love traveling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="max-w-(--content-width) mx-auto px-5">
          <SectionTitle>My Activity</SectionTitle>

          <p className="mt-4">Coming soon...</p>
        </div>
      </section>

      {/* Works */}
      <section className="mt-16 mb-20 bg-[#f7fafc] py-20 relative">
        <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <SectionTitle>My Works</SectionTitle>
        </div>
        <div className="max-w-(--content-width) mx-auto px-5">
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
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

          <div className="mt-12 text-center">
            <LinkButton href="/works" />
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mt-16">
        <div className="max-w-(--content-width) mx-auto px-5">
          <SectionTitle>My Notes</SectionTitle>

          <ul className="grid gap-2.5 mt-8">
            <NoteCard
              href="/"
              imageSrc="/images/sample1.jpeg"
              alt="Note Thumbnail"
              title={
                "Note Title　Note Title　Note Title　Note Title　Note Title　Note Title　Note Title　Note Title"
              }
              date="2024-01-01"
            />
            <NoteCard
              href="/"
              imageSrc="/images/sample2.png"
              alt="Note Thumbnail"
              title="Note Title"
              date="2024-01-01"
            />
            <NoteCard
              href="/"
              imageSrc="/images/sample3.JPG"
              alt="Note Thumbnail"
              title="Note Title"
              date="2024-01-01"
            />
            <NoteCard
              href="/"
              imageSrc="/images/sample4.jpeg"
              alt="Note Thumbnail"
              title="Note Title"
              date="2024-01-01"
            />
          </ul>

          <div className="mt-12 text-center">
            <LinkButton href="/notes" />
          </div>
        </div>
      </section>
    </>
  );
}
