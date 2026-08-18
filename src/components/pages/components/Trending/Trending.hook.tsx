import { useState } from "react";
import useGetTrendingMovieList from "./hooks/useGetTrendingMovies";
import useGetTrendingSeriesList from "./hooks/useGetTrendingSeries";

const useTrending = () => {
  const [switcher, setSwitcher] = useState(false);

  const {
    data: trendingMoviesData,
    isLoading: isTrendingMoviesLoading,
  } = useGetTrendingMovieList({
    timeWindow: "day",
  });

  const {
    data: trendingSeriesData,
    isLoading: isTrendingSeriesLoading,
  } = useGetTrendingSeriesList({
    timeWindow: "day",
  });

  const switcherCallback = (value: boolean) => {
    setSwitcher(value);
  };

  // Loading reflects the active tab's query state (no artificial setTimeout).
  const isLoading = switcher ? isTrendingSeriesLoading : isTrendingMoviesLoading;

  return {
    trendingMoviesData,
    trendingSeriesData,
    switcherCallback,
    switcher,
    isLoading,
  };
};

export default useTrending;
