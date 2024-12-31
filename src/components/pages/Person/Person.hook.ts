import { useParams } from "next/navigation";
import useGetDetailPerson from "./hooks/useGetDetailPerson";
import useGetPersonCredit from "./hooks/useGetPersonCredit";
import { useMemo, useState } from "react";

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

    const isLoading = useMemo(() => {
          return isDetailPersonLoading && isPersonCreditLoading;
    }, [isDetailPersonLoading, isPersonCreditLoading]);
    
    return{
        detailPerson,
        personCredit,
        isLoading,
        castingScrolled,
        readMore, 
        setReadMore,
        handleScroll
    }
}

export default usePerson;