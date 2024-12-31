import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

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
          <input
            ref={inputRef}
            type="text"
            className={`text-white bg-transparent border-b-2 outline-0 opacity-0 p-1 px-2 text-sm ${
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
          >
            <img src="/assets/search.svg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
