import SectionTitle from "@/components/ui/SectionTitle";
import NoteCard from "@/components/ui/NoteCard";
import { getNoteList } from "@/lib/microcms";

export default async function NotesPage() {
  const noteList = await getNoteList();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Notes</SectionTitle>

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
