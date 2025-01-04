"use client";

import Link from "next/link";

import dynamic from "next/dynamic";
import { generateImageUrl } from "@/components/shared/Helper/Helper";
import useCast from "./Cast.hook";
import CastHeaderSkeleton from "@/components/shared/Skeleton/CastHeaderSkeleton";
import CastSkeleton from "@/components/shared/Skeleton/CastSkeleton";
import Button from "@/components/shared/Button";
import BackButton from "@/components/shared/BackButton";

const Cast = () => {
  const { castingList, detailMovie, isLoading } = useCast();

  return (
    <div className="px-4 md:px-12">
      <div className="bg-secondary-bg flex flex-wrap p-5 px-12 gap-[16px]" style={{ margin: "0rem -3rem" }}>
        {!isLoading ? (
          <>
            <img
              src={generateImageUrl(detailMovie?.poster_path)}
              className="w-[58px] h-[87px] object-cover lazy-load-image rounded"
              data-aos="fade-right"
            />
            <div className="flex flex-col text-left">
              <h3 className="text-2xl font-bold" data-aos="fade-right">
                {detailMovie?.name || detailMovie?.title} (
                {detailMovie?.release_date?.slice(0, 4) || detailMovie?.first_air_date?.slice(0, 4)})
              </h3>
              <div className="text-left flex items-center gap-[8px]">
                <BackButton />
              </div>
            </div>
          </>
        ) : (
          <CastHeaderSkeleton />
        )}
      </div>
      <div className="container w-full max-w-full pt-5 overflow-x-hidden">
        <div className="flex mt-5">
          <div className="w-1/2 flex flex-wrap flex-col">
            <h3 className="text-[24px] font-bold mb-6">
              Cast <span className="font-normal opacity-70">{castingList?.cast?.length}</span>{" "}
            </h3>
            {!isLoading ? (
              castingList?.cast?.map((val: any, index: any) => {
                return (
                  <div className="flex w-full mb-8" key={index} data-aos="fade-right">
                    <img
                      src={generateImageUrl(val?.profile_path)}
                      className="w-[66px] h-[66px] object-cover rounded lazy-load-image"
                      alt=""
                    />
                    <div className="flex flex-wrap pl-10">
                      <p className="w-full font-bold">{val?.character}</p>
                      <p className="w-full">{val?.name}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
              </>
            )}
          </div>
          <div className="w-1/2 flex flex-wrap flex-col	">
            <h3 className="text-[24px] font-bold mb-6">
              Crew <span className="font-normal opacity-70">{castingList?.crew?.length}</span>{" "}
            </h3>
            {!isLoading ? (
              castingList?.crew?.map((val: any, index: any) => {
                return (
                  <div className="flex w-full mb-8" key={index} data-aos="fade-left">
                    <img
                      src={generateImageUrl(val?.profile_path)}
                      className="w-[66px] h-[66px] object-cover rounded lazy-load-image"
                      alt=""
                    />
                    <div className="flex flex-wrap pl-10">
                      <p className="w-full font-bold">{val?.name}</p>
                      <p className="w-full">{val?.department}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cast;
