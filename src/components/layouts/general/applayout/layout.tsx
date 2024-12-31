"use client";
import { useEffect, useMemo } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../../../../app/globals.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { GlobalContext } from "./layout.context";
import Cookies from "js-cookie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const temp = {
    session_id: null,
  };
  const userData = useMemo(() => {
    const value = Cookies.get("MoFlixxUser");
    return value;
  }, [Cookies.get("MoFlixxUser")]);

  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  const value = {
    userData: JSON.parse(userData || null),
  };

  // const logout

  return (
    <html lang="en">
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
      <body>
        <QueryClientProvider client={queryClient}>
          <GlobalContext.Provider value={value}>
            <Navbar />
            <div className="min-h-screen pt-[68px]">{children}</div>
            <Footer />
          </GlobalContext.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
