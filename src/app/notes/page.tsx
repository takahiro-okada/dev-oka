import NoteCard from "@/components/ui/NoteCard";
import { getNoteList } from "@/lib/microcms";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata("notes");

export default async function NotesPage() {
  const noteList = await getNoteList();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <ul className="grid gap-2.5 mt-8">
        {noteList.contents.map((note) => (
          <NoteCard
            key={note.id}
            href={`/notes/${note.id}`}
            imageSrc={note.thumbnail?.url}
            alt="Note Thumbnail"
            title={note.title}
            date={note.publishedAt}
          />
        ))}
      </ul>
    </div>
  );
}
