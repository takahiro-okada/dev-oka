import SectionTitle from "@/components/ui/SectionTitle";
import WorkList from "@/components/ui/WorkList";
import { getWorkList } from "@/lib/microcms";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata("works");

export default async function WorksPage() {
  const works = await getWorkList();

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Works</SectionTitle>

      <WorkList works={works.contents} />
    </div>
  );
}
