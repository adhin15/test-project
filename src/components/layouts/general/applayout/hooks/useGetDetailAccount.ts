
import { getDetailAccount } from "@/services/Auth/api";
import type { AccountDetail } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface UseGetAccountDetailOptions {
  onSuccess?: (val: AccountDetail | undefined) => void;
  onError?: (err: unknown) => void;
}

const useGetAccountDetail = ({
  onSuccess,
  onError,
}: UseGetAccountDetailOptions = {}) => {
  const mutation = useMutation({
    mutationFn: async (payload: { id: string }) => {
      const res = await getDetailAccount({ id: payload?.id ?? "" });
      return res;
    },
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return mutation;
};

export default useGetAccountDetail;
