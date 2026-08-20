"use client";

/**
 * Profile — /u/[id] page. Shows account info + tabs (Favorites / Watchlist /
 * Rated). Login-protected: redirects to /login when there is no session.
 *
 * Uses useSearchParams for the active tab so views are shareable/deep-linkable;
 * the page wrapper provides a <Suspense> boundary (required by Next 15 CSR
 * bailout — same lesson as the /search page).
 */
import useProfile from "./Profile.hook";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomTabs from "@/components/shared/CustomTabs";
import Loader from "@/components/shared/Loader";
import { generateImageUrl } from "@/components/shared/Helper/Helper";
import Link from "next/link";
import type { AccountListKind, AccountMediaItem, AccountMediaType } from "@/types";

const TAB_OPTIONS = [
  { label: "Favorites", value: "favorite" },
  { label: "Watchlist", value: "watchlist" },
  { label: "Rated", value: "rated" },
];

const MEDIA_OPTIONS: { label: string; value: AccountMediaType }[] = [
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

const Profile = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = TAB_OPTIONS.some((t) => t.value === tabParam)
    ? (tabParam as AccountListKind)
    : "favorite";

  const mediaParam = searchParams.get("media");
  const activeMedia = MEDIA_OPTIONS.some((m) => m.value === mediaParam)
    ? (mediaParam as AccountMediaType)
    : "movie";

  const { username, isLoading, items } = useProfile({ activeTab, activeMedia });
  const pathname = usePathname();
  const router = useRouter();

  const setTab = (updates: { tab?: AccountListKind; media?: AccountMediaType }) => {
    const next = new URLSearchParams();
    const nextTab = updates.tab ?? activeTab;
    const nextMedia = updates.media ?? (updates.tab ? undefined : activeMedia);
    if (nextTab) next.set("tab", nextTab);
    if (nextMedia) next.set("media", nextMedia);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="px-4 md:px-12 py-8 min-h-[70vh]">
      {/* Account info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center uppercase w-16 h-16 rounded-full bg-[#ffc300] text-black text-2xl font-bold">
          {username?.charAt(0) ?? "?"}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{username || "My Profile"}</h1>
          <p className="opacity-60">@{username}</p>
        </div>
      </div>

      {/* Tabs */}
      <CustomTabs
        Tabs={TAB_OPTIONS}
        onChange={(val) => setTab({ tab: val as AccountListKind })}
      />

      {/* Movie/TV sub-switcher */}
      <div className="mt-6 mb-4">
        <div className="flex gap-2">
          {MEDIA_OPTIONS.map((opt) => {
            const selected = activeMedia === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTab({ media: opt.value })}
                className={`px-4 py-1 rounded-full text-sm font-bold border transition ${
                  selected
                    ? "bg-[#ffc300] text-black border-[#ffc300]"
                    : "border-[#374151] text-white hover:border-[#ffc300]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Media list */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader size={28} />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center opacity-60 py-16">
          No {activeTab === "rated" ? "rated" : activeTab} titles here yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <ProfileCard key={`${item.id}-${item.media_type ?? activeMedia}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileCard = ({ item }: { item: AccountMediaItem }) => {
  const mediaType = item.media_type ?? "movie";
  const title = item.title ?? item.name ?? "Untitled";
  const href = mediaType === "movie" ? `/movie/${item.id}` : `/tv-series/${item.id}`;

  return (
    <Link href={href} className="group block">
      <div className="rounded-lg overflow-hidden border border-[#374151] group-hover:border-[#ffc300] transition">
        {item.poster_path ? (
          <img
            src={generateImageUrl(item.poster_path)}
            alt={title}
            className="w-full aspect-[2/3] object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-[#1a1a2e] flex items-center justify-center text-sm opacity-50">
            No image
          </div>
        )}
      </div>
      <h3 className="mt-2 text-sm font-bold line-clamp-2">{title}</h3>
      <p className="text-xs opacity-50">
        {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || ""}
      </p>
      {typeof item.rating === "number" && (
        <p className="text-xs mt-1 text-[#ffc300] font-bold">Your rating: {item.rating}</p>
      )}
    </Link>
  );
};

export default Profile;
