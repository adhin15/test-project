"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../applayout/layout.context";

const Navbar = () => {
  const { userData } = useGlobalContext();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isClient ? (
        <div
          className={`flex items-center px-12 py-4 max-w-full h-18 w-full flex-wrap fixed top-0 transition ease-in delay-550 relative" z-10 ${
            scrolled ? "bg-secondary-bg" : "bg-transparent"
          }`}
          id="container-navbar"
        >
          <div className="h-9 " id="container-image">
            <Link href={"/"} type="button" className="cursor-pointer h-full">
              <img src="/images/main-logo.webp" className="w-24 h-full" />
            </Link>
          </div>
          <div className="ml-12 flex-1 flex gap-4 justify-end font-bold text-base">
            <div className="flex gap-3 w-1/3 justify-end relative">
              <input
                ref={inputRef}
                type="text"
                className={`text-white bg-transparent border-b-2 outline-0 opacity-0 p-1 px-2 text-sm absolute left-[0%] ${
                  showSearch ? "move-animation" : "move-out-animation"
                }`}
                placeholder="Search"
                onBlur={() => {
                  setShowSearch(false);
                }}
              />
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
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <span className="avatar flex items-center justify-center">C</span>
                  <span>{userData?.username}</span>
                </div>
              ) : (
                <button
                  className="w-24 bg-main-accent rounded-full px-4 py-2 text-black active:scale-100 hover:scale-110 transition ease-in-out delay-50"
                  onClick={() => {}}
                >
                  <Link href="/login">Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
