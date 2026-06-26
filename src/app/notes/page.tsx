import NoteList from "@/components/ui/NoteList";
import { getNoteList } from "@/lib/microcms";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata("notes");

export default async function NotesPage() {
  const noteList = await getNoteList();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <NoteList notes={noteList.contents} />
    </div>
  );
}
