import { useParams, usePathname, useRouter } from "next/navigation";
import useGetCastingList from "./hooks/useGetMovieCastingList";
import useGetDetailMovie from "../Detail/hooks/useGetDetailMovie";
import { useEffect, useMemo } from "react";

const useCast = () =>{
    const { id } = useParams();
    const router = useRouter();
    const query = id.split('-')[1];
    const path = usePathname();
    const type = (path.split("/")[2]).split("-")[0];
    
    useEffect(()=>{
        console.log('logid',type)
    },[type])

    const { data: castingList, isLoading: isCastingListLoading } = useGetCastingList({
        payload: { id:query },
        type: type,
      });
      const { data: detailMovie, isLoading: isDetailLoading } = useGetDetailMovie({
        payload: { id:query },
        type: type,
      });

      const isLoading = useMemo(()=>{
        return isCastingListLoading && isDetailLoading
      },[isCastingListLoading, isDetailLoading])

      const handleBack = ()=>{
        router.back();
      }

    return {
        castingList,
        detailMovie,
        isLoading,
        handleBack
    }
}

export default useCast