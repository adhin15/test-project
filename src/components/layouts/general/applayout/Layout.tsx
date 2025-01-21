"use client";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../../../../app/globals.css";
import "aos/dist/aos.css";
import { GlobalContext } from "./layout.context";

import type { Metadata, Viewport } from "next";
import useLayout from "./Layout.hook";
import LayoutProvider from "./Layout.provider";
import { useEffect } from "react";

export const viewport: Viewport = {
  maximumScale: 1.0,
  userScalable: false,
};
export const metadata: Metadata = {
  title: "MoFlixx - Movie Database",
  description:
    "Welcome to MoFlixx, explore information about movies and TV shows. You can browse through various titles, details like  as release dates, genres, and synopses, and watch trailers.",
  icons: "https://mo-flixx.vercel.app/images/main-logo.webp",
  openGraph: {
    title: "MoFlixx - Movie Database",
    siteName: "MoFlixx - Movie Database",
    description:
      "Welcome to MoFlixx, explore information about movies and TV shows. You can browse through various titles, details like  as release dates, genres, and synopses, and watch trailers.",
    images: "https://mo-flixx.vercel.app/images/website-thumbnail.png",
    type: "website",
    url: "https://mo-flixx.vercel.app",
  },
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
        <meta property="og:url" content="https://mo-flixx.vercel.app/" />
        <meta property="og:type" content="Website" />
        <meta property="og:site_name" content="MoFlixx - Movie Database" />
        <meta property="og:title" content="MoFlixx - Movie Database" />
        <meta
          property="og:description"
          content="Welcome to MoFlixx, explore information about movies and TV shows. You can browse through various titles, details like  as release dates, genres, and synopses, and watch trailers. "
        />
        <meta property="og:image" content="https://mo-flixx.vercel.app/images/website-thumbnail.png" />

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
              <div className="min-h-screen pt-[60px] md:pt-[84px]">{children}</div>
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
