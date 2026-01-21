import { getNote } from "@/lib/microcms";
import { createArticleMetadata } from "@/utils/createMetadata";
import { formatDate } from "@/utils/formatDate";

interface NotesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NotesPageProps) {
  const { slug } = await params;
  const note = await getNote(slug);

  return createArticleMetadata(
    note.title,
    note.description || note.content?.substring(0, 160),
    note.thumbnail?.url,
    note.publishedAt,
    "article",
  );
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const note = await getNote(slug);

  return (
    <article className="max-w-(--content-width) mx-auto ">
      <div className="px-5 pt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {note.title}
        </h1>
        <time className="text-gray-500 text-sm">
          {formatDate(note.publishedAt || note.createdAt)}
        </time>
      </div>

      <div className="px-5 pt-8">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </article>
  );
}
