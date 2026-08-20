import { useState } from "react";
import usePostLogin from "./hooks/useLogin";

const useLogin = () =>{

    const [errorMessage, setErrorMessage] = useState<{message?:string}>({})

    const { mutate: doLogin, isPending: isLoginLoading } = usePostLogin({
        onError: (err) => {
            setErrorMessage(
              err && typeof err === "object" && "message" in err
                ? { message: String((err as { message: unknown }).message) }
                : { message: "Login failed. Please try again." }
            );
        },
        onSuccess: () => {
            window.location.replace("/");
        },
      });


      const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const username = (form.querySelector("input[name='username']") as HTMLInputElement)?.value ?? "";
        const password = (form.querySelector("input[name='password']") as HTMLInputElement)?.value ?? "";
        doLogin({ username, password });
      };
    return {
        handleSubmitLogin,
        isLoginLoading,
        errorMessage, 
        setErrorMessage
    }
}

export default useLogin;