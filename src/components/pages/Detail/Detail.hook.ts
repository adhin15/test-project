import { useParams, usePathname } from "next/navigation";
import useGetDetailMovie from "./hooks/useGetDetailMovie";
import useGetCastingList from "./hooks/useGetCastingList";
import useGetKeywords from "./hooks/useGetKeywords";
import useGetExternalId from "./hooks/useGetExternalId";
import { useEffect, useMemo, useState } from "react";
import useGetMovieReviews from "./hooks/useGetReview";
import useGetImages from "./hooks/useGetImages";
import useGetRecommendations from "./hooks/useGetRecommendations";
import useGetCollection from "./hooks/useGetCollection";
import useGetVideo from "./hooks/useGetDetailVideo";

const useDetail = () =>{
    const { id } = useParams();
    const path = usePathname();
    const type = path.split("/")[1];
    const [page, setPage] = useState("1");

    const idValue = (Array.isArray(id) ? id[0] : id) ?? "";
    const mediaType = (type === "movie" ? "movie" : "tv") as "movie" | "tv";

    const { data: detailMovie, isLoading: isDetailLoading } = useGetDetailMovie({
      payload: { id: idValue },
      type: mediaType,
    });

    const { data: castingList, isLoading: isCastingListLoading } = useGetCastingList({
      payload: { id: idValue },
      type: mediaType,
    });

    const { data: movieKeywords, isLoading: isKeywordsLoading } = useGetKeywords({
      payload: { id: idValue },
      type: mediaType,
    });

    const { data: externalIds, isLoading: isExternalIdsLoading } = useGetExternalId({
      payload: { id: idValue },
      type: mediaType,
    });

    const { data: movieReviews, isLoading: isReviewLoading } = useGetMovieReviews({
      payload: { id: idValue, page: page?.toString() },
      type: mediaType,
    });

    // P1 sections
    const { data: mediaImages, isLoading: isImagesLoading } = useGetImages({
      payload: { id: idValue },
      type: mediaType,
    });

    const { data: videos, isLoading: isVideosLoading } = useGetVideo({
      payload: { id: idValue },
      type: mediaType,
      enabled: !!idValue,
    });

    const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRecommendations({
      payload: { id: idValue },
      type: mediaType,
    });

    const collectionId =
      detailMovie &&
      (detailMovie as { belongs_to_collection?: { id?: number } | null })
        ?.belongs_to_collection?.id;

    const { data: collection, isLoading: isCollectionLoading } = useGetCollection({
      id: collectionId ? String(collectionId) : "",
    });

    const isLoading = useMemo(() => {
      return isDetailLoading && isCastingListLoading && isKeywordsLoading && isExternalIdsLoading;
    }, [isDetailLoading, isCastingListLoading, isKeywordsLoading, isExternalIdsLoading]);

    return {
        detailMovie,
        castingList,
        movieReviews,
        movieKeywords,
        externalIds,
        mediaImages,
        videos,
        recommendations,
        collection,
        isLoading,
        type: mediaType,
        id: idValue,
    }
}

export default useDetail;
