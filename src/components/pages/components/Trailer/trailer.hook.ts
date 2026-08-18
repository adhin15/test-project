import { useEffect, useMemo, useState } from "react";
import useGetVideo from "./hooks/useGetVideo";
import useGetUpcomingMovieList from "./hooks/useGetUpcomingMovies";

const useTrailer = () => {
  const [tabs, setTabs] = useState("0");
  const [bgSection, setBgSection] = useState("");
  const [modalPlayer, setModalPlayer] = useState(false);
  const [id, setId] = useState(undefined);

  const { data: upcomingMoviesData, isLoading } = useGetUpcomingMovieList({
    type: tabs === "0" ? "movie" : "tv",
  });

  const { data: moviesVideo, refetch: refetchMovieVideo } = useGetVideo({
    payload: id,
    enabled: id !== undefined,
    type: tabs === "0" ? "movie" : "tv",
  });

  const youtubeId = useMemo(() => {
    if (moviesVideo?.results) {
      return moviesVideo?.results[0]?.key;
    } else {
      return "";
    }
  }, [moviesVideo]);

  useEffect(() => {
    setBgSection(upcomingMoviesData?.results[0]?.backdrop_path);
  }, [upcomingMoviesData]);

  useEffect(() => {
    if (id !== undefined) {
      refetchMovieVideo();
    }
  }, [id, refetchMovieVideo]);

  const changeBg = (val: any) => {
    setBgSection(val);
  };

  const playTrailer = (val: any) => {
    setId(val);
    setModalPlayer(true);
  };

  const closeModal = () => {
    setModalPlayer(false);
    setTimeout(() => {
      setId(undefined);
    }, 500);
  };

  return {
    bgSection,
    isLoading,
    upcomingMoviesData,
    modalPlayer,
    setTabs,
    youtubeId,
    changeBg,
    playTrailer,
    closeModal,
  };
};

export default useTrailer;
