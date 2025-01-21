import { Metadata, Viewport } from "next";

export { default } from "../components/layouts/general/applayout/index";

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
