"use client";

import { authLogin, getRequestToken, validateLogin, validateSession } from "@/services/Auth/api";

const Test = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    authLogin(JSON.stringify(payload)).then((val) => {});
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="text-black">
          <input className="mb-2" type="text" name="username" /> <br />
          <input type="password" name="password" /> <br />
          <button type="submit" className="text-white">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Test;
