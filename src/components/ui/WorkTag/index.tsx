type WorkTagProps = {
  techs?: string[];
};

export default function WorkTag(work: WorkTagProps) {
  return (
    <div className="flex gap-1.5">
      {work.techs?.map((tech, index) => (
        <span
          key={index}
          className="bg-[#ECF3F6] px-2.5 py-1 rounded-md text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
