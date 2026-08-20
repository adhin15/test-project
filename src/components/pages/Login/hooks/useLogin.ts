import { authLogin } from '@/services/Auth/api';
import type { LoginPayload } from '@/types';
import { useMutation } from '@tanstack/react-query';

const usePostLogin = ({
  onSuccess = () => { },
  onError = (_err: unknown) => {},
}) => {
  const mutation = useMutation({
    mutationFn: async ({
        username,
        password
    }: LoginPayload) => {
      const res = await authLogin({ username, password });
      return res;
    },
    onError:(err) => {
      onError(err);
    },
    onSuccess: () => {
      onSuccess();
    },
  });

  return mutation;
};

export default usePostLogin;
