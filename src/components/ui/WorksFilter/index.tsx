'use client';

import { useState } from 'react';
import WorkCard from '@/components/ui/WorkCard'

interface Work {
  id: string;
  title: string;
  thumbnail?: {
    url: string;
  };
  category: string[];
}

export default function WorksFilter({ works, categories }: { works: Work[]; categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredWorks = selectedCategory === 'ALL'
    ? works
    : works.filter(work => work.category.includes(selectedCategory));

  return (
    <>
      <div className="flex gap-4 mt-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md border transition-colors ${selectedCategory === category
              ? 'border-black bg-black text-white'
              : 'border-black hover:bg-gray-100'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            imageSrc={work.thumbnail?.url}
            alt="Work"
            title={work.title}
            tag={work.category[0]}
            techs={work.category}
            href={`/works/${work.id}`}
          />
        ))}
      </ul>
    </>
  );
}