"use client";

import Aos from "aos";
import Link from "next/link";
import { useEffect } from "react";
import type { Genre, Keyword } from "@/types";

/**
 * CategoryChips — section "Or maybe something a bit more...".
 *
 * Renders a cloud of category chips (genres first, then keywords) in a single
 * flex-wrap container. Each chip links to the app's internal category/keyword
 * page:
 *   - Genre:   /genre/{id}-{slug}
 *   - Keyword: /keyword/{id}-{slug}
 *
 * The target pages do not exist yet (404 for now); the route shape mirrors
 * TMDB's so the pages can be built later without changing these links.
 * Renders nothing when both genres and keywords are empty (or still loading).
 * Styling follows the existing chip pattern used in the sidebar Keywords block
 * (bg-gray-700 + border rounded) and each chip carries the same
 * `data-aos="fade-up"` animation as that block.
 */
interface CategoryChipsProps {
  genres?: Genre[];
  keywords?: Keyword[];
  isLoading?: boolean;
}

/** TMDB URL slug: "Science Fiction" -> "science-fiction", "black hole" -> "black-hole". */
const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CategoryChips = ({
  genres,
  keywords,
  isLoading,
}: CategoryChipsProps) => {
  const hasGenres = genres && genres.length > 0;
  const hasKeywords = keywords && keywords.length > 0;

  // AOS is init'd once at the layout level; the chips render after async data
  // arrives (keywords load separately from detail), so re-scan the DOM for
  // `data-aos` nodes whenever the chips change.
  useEffect(() => {
    Aos.refresh();
  }, [genres, keywords, isLoading]);

  if (isLoading || (!hasGenres && !hasKeywords)) return null;

  return (
    <section className="mt-8" aria-label="Or maybe something a bit more">
      <h3 className="font-bold text-2xl mb-4">
        Or maybe something a bit more...
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres?.map((genre) => (
          <Link
            key={`genre-${genre.id}`}
            href={`/genre/${genre.id}-${slugify(genre.name)}`}
          >
            <span
              className="inline-block bg-gray-700 p-1 px-2 border rounded border-[var(--border-light)]"
              data-aos="fade-up"
            >
              {genre.name}
            </span>
          </Link>
        ))}
        {keywords?.map((keyword) => (
          <Link
            key={`keyword-${keyword.id}`}
            href={`/keyword/${keyword.id}-${slugify(keyword.name)}`}
          >
            <span
              className="inline-block bg-gray-700 p-1 px-2 border rounded border-[var(--border-light)]"
              data-aos="fade-up"
            >
              {keyword.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryChips;
