"use client";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../../../../app/globals.css";
import "aos/dist/aos.css";
import { GlobalContext } from "./layout.context";

import type { Viewport } from "next";
import useLayout from "./Layout.hook";
import LayoutProvider from "./Layout.provider";
import { useEffect } from "react";

export const viewport: Viewport = {
  maximumScale: 1.0,
  userScalable: false,
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isClient, contextValue, queryClient } = useLayout();
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
        {isClient ? (
          <QueryClientProvider client={queryClient}>
            <LayoutProvider />
            <GlobalContext.Provider value={contextValue}>
              <Navbar />
              <div className="min-h-screen pt-[84px]">{children}</div>
              <Footer />
            </GlobalContext.Provider>
          </QueryClientProvider>
        ) : (
          <></>
        )}
      </body>
    </html>
  );
};

export default Layout;
