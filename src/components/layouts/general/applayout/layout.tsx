"use client";
import react, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../../../../app/globals.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Modal from "@/components/shared/ModalPlayer";
import { GlobalContext } from "./layout.context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  const [modalOpened, setModalOpened] = useState(false);
  const [modalElement, setModalElement] = useState(null);
  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

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
          <Navbar />
          <div className="min-h-screen pt-[68px]">{children}</div>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
