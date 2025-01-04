

import { getDetailAccount } from "@/services/Auth/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetAccountDetail = ({
  onSuccess = (val:any) =>{},
  onError = (val:any) =>{}, 
}:any) => {

  const mutation = useMutation({
    mutationFn: async (payload:{id:string}) => {
      const res = await getDetailAccount({id:payload?.id});
      return res;
    },
    onError: () => {
      onError();
    },
    onSuccess: onSuccess,
  });
   
    return mutation;
  };
  

  export default useGetAccountDetail;
  

  