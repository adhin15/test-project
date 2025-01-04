"use client";

import useLogin from "./Login.hook";
import Button from "@/components/shared/Button";

const LoginPage = () => {
  const { handleSubmitLogin, isLoginLoading, errorMessage, setErrorMessage } = useLogin();
  return (
    <>
      <div className="px-4 md:px-12 min-h-[70vh] flex flex-col justify-center">
        <div className="block w-full font-bold py-12">
          <h2 className="text-3xl mb-3">Log in to your account</h2>
          <h3 className="text-xl mb-12">Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
        <form onSubmit={handleSubmitLogin} className="text-black">
          <div>
            <span className="text-white font-bold">Username</span>
            <input
              className="mb-4 mt-2 w-full px-4 py-2 rounded-md focus:outline-[#ffc300]"
              type="text"
              name="username"
              onFocus={() => {
                setErrorMessage({});
              }}
            />
            <span className="text-white font-bold">Password</span>
            <input
              className="mb-4 mt-2 w-full px-4 py-2 rounded-md focus:outline-[#ffc300]"
              type="password"
              name="password"
              onFocus={() => {
                setErrorMessage({});
              }}
            />
            <div className="mb-4">
              <span className="text-[#e84c3d] mb-4">{errorMessage?.message}</span>
            </div>
            <Button variant="regular" type="submit" isLoading={isLoginLoading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
