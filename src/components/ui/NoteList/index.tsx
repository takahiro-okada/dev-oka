import type { Note } from "@/lib/microcms";
import NoteCard from "../NoteCard";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className="grid gap-2.5 mt-8">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          href={`/notes/${note.id}`}
          imageSrc={note.thumbnail?.url}
          alt={note.title}
          title={note.title}
          date={note.publishedAt}
          transitionId={note.id}
        />
      ))}
    </ul>
  );
}
