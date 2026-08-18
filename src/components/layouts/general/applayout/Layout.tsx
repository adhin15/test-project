"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../../../../app/globals.css";
import "aos/dist/aos.css";
import { GlobalContext } from "./layout.context";
import useLayout from "./Layout.hook";
import LayoutProvider from "./Layout.provider";

/**
 * AppLayout — client wrapper that provides React Query + global context and
 * renders the persistent chrome (Navbar / Footer) around the page content.
 *
 * The <html>/<body> shell and metadata live in the root server layout
 * (src/app/layout.tsx), which is the correct App Router pattern.
 */
const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // Instantiate QueryClient once per mount (client-safe, avoids SSR empty render).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  const { contextValue } = useLayout();

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider />
      <GlobalContext.Provider value={contextValue}>
        <Navbar />
        <div className="min-h-screen pt-[60px] md:pt-[84px]">{children}</div>
        <Footer />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default AppLayout;
