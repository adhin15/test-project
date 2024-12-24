import react, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = (props: any) => {
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
            <Head>
                <title>MoFLixx</title>
                <link href="/dist/main.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


            </Head>

            {/* NAVBAR CONTAINER */}
            <div
                className={`flex items-center px-12 py-4 max-w-full h-18 w-full flex-wrap fixed top-0 transition ease-in delay-550 relative" z-10
         ${scrolled ? "bg-secondary-bg" : "bg-transparent"}`}
                id="container-navbar"
            >
                <div className="h-9 " id="container-image">
                    <Link href={'/'} type="button" className="cursor-pointer h-full">
                        <img src="/main-logo.webp" className="w-24 h-full" />
                    </Link>
                </div>
                <div className="ml-12 flex-1 flex gap-4 justify-self-start font-bold text-base">
                    {/* <span className="hover:border-b-white border-b-2 border-b-transparent cursor-pointer">Movie</span>
          <span className="hover:border-b-white border-b-2 border-b-transparent cursor-pointer">Tv Show</span>
          <span className="hover:border-b-white border-b-2 border-b-transparent cursor-pointer">People</span>
          <span className="hover:border-b-white border-b-2 border-b-transparent cursor-pointer">More</span> */}
                </div>
                <div className="justify-self-end flex items-center gap-9">
                    {/* <button>
            <span className="material-symbols-outlined stroke-4 font-extrabold cursor-pointer">add</span>
          </button>
          <div className="p-1 text-xs">
            <span className="border-solid border-white border p-1 cursor-pointer">EN</span>
          </div>
          <button>
            <span className="material-symbols-outlined stroke-4 font-extrabold">notifications</span>
          </button>
          <button>
            <span className="material-symbols-outlined stroke-4 font-extrabold cursor-pointer">person</span>
          </button> */}
                    <button>
                        <span className="material-symbols-outlined stroke-4 font-extrabold cursor-pointer">search</span>
                    </button>
                </div>
            </div>
            {/* ................ */}
            <div className="min-h-screen pt-[68px] px-4 md:px-12">{props.children}</div>

            {/* FOOTER CONTAINER */}
            <div
                className="flex items-center px-12 py-4 max-w-full bg-secondary-bg w-full h-full flex-wrap justify-center"
                id="container-footer"
            >
                <div className="h-16 w-full text-center mb-4 ">
                    <a
                        type="button"
                        className="cursor-pointer h-full hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-100"
                    >
                        <img src="/main-logo.webp" className="w-32 h-full" />
                    </a>
                </div>
                <div className="w-full text-center mb-4">
                    <h3 className="max-w-3xl m-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                    </h3>
                </div>
                <div className="flex gap-6">
                    <div className="w-6 h-6 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                    </div>
                    <div className="w-6 h-6 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                    </div>
                    <div className="w-6 h-6 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                    </div>
                    <div className="w-6 h-6 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                    </div>
                    <div className="w-6 h-6 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="bg-footer-accent h-full w-full text-center font-semibold p-4">
                <p className="text-xs">
                    Copyright{" "}
                    <span className="w-1 h-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            className="bi bi-c-circle inline-block mb-0.5"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z" />
                        </svg>
                    </span>
                    2022 Adhin Alifarchan. Design by <span className="opacity-50">TMDB</span>
                </p>
            </div>
        </>
    );
};

export default Layout;
