import { useState } from "react";
import usePostLogin from "./hooks/useLogin";

const useLogin = () =>{

    const [errorMessage, setErrorMessage] = useState<{message?:string}>({})

    const { mutate: doLogin, isPending: isLoginLoading } = usePostLogin({
        onError: (err) => {
            setErrorMessage(err)
        },
        onSuccess: () => {
            window.location.replace("/");
        },
      });


      const handleSubmitLogin = (e: any) => {
        e.preventDefault();
        const payload = {
          username: e.target[0].value,
          password: e.target[1].value,
        };
        doLogin(payload)
      };
    return {
        handleSubmitLogin,
        isLoginLoading,
        errorMessage, 
        setErrorMessage
    }
}

export default useLogin;