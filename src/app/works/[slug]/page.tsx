import { getWork } from "@/lib/microcms";
import { formatDate } from "@/utils/formatDate";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWork(slug);

  return (
    <article className="max-w-(--content-width) mx-auto ">
      <div className="px-5 pt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {work.title}
        </h1>
        <time className="text-gray-500 text-sm">
          {formatDate(work.publishedAt || work.createdAt)}
        </time>
      </div>

      {work.content && (
        <div className="px-5 pt-8">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: work.content }}
          />
        </div>
      )}
    </article>
  );
}