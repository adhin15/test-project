import { authLogin } from '@/services/Auth/api';
import { useMutation } from '@tanstack/react-query';

type payloadLogin = {
    username:string,
    password:string
}
const usePostLogin = ({
  onSuccess = () => { },
  onError = (err:any) => {},
}) => {
  const mutation = useMutation({
    mutationFn: async ({
        username,
        password
    }:payloadLogin) => {
      const res = await authLogin(JSON.stringify(
        {
            username,
            password
        }
      ));
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
