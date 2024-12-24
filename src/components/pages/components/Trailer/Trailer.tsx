"use client";
import CustomTabs from "@/components/shared/CustomTabs";
import Head from "next/head";
import TrailerCard from "@/components/shared/TrailerCard";
import TrailerCardSkeleton from "@/components/shared/Skeleton/TrailerCardSkeleton";
import ModalPlayer from "@/components/shared/ModalPlayer";
import useTrailer from "./trailer.hook";

const Trailer = () => {
  const {
    bgSection,
    isLoading,
    upcomingMoviesData,
    modalPlayer,
    setTabs,
    youtubeId,
    changeBg,
    playTrailer,
    closeModal,
  } = useTrailer();

  return (
    <div className="relative my-[32px]">
      <section id="backdrop-trailer">
        <div
          className="z-[-1] bg-center bg-cover bg-no-repeat w-full inset-0 absolute top-0 max-h-[25rem] z-10 opacity-30 min-h-[40%] transition-image"
          style={{ backgroundImage: `URL(https://image.tmdb.org/t/p/original${bgSection})` }}
        ></div>
        <div className="px-10 py-10">
          <div className="flex items-center gap-[16px]">
            <h3 className="font-bold text-xl">Trailers</h3>
            <CustomTabs
              Tabs={[
                { label: "Upcoming Movies", value: "0" },
                { label: "Airing Today", value: "1" },
              ]}
              onChange={(e: string) => {
                setTabs(e);
              }}
            />
          </div>
          <div></div>
          {!isLoading ? (
            <>
              <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in`} data-aos="fade-left">
                {upcomingMoviesData?.results?.map((value: any, index: any) => {
                  return (
                    <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                      <TrailerCard
                        onMouseOver={() => {
                          changeBg(value.backdrop_path);
                        }}
                        data={value}
                        type="movie"
                        key={index}
                        onClick={() => {
                          playTrailer(value);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in`}>
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
            </div>
          )}
        </div>
      </section>
      <ModalPlayer modalOpened={modalPlayer} closeModal={closeModal} youtubeId={youtubeId} />
    </div>
  );
};

export default Trailer;
