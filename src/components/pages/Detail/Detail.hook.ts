import { useParams, usePathname } from "next/navigation";
import useGetDetailMovie from "./hooks/useGetDetailMovie";
import useGetCastingList from "./hooks/useGetCastingList";
import useGetKeywords from "./hooks/useGetKeywords";
import useGetExternalId from "./hooks/useGetExternalId";
import { useEffect, useMemo, useState } from "react";
import useGetMovieReviews from "./hooks/useGetReview";

const useDetail = () =>{
    const { id } = useParams();
    const path = usePathname();
    const type = path.split("/")[1];
    const [page, setPage] = useState('1')
  
    const { data: detailMovie, isLoading: isDetailLoading } = useGetDetailMovie({
      payload: { id },
      type: type,
    });
  
    const { data: castingList, isLoading: isCastingListLoading } = useGetCastingList({
      payload: { id },
      type: type,
    });
  
    const { data: movieKeywords, isLoading: isKeywordsLoading } = useGetKeywords({
      payload: { id },
      type: type,
    });
  
    const { data: externalIds, isLoading: isExternalIdsLoading } = useGetExternalId({
      payload: { id },
      type: type,
    });

    const { data: movieReviews, isLoading: isReviewLoading } = useGetMovieReviews({
      payload: { id, page: page?.toString() },
      type: type,
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
        isLoading,
        type,
        id,
    }
}

export default useDetail;