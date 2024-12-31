"use client";

import Pagination from "@/components/shared/Pagination";
import SearchSkeleton from "@/components/shared/Skeleton/SearchSkeleton";
import SearchResult from "./components/SearchResult";
import useSearch from "./Search.hook";

const SearchPage = () => {
  const { searchResult, allMetaData, isLoading, page, setPage, active, setActive, totalPage } = useSearch();

  return (
    <div className="flex py-12 px-4 md:px-12">
      <div className="w-1/3 pr-4">
        <div className="bg-fff border rounded border-[#59677d] min-h-[120px] overflow-hidden">
          <div className="bg-main-accent p-4">
            <h4 className="font-bold text-black">Search Result</h4>
          </div>
          <div>
            <div
              className={`flex justify-between py-2 px-4 hover:opacity-75 cursor-pointer ${
                active == "movie" ? "bg-[#012459]" : ""
              }`}
              onClick={() => {
                setActive("movie");
              }}
            >
              <span>Movies</span>
              <span>{allMetaData?.movie?.total_results}</span>
            </div>
            <div
              className={`flex justify-between py-2 px-4 hover:opacity-75 cursor-pointer ${
                active == "tv" ? "bg-[#012459]" : ""
              }`}
              onClick={() => {
                setActive("tv");
              }}
            >
              <span>Tv Shows</span>
              <span>{allMetaData?.tv?.total_results}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 pl-4">
        <div>
          {!isLoading ? (
            searchResult?.results?.map((val: any, index: any) => {
              return (
                <div data-aos="fade-up" data-aos-delay={100} key={index}>
                  <SearchResult data={val} type={active} />
                </div>
              );
            })
          ) : (
            <>
              <SearchSkeleton />
              <SearchSkeleton />
              <SearchSkeleton />
              <SearchSkeleton />
              <SearchSkeleton />
            </>
          )}
          <div>
            <Pagination totalPages={totalPage} currentPage={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
