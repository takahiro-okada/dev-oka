import SectionTitle from "@/components/ui/SectionTitle";
import WorksFilter from "@/components/ui/WorksFilter";
import { getWorkList } from "@/lib/microcms";

export default async function WorksPage() {
  const workList = await getWorkList();
  const categories = ['ALL', ...new Set(workList.contents.flatMap(work => work.category))];

  return (
    <div className="max-w-(--content-width) mx-auto px-5">
      <SectionTitle>My Works</SectionTitle>


      <WorksFilter works={workList.contents} categories={categories} />
    </div>
  );
}
