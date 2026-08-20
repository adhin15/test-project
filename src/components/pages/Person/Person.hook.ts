import { useParams } from "next/navigation";
import useGetDetailPerson from "./hooks/useGetDetailPerson";
import useGetPersonCredit from "./hooks/useGetPersonCredit";
import type { PersonCreditCast } from "@/types";
import { useEffect, useMemo, useState } from "react";

const usePerson = () =>{
    const { id } = useParams();
    const idValue = (Array.isArray(id) ? id[0] : id) ?? "";

      const [readMore, setReadMore] = useState(false);

      const [castingScrolled, setCastingScrolled] = useState(false);

    
      
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollLeft === 0) {
      setCastingScrolled(false);
    } else {
      setCastingScrolled(true);
    }
  };

  const { data: detailPerson, isLoading: isDetailPersonLoading } = useGetDetailPerson({
        payload: { id: idValue },
      });

  const { data: personCredit, isLoading: isPersonCreditLoading } = useGetPersonCredit({
    payload: { id: idValue },
  });

  const sortedCreditDataList = personCredit?.cast?.sort((a, b) => {
    const aDate = a.release_date || a.first_air_date || "";
    const bDate = b.release_date || b.first_air_date || "";
    if (aDate === "" && bDate !== "") {
      return -1; // Place empty values at the front
    } else if (aDate !== "" && bDate === "") {
      return 1; // Place empty values at the front
    } else if (aDate === "" && bDate === "") {
      return 0; // If both are empty, keep the order unchanged
    } else {
      return bDate.localeCompare(aDate); // Compare non-empty dates in descending order
    }
  });

    const isLoading = useMemo(() => {
      return isDetailPersonLoading && isPersonCreditLoading;
    }, [isDetailPersonLoading, isPersonCreditLoading]);
    
    return{
        detailPerson,
        personCredit,
        isLoading,
        castingScrolled,
        sortedCreditDataList,
        readMore, 
        setReadMore,
        handleScroll
    }
}

export default usePerson;