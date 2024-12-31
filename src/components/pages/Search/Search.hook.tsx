import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSearchMovie from "./hooks/useSearchMovie";
import useSearchTv from "./hooks/useSearchTv";
import useSearchMulti from "./hooks/useSearchMulti";

const useSearch = () => {
  const params = useSearchParams();
  const query = params.get("query");

  const [active, setActive] = useState("none");
  const [page, setPage] = useState(1);

  const { data: searchMovieResult, isLoading: isSearchMovieResultLoading } = useSearchMovie({
    payload: {
      keyword: query,
      page: page,
      adult: false,
    },
  });

  const { data: searchTvResult, isLoading: isSearchTvResultLoading } = useSearchTv({
    payload: {
      keyword: query,
      page: page,
      adult: false,
    },
  });

  const { data: searchMultiResult, isLoading: isSearchMultiResultLoading } = useSearchMulti({
    payload: {
      keyword: query,
      page: page,
      adult: false,
    },
  });

  const isLoading = useMemo(() => {
    return isSearchMovieResultLoading && isSearchTvResultLoading && isSearchMultiResultLoading;
  }, [isSearchMovieResultLoading, isSearchTvResultLoading, isSearchMultiResultLoading]);

  const totalPage = useMemo(() => {
    switch (active) {
      case "movie":
        return searchMovieResult?.total_pages;
      case "tv":
        return searchTvResult?.total_pages;
    }
  }, [active]);

  const searchResult = useMemo(() => {
    switch (active) {
      case "movie":
        return searchMovieResult;
      case "tv":
        return searchTvResult;
    }
  }, [searchMovieResult, searchTvResult, active]);

  useEffect(() => {
    if (!isLoading) {
      if (searchMovieResult?.total_pages > searchTvResult?.total_pages) {
        setActive("movie");
      } else {
        setActive("tv");
      }
    }
  }, [searchMovieResult, searchTvResult, isLoading]);

  const allMetaData = {
    movie: searchMovieResult,
    tv: searchTvResult,
  };

  return {
    searchMovieResult,
    searchTvResult,
    searchMultiResult,
    allMetaData,
    isLoading,
    page,
    setPage,
    active,
    setActive,
    totalPage,
    searchResult,
  };
};

export default useSearch;
