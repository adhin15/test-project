"use client";

import DetailMovie from "./components/DetailMovie";
import DetailSeries from "./components/DetailSeries";
import useDetail from "./Detail.hook";

const Detail = () => {
  const { detailMovie, castingList, movieKeywords, externalIds, isLoading, id, type } = useDetail();

  return (
    <>
      <div className="w-full max-w-full py-5 px-12">
        {type === "movie" ? (
          <DetailMovie
            detailMovie={detailMovie}
            isLoading={isLoading}
            castingList={castingList}
            externalIds={externalIds}
            id={id}
            movieKeywords={movieKeywords}
          />
        ) : (
          <DetailSeries
            detailTv={detailMovie}
            isLoading={isLoading}
            castingList={castingList}
            externalIds={externalIds}
            id={id}
            movieKeywords={movieKeywords}
          />
        )}
      </div>
    </>
  );
};

export default Detail;
