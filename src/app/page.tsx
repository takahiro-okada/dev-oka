import Image from "next/image";
import Header from "@/components/layouts/Header";
import SnsIcons from "@/components/ui/SnsIcons";
import WorkCard from "@/components/ui/WorkCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <section>
        <div className="max-w-(--content-width) mx-auto px-4">
          <div className="py-20 md:flex md:gap-10">
            <div datatype="mv-text">
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
            <div className="mt-10 md:mt-0 md:flex-shrink-0 rounded-lg">
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
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="max-w-(--content-width) mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-just-me-again-down-here">
            My Activity
          </h2>
          <p className="mt-4">Coming soon...</p>
        </div>
      </section>

      {/* Works */}
      <section className="mt-16 mb-20 bg-[#f7fafc] py-20 relative">
        <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-4xl md:text-6xl font-just-me-again-down-here">
            My Works
          </h2>
        </div>
        <div className="max-w-(--content-width) mx-auto px-4">
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <WorkCard
                key={index}
                imageSrc="/images/sample.jpg"
                alt={`Work ${index + 1}`}
                title={"Work Title 1Work Title 1Work Title 1Work Title 1"}
                tag="#personal"
                techs={["Next.js", "TypeScript", "Tailwind", "Tailwind", "Tailwind"]}
                href="#"
              />
            ))}
          </ul>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="px-6 py-2 bg-[#f7fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#e2e8f0] transition-colors"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
