import Image from "next/image";
import LinkButton from "@/components/ui/LinkButton";
import WorkCard from "@/components/ui/WorkCard";
import { getLatestWorks } from "@/lib/microcms";

export default async function AboutPage() {
  const works = await getLatestWorks();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <h1 className="text-5xl font-bold mt-8">About Me</h1>

      {/* Introduction */}
      <div className="mt-8">
        <h2 className="text-4xl font-semibold">
          A Passionate Engineer Exploring New Horizons in NZ
        </h2>
        <p className="mt-4 text-lg">
          Hello! I'm Takahiro Okada, a passionate developer and tech enthusiast.
          I love creating web applications and sharing my knowledge with the
          community. Welcome to my personal website where I share my notes,
          projects, and more!
        </p>
      </div>

      {/* Current Status & Location */}
      <div className="mt-8">
        <h2 className="text-4xl font-semibold">Current Status & Location</h2>

        <div className="flex gap-3 mt-4 bg-[#ECF3F6] p-6 rounded-lg">
          <div className="md:shrink-0 w-16 flex items-center">
            <Image
              src="/images/icon-visa.png"
              alt=""
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="">
            <ul className="list-disc pl-5">
              <li>
                Location: <strong>Christchurch, NZ</strong>
              </li>
              <li>
                Visa Status: <strong>Student Visa</strong> (Authorized to work
                up to 25 hours per week)
              </li>
              <li>
                Availability: Ready to start immediately and flexible with
                shifts.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Work Schedule */}
      <div className="mt-8">
        <h2 className="text-4xl font-semibold">Work Schedule</h2>

        <div className="flex gap-3 mt-4 bg-[#ECF3F6] p-6 rounded-lg">
          <div className="md:shrink-0 w-16 flex items-center">
            <Image
              src="/images/icon-schedule.png"
              alt=""
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="">
            <ul className="list-disc pl-5">
              <li>Mon / Tue: 4:00 PM – 10:00 PM</li>
              <li>Wed – Fri: 1:00 PM – 10:00 PM</li>
              <li>Sat / Sun: 8:00 AM – 10:00 PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project */}
      <div className="mt-8">
        <h2 className="text-4xl font-semibold">Personal Project</h2>

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

      {/* Work Experience */}
    </div>
  );
}
