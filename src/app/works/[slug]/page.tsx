import Link from "next/dist/client/link";
import Image from "next/image";

import LinkButton from "@/components/ui/LinkButton";
import WorkTag from "@/components/ui/WorkTag";
import { getWork } from "@/lib/microcms";
import { createArticleMetadata } from "@/utils/createMetadata";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWork(slug);

  return createArticleMetadata(
    work.title,
    work.summary || "Portfolio project",
    work.thumbnail?.url,
    work.publishedAt,
    "article",
  );
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWork(slug);

  return (
    <>
      <article className="max-w-(--content-width) mx-auto px-4">
        {work.thumbnail && (
          <div className="w-full">
            <Image
              src={work.thumbnail.url}
              alt={work.title}
              width={work.thumbnail.width}
              height={work.thumbnail.height}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="pt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {work.title}
          </h1>
          <div>
            {work.url && (
              <div className="font-bold">
                Link:{" "}
                <Link className="text-[#F16A3B] font-bold" href={work.url}>
                  {work.url}
                </Link>
              </div>
            )}
            {work.github && (
              <div className="font-bold">
                GitHub:{" "}
                <Link className="text-[#F16A3B] font-bold" href={work.github}>
                  {work.github}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <WorkTag techs={work.techs} />
        </div>

        {work.summary && (
          <div className="mt-16 relative">
            <span className="text-5xl absolute left-[20] top-[-30] font-just-me-again-down-here text-[#F16A3B] z-10">
              Summary
            </span>
            <div className="w-full rounded-xl bg-[#ECF3F6] relative p-8 text-base">
              {work.summary}
            </div>
          </div>
        )}

        {work.contents?.map((item, index) => (
          <div key={index} className="mt-12">
            <h2 className="font-extrabold text-2xl">{item.contentTitle}</h2>

            <div className="mt-4">
              <div className="flex flex-row items-start gap-x-4 justify-start">
                <div className="shrink-0">
                  <Image
                    src="/images/icon-oka.png"
                    alt={work.title}
                    width={80}
                    height={80}
                    className="h-auto rounded-lg aspect-square object-cover border border-[#ECF3F6]"
                  />
                </div>

                <div className="w-full rounded-xl bg-[#ECF3F6] relative p-4 text-base leading-normal before:absolute before:top-5 before:h-0 before:w-0 before:border-[12px] before:border-y-8 before:border-transparent before:border-r-[#ECF3F6] before:-left-6">
                  <div
                    className="ballon-content"
                    dangerouslySetInnerHTML={{
                      __html: item.contentDescription,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </article>
      <div className="flex justify-center mt-16">
        <LinkButton href="/works/">Back to works</LinkButton>
      </div>
    </>
  );
}
