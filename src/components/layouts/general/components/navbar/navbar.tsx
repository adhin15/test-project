import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

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
                className={`flex items-center px-12 py-4 max-w-full h-18 w-full flex-wrap fixed top-0 transition ease-in delay-550 relative" z-10 ${scrolled ? "bg-secondary-bg" : "bg-transparent"}`}
                id="container-navbar"
            >
                <div className="h-9 " id="container-image">
                    <Link href={'/'} type="button" className="cursor-pointer h-full">
                        <img src="/images/main-logo.webp" className="w-24 h-full" />
                    </Link>
                </div>
                <div className="ml-12 flex-1 flex gap-4 justify-end font-bold text-base">
                    <button>
                        <img src="/assets/search.svg" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;