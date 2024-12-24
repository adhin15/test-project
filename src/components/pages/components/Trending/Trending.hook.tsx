import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useGetTrendingMovieList from "./hooks/useGetTrendingMovies";
import useGetTrendingSeriesList from "./hooks/useGetTrendingSeries";

const useTrending = () => {
  const [switcher, setSwitcher] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const queryClient = useQueryClient();

  const {
    data: trendingMoviesData,
    refetch: refetchTrendingMovies,
    isLoading: isTrendingMoviesLoading,
  } = useGetTrendingMovieList({
    timeWindow: "day",
  });

  const {
    data: trendingSeriesData,
    refetch: refetchTrendingSeries,
    isLoading: isTrendingSeriesLoading,
  } = useGetTrendingSeriesList({
    timeWindow: "day",
  });

  const switcherCallback = (value: boolean) => {
    setSwitcher(value);
  };
  useEffect(() => {
    setIsloading(true);
    if (!switcher) {
      queryClient.invalidateQueries({ queryKey: ["trending-movie-list"] });
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    } else {
      queryClient.invalidateQueries({ queryKey: ["trending-series-list"] });
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
  }, [switcher]);

  return {
    trendingMoviesData,
    trendingSeriesData,
    switcherCallback,
    switcher,
    isLoading,
  };
};

export default useTrending;
