import Image from "next/image";

import LinkButton from "@/components/ui/LinkButton";
import NoteCard from "@/components/ui/NoteCard";
import SectionTitle from "@/components/ui/SectionTitle";
import SnsIcons from "@/components/ui/SnsIcons";
import WorkCard from "@/components/ui/WorkCard";
import { getLatestNotes, getLatestWorks } from "@/lib/microcms";
import { createPageMetadata } from "@/utils/createMetadata";
import { formatDate } from "@/utils/formatDate";

export const metadata = createPageMetadata("home");

export default async function Home() {
  const notes = await getLatestNotes();
  const works = await getLatestWorks();

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

      {/* Works */}
      <section className="mt-16 mb-20 bg-[#f7fafc] py-20 relative">
        <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <SectionTitle>My Works</SectionTitle>
        </div>
        <div className="max-w-(--content-width) mx-auto px-5">
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

          <div className="mt-12 text-center">
            <LinkButton href="/works/">READ MORE</LinkButton>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mt-16">
        <div className="max-w-(--content-width) mx-auto px-5">
          <SectionTitle>My Notes</SectionTitle>

          <ul className="grid gap-2.5 mt-8">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                href={`/notes/${note.id}`}
                imageSrc={note.thumbnail?.url || "/images/default.jpeg"}
                alt={note.title}
                title={note.title}
                date={formatDate(note.publishedAt)}
              />
            ))}
          </ul>

          <div className="mt-12 text-center">
            <LinkButton href="/notes">READ MORE</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
