"use client";

import DetailMovie from "./components/DetailMovie";
import DetailSeries from "./components/DetailSeries";
import useDetail from "./Detail.hook";

const Detail = () => {
  const {
    detailMovie,
    castingList,
    movieKeywords,
    movieReviews,
    externalIds,
    mediaImages,
    videos,
    recommendations,
    collection,
    isLoading,
    id,
    type,
  } = useDetail();

  return (
    <>
      <div className="w-full max-w-full py-5 px-6 md:px-12">
        {type === "movie" ? (
          <DetailMovie
            detailMovie={detailMovie && "title" in detailMovie ? detailMovie : undefined}
            isLoading={isLoading}
            castingList={castingList}
            externalIds={externalIds}
            id={id}
            movieKeywords={movieKeywords}
            movieReviews={movieReviews}
            mediaImages={mediaImages}
            videos={videos}
            recommendations={recommendations}
            collection={collection}
            type={type}
          />
        ) : (
          <DetailSeries
            detailTv={detailMovie && "name" in detailMovie ? detailMovie : undefined}
            isLoading={isLoading}
            castingList={castingList}
            externalIds={externalIds}
            id={id}
            movieKeywords={movieKeywords}
            movieReviews={movieReviews}
            mediaImages={mediaImages}
            videos={videos}
            recommendations={recommendations}
            collection={collection}
            type={type}
          />
        )}
      </div>
    </>
  );
};

export default Detail;
