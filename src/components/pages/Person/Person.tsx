"use client";

import Link from "next/link";
import { formatDate, generateImageUrl } from "@/components/shared/Helper/Helper";
import CardSkeleton from "@/components/shared/Skeleton";
import ExpMapping from "./components/ExpMapping";
import MovieCredit from "./components/MovieCredit";
import { PersonLeftSkeleton, PersonRightSkeleton } from "@/components/shared/Skeleton/PersonSkeleton";
import usePerson from "./Person.hook";

const PersonDetail = () => {
  const { detailPerson, personCredit, isLoading, castingScrolled, readMore, setReadMore, handleScroll } = usePerson();

  const CalculateAge = (birthDate: any) => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  return (
    <div className="px-4 md:px-12">
      <div className="flex flex-col text-left	">
        <button className="text-left flex items-center gap-[8px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <Link href={"javascript:history.go(-1)"}>back</Link>
        </button>
      </div>
      <div className="flex gap-[16px] py-4">
        <div className="w-1/3">
          {isLoading ? (
            <PersonLeftSkeleton />
          ) : (
            <>
              <div className="max-w-[300px] max-h-[450px] rounded-[10px] mb-4">
                <img
                  className="rounded-[10px]"
                  src={generateImageUrl(detailPerson?.profile_path)}
                  data-aos="fade-right"
                  data-aos-delay="200"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl" data-aos="fade-right">
                  Personal Info
                </h3>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="100">
                  <h4 className="font-bold text-l">Known For</h4>
                  <p>{detailPerson?.known_for_department}</p>
                </div>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="200">
                  <h4 className="font-bold text-l">Known Credit</h4>
                  <p>{personCredit?.cast?.length}</p>
                </div>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="300">
                  <h4 className="font-bold text-l">Gender</h4>
                  <p>{detailPerson?.gender === 1 ? "Female" : "Male"}</p>
                </div>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="100">
                  <h4 className="font-bold text-l">Birthday</h4>
                  <p>
                    {formatDate(detailPerson?.birthday)} ({CalculateAge(detailPerson?.birthday) + " years old"}){" "}
                  </p>
                </div>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="100">
                  <h4 className="font-bold text-l">Place of Birth</h4>
                  <p>{detailPerson?.place_of_birth}</p>
                </div>
                <div className="mb-2" data-aos="fade-right" data-aos-delay="100">
                  <h4 className="font-bold text-l">Also Known As</h4>
                  {detailPerson?.also_known_as?.map((val: any, index: any) => {
                    return <p key={index}>{val}</p>;
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* //////////----RIGHT SECTION----///////// */}
        <div className="w-2/3">
          {isLoading ? (
            <PersonRightSkeleton />
          ) : (
            <>
              <h3 className="font-bold text-3xl mb-4" data-aos="fade-down" data-aos-delay="200">
                {detailPerson?.name}
              </h3>
              <h4 className="font-bold text-xl mb-2" data-aos="fade-left" data-aos-delay="400">
                Biography
              </h4>
              <div
                id="truncate-container"
                className={`truncate-text pb-6 mb-6`}
                data-aos="fade-left"
                data-aos-delay="400"
                style={!readMore ? { height: "220px", maxHeight: "220px", overflow: "hidden" } : {}}
              >
                {detailPerson?.biography?.split("\n\n").map((val: any, index: any) => {
                  return (
                    <p className="mb-[12px]" key={index}>
                      {val}
                    </p>
                  );
                })}
                <span
                  className={`${
                    readMore ? "hidden" : ""
                  } absolute bottom-0 right-0 text-main-accent font-bold flex items-center gap-[4px] p-0 bg-[#000814]`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setReadMore(true);
                  }}
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                </span>
              </div>
              <div className="relative mb-4">
                <h3 className="font-bold text-2xl">Known For</h3>
                {!isLoading ? (
                  <div className={`relative mt-10 ${castingScrolled ? "scrolled" : ""}`} id="cast_scroller">
                    <div
                      className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 my-6`}
                      onScroll={handleScroll}
                      data-aos="fade-left"
                      // data-aos-delay="400"
                    >
                      {personCredit?.cast?.slice(0, 10).map((val: any, index: any) => {
                        return (
                          <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                            <MovieCredit data={val} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4 my-6">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                )}
              </div>
              <ExpMapping data={personCredit?.cast} header={"Acting"} />
              <ExpMapping
                header={"Production"}
                data={personCredit?.crew?.filter(function (res: any) {
                  return res.department === "Production";
                })}
              />
              <ExpMapping
                header={"Crew"}
                data={personCredit?.crew?.filter(function (res: any) {
                  return res.department === "Crew";
                })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
