"use client";

import React, { useEffect, useState } from "react";

import Switcher from "@/components/shared/Switcher";
import CardSkeleton from "@/components/shared/Skeleton";
import Card from "@/components/shared/Card/Card";
import useTrending from "./Trending.hook";

const Trending = () => {
  const { trendingMoviesData, trendingSeriesData, switcherCallback, switcher, isLoading } = useTrending();

  return (
    <section>
      <div className="px-10 py-10">
        <div className="flex items-center gap-[8px]">
          <h3>Trending</h3>
          <Switcher labelLeft={"Movies"} labelRight={"Series"} callBack={switcherCallback} />
        </div>
        {!isLoading ? (
          <>
            <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in ${!switcher ? "" : "hidden"}`}>
              {trendingMoviesData?.map((value: any, index: any) => {
                return (
                  <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                    <Card data={value} type="movie" key={index} />
                  </div>
                );
              })}
            </div>
            <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in ${switcher ? "" : "hidden"}`}>
              {trendingSeriesData?.map((value: any, index: any) => {
                return (
                  <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                    <Card data={value} type="tv-series" key={index} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;
