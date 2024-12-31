"use client";

import { authLogin, getDetailAccount } from "@/services/Auth/api";

const LoginPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    authLogin(JSON.stringify(payload)).then((val) => {
      window.location.replace("/");
    });
  };
  return (
    <>
      <div className="px-4 md:px-12 min-h-[70vh] flex flex-col justify-center">
        <div className="block w-full font-bold py-12">
          <h2 className="text-3xl mb-3">Log in to your account</h2>
          <h3 className="text-xl mb-12">Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
        <form onSubmit={handleSubmit} className="text-black">
          <div>
            <span className="text-white ">Username</span>
            <input
              className="mb-4 mt-2 w-full px-4 py-2 rounded-md focus:outline-[#ffc300]"
              type="text"
              name="username"
            />
            <span className="text-white ">Password</span>
            <input
              className="mb-4 mt-2 w-full px-4 py-2 rounded-md focus:outline-[#ffc300]"
              type="password"
              name="password"
            />
            <button type="submit" className="bg-main-accent rounded-full px-6 py-2 text-black font-bold">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
