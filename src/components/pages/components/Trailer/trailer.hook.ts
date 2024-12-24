import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import useGetVideo from "./hooks/useGetVideo";
import useGetUpcomingMovieList from "./hooks/useGetUpcomingMovies";

const useTrailer = () =>{
    const queryClient = useQueryClient();

    const [tabs, setTabs] = useState("0");
    const [bgSection, setBgSection] = useState("");
    const [isLoading, setIsloading] = useState(true);
    const [modalPlayer, setModalPlayer] = useState(false);
    const [id, setId] = useState(undefined);
  
    const { data: upcomingMoviesData } = useGetUpcomingMovieList({
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
    }, [moviesVideo, tabs]);
  
    useEffect(() => {
      setIsloading(true);
      queryClient.invalidateQueries({ queryKey: ["movie-tv-list"] });
      setBgSection(upcomingMoviesData?.results[0]?.backdrop_path);
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }, [tabs, upcomingMoviesData]);
  
    const changeBg = (val: any) => {
      setBgSection(val);
    };
  
    const playTrailer = (val: any) => {
      setId(val);
      setModalPlayer(true);
    };
    useCallback(() => {
      if (id !== undefined) {
        refetchMovieVideo();
      }
    }, [id]);
  
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
        closeModal
    }
}

export default useTrailer;