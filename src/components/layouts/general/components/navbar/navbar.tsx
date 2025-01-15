"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../applayout/layout.context";
import Button from "@/components/shared/Button";
import DropDown from "@/components/shared/Dropdown";
import useNavbar from "./Navbar.hook";
import Loader from "@/components/shared/Loader";

const Navbar = () => {
  const { handleLogout, isLogoutLoading } = useNavbar();
  const { userData } = useGlobalContext();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const inputRef: any = useRef(null);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const getInitial = (params: string) => {
    return params[0];
  };
  const submitSearch = (e: any) => {
    e.preventDefault();
    window.location.replace(`/search?query=${e.target[0].value}`);
  };

  return (
    <>
      <div
        className={`flex items-center px-6 md:px-12 py-4 max-w-full h-[84px] w-full flex-wrap fixed top-0 transition ease-in delay-550 relative" z-10 ${
          scrolled ? "bg-secondary-bg" : "bg-transparent"
        }`}
        id="container-navbar"
      >
        <div className="h-9 " id="container-image">
          <Link href={"/"} type="button" className="cursor-pointer h-full">
            <img src="/images/main-logo.webp" className="md:w-24 h-full" />
          </Link>
        </div>
        <div className="md:ml-12 flex-1 flex gap-4 justify-end font-bold text-base">
          <div className="flex gap-3 md:w-1/3 justify-end relative">
            <form onSubmit={submitSearch}>
              <input
                ref={inputRef}
                type="text"
                className={`text-white bg-transparent border-b-2 outline-0 opacity-0 p-1 px-2 text-sm absolute md:left-[0%] left-[-28%] md:top-0 top-[28%] max-w-[50%] md:max-w-[100%] ${
                  !showSearch ? "move-out-animation" : "move-animation"
                }`}
                placeholder="Search"
                onBlur={() => {
                  setShowSearch(false);
                }}
              />
            </form>
            <button
              onClick={() => {
                setShowSearch(true);
                setTimeout(() => {
                  inputRef.current.focus();
                }, 500);
              }}
              className={showSearch ? "move-out-button" : "move-in-button"}
            >
              <img src="/assets/search.svg" />
            </button>
            {userData?.session_id ? (
              !isLogoutLoading ? (
                <DropDown
                  label={
                    <div className="flex justify-center items-center gap-2 bg-transparent">
                      <span className="avatar flex items-center justify-center uppercase">
                        {getInitial(userData?.username)}
                      </span>
                      <span>{userData?.username}</span>
                    </div>
                  }
                  dropdownList={[{ label: "Logout", onClick: handleLogout }]}
                  className="bg-transparent hover:bg-transparent"
                />
              ) : (
                <Loader size={22} />
              )
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
