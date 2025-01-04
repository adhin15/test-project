import { authLogin, authLogout } from '@/services/Auth/api';
import { useMutation } from '@tanstack/react-query';

type payloadLogin = {
    session_id: string
}
const usePostLogout = ({
  onSuccess = () => { },
  onError = () => { },
}) => {
  const mutation = useMutation({
    mutationFn: async ({
        session_id
    }:payloadLogin) => {
      const res = await authLogout({
        session_id
      });
      return res;
    },
    onError: () => {
      onError();
    },
    onSuccess: () => {
      onSuccess();
    },
  });

  return mutation;
};

export default usePostLogout;
