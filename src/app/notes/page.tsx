import SectionTitle from "@/components/ui/SectionTitle";
import NoteCard from "@/components/ui/NoteCard";

export default function NotesPage() {
  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Notes</SectionTitle>

      <ul className="grid gap-2.5 mt-8">
        <NoteCard
          href="/"
          imageSrc="/images/sample1.jpeg"
          alt="Note Thumbnail"
          title={
            "Note Title　Note Title　Note Title　Note Title　Note Title　Note Title　Note Title　Note Title"
          }
          date="2024-01-01"
        />
        <NoteCard
          href="/"
          imageSrc="/images/sample2.png"
          alt="Note Thumbnail"
          title="Note Title"
          date="2024-01-01"
        />
        <NoteCard
          href="/"
          imageSrc="/images/sample3.JPG"
          alt="Note Thumbnail"
          title="Note Title"
          date="2024-01-01"
        />
        <NoteCard
          href="/"
          imageSrc="/images/sample4.jpeg"
          alt="Note Thumbnail"
          title="Note Title"
          date="2024-01-01"
        />
      </ul>
    </div>
  );
}
