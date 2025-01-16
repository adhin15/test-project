import { useParams } from "next/navigation";
import useGetDetailPerson from "./hooks/useGetDetailPerson";
import useGetPersonCredit from "./hooks/useGetPersonCredit";
import { useEffect, useMemo, useState } from "react";

const usePerson = () =>{
    const { id } = useParams();

      const [readMore, setReadMore] = useState(false);

      const [castingScrolled, setCastingScrolled] = useState(false);

    
      
  const handleScroll = (e:any) => {
    if (e.target.scrollLeft === 0) {
      setCastingScrolled(false);
    } else {
      setCastingScrolled(true);
    }
  };

  const { data: detailPerson, isLoading: isDetailPersonLoading } = useGetDetailPerson({
        payload: { id },
      });

  const { data: personCredit, isLoading: isPersonCreditLoading } = useGetPersonCredit({
    payload: { id },
  });

  const sortedCreditDataList = personCredit?.cast?.sort((a: any, b: any) => {
    if ((a.release_date || a.first_air_date) === "" && (b.release_date || b.first_air_date) !== "") {
      return -1; // Place empty values at the front
    } else if ((a.release_date || a.first_air_date) !== "" && (b.release_date || b.first_air_date) === "") {
      return 1; // Place empty values at the front
    } else if ((a.release_date || a.first_air_date) === "" && (b.release_date || b.first_air_date) === "") {
      return 0; // If both are empty, keep the order unchanged
    } else {
      return (b.release_date || b.first_air_date)?.localeCompare(a.release_date || b.first_air_date); // Compare non-empty dates in descending order
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