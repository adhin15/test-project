import { generateImageUrl } from "@/components/shared/Helper/Helper";
import Link from "next/link";
import type { MovieSummary, SeriesSummary } from "@/types";

const SearchResult = ({ data, type }: { data: MovieSummary | SeriesSummary; type: string }) => {
  const redirectType = (type: string) => {
    if (type === "movie") {
      return `/${type + "/" + data?.id}`;
    }
    return `/${"tv-series" + "/" + data?.id}/`;
  };

  const title = "title" in data ? data.title : data.name;
  const release = "release_date" in data ? data.release_date : data.first_air_date;

  return (
    <div className="mb-5 transition-transform duration-100 transform hover:scale-105 peer">
      <Link href={redirectType(type)}>
        <div className="flex box-shadow border-[1px] border-[#374151] rounded-[8px] gap-[12px]">
          <img
            className="lazy-load-image max-w-[120px] rounded-l-[8px] object-cover	"
            src={generateImageUrl(data?.backdrop_path)}
            alt=""
          />
          <div className="p-[20px]">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="flex gap-[4px] text-sm items-center font-bold">
              <span>{release}</span>
            </div>
            <p className="text-sm my-[12px] text-overflow-ellipsis">{data?.overview}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
