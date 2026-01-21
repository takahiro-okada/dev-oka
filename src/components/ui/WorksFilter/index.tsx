"use client";

import { useState } from "react";
import WorkCard from "@/components/ui/WorkCard";

interface Work {
  id: string;
  title: string;
  thumbnail?: {
    url: string;
  };
  techs: string[];
}

export default function WorksFilter({
  works,
  categories,
}: {
  works: Work[];
  categories: string[];
}) {
  return (
    <>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {works.map((work) => (
          <WorkCard
            key={work.id}
            imageSrc={work.thumbnail?.url}
            alt="Work"
            title={work.title}
            techs={work.techs}
            href={`/works/${work.id}`}
          />
        ))}
      </ul>
    </>
  );
}
