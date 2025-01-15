"use client";

import Head from "next/head";
import Trending from "./components/Trending/Trending";
import Trailer from "./components/Trailer";
import useGetTrendingMovieList from "./components/Trending/hooks/useGetTrendingMovies";
import { useEffect, useState } from "react";
import Button from "../shared/Button";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const {
    data: trendingMoviesData,
    refetch: refetchTrendingMovies,
    isLoading: isTrendingMoviesLoading,
  } = useGetTrendingMovieList({
    timeWindow: "day",
  });

  const submitSearch = (e: any) => {
    e.preventDefault();
    window.location.replace(`/search?query=${e.target[0].value}`);
  };

  return (
    <>
      <div
        className="z-[-1] bg-center bg-cover bg-no-repeat w-full inset-0 absolute top-0 max-h-[25rem] z-10 opacity-30 min-h-[40%] transition-image"
        style={{
          backgroundImage: `URL(https://image.tmdb.org/t/p/original${
            trendingMoviesData && trendingMoviesData[0]?.backdrop_path
          })`,
        }}
      ></div>
      <section id="backdrop-home">
        <div className={`container md:h-96 h-[22rem] pt-6 md:pt-12 w-full max-w-full px-10`}>
          <div className="block w-full font-bold">
            <h2 className="text-5xl mb-3">Wellcome.</h2>
            <h3 className="text-xl md:text-3xl mb-12">
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
            <form onSubmit={submitSearch}>
              <div className="flex">
                <input
                  type="text"
                  name="searchinput"
                  className="w-11/12 text-[#000000] p-3 rounded-l-full focus:outline-0 px-5"
                  placeholder="Search for a movie, tv show, person...."
                />
                <div className="-ml-6 w-36 p-0 h-[48px] text-black">
                  <Button
                    className="h-full "
                    type="submit"
                    variant="regular"
                    style={{ borderRadius: "999px" }}
                    // textSize={16}
                    isFullWidth
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        <Trending />
        <Trailer />
      </section>
    </>
  );
}
