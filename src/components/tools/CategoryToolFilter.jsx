"use client";

import { useState, useMemo } from "react";
import { ToolCard } from "@/components/ui/ToolCard";

export function CategoryToolFilter({ categories, toolsData }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const isAllSelected = activeCategory === null;

  const selectedCategory = useMemo(() => {
    if (isAllSelected) return null;
    return categories.find((c) => c.id === activeCategory);
  }, [activeCategory, categories, isAllSelected]);

  const filteredTools = useMemo(() => {
    if (isAllSelected) return null;
    return toolsData.filter((tool) => tool.category === activeCategory);
  }, [activeCategory, toolsData, isAllSelected]);

  return (
    <>
      <nav className="flex flex-wrap gap-2 mt-6 mb-8 justify-center" aria-label="Tool categories">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            isAllSelected
              ? "bg-brand text-white"
              : "bg-card border border-border text-text-muted hover:border-brand-light hover:text-brand"
          }`}
          aria-current={isAllSelected ? "page" : undefined}
        >
          All
        </button>
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "bg-card border border-border text-text-muted hover:border-brand-light hover:text-brand"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {cat.icon} {cat.name}
            </button>
          );
        })}
      </nav>

      {isAllSelected ? (
        categories.map((category, catIdx) => {
          const categoryTools = toolsData.filter((t) => t.category === category.id);
          if (categoryTools.length === 0) return null;
          return (
            <div key={category.id} className="mb-8 last:mb-0">
              <h3 className="text-lg font-semibold text-text mb-6 text-left">{category.icon} {category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {categoryTools.map((tool, idx) => (
                  <ToolCard key={tool.slug} tool={tool} delay={(catIdx * 0.05) + (idx * 0.03)} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div key={activeCategory} className="mb-8">
          <h3 className="text-lg font-semibold text-text mb-6 text-left">{selectedCategory?.icon} {selectedCategory?.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredTools?.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} delay={idx * 0.03} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
