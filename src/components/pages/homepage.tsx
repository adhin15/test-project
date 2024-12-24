"use client";

import Head from "next/head";
import Trending from "./components/Trending/Trending";
import Trailer from "./components/Trailer";

export default function Home() {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `#backdrop-home{
                            &:after{
                                z-index:-1;
                                background-image:url(https://image.tmdb.org/t/p/original/nA0RDmSDqpN5tLun4sCqdPekObD.jpg);
                            }}
                            svg{
                                display:inline-block !important
                            }`,
          }}
        ></style>
      </Head>
      <section
        id="backdrop-home"
        className={`bg-cover after:bg-center after:bg-no-repeat after:w-full after:inset-0 after:absolute after:max-h-[25rem] after:-z-10 after:opacity-30
                            min-h-[40%] after:bg-[url(https://image.tmdb.org/t/p/original/nA0RDmSDqpN5tLun4sCqdPekObD.jpg)]
                            `}
      >
        <div className={`container h-96 pt-12 w-full max-w-full px-10`}>
          <div className="block w-full font-bold">
            <h2 className="text-5xl mb-3">Wellcome.</h2>
            <h3 className="text-3xl mb-12">Millions of movies, TV shows and people to discover. Explore now.</h3>
            <form onSubmit={() => {}}>
              <div className="flex">
                <input
                  type="text"
                  name="searchinput"
                  className="w-11/12 text-[#000000] p-3 rounded-l-full focus:outline-0 px-5"
                  placeholder="Search for a movie, tv show, person...."
                  onChange={(e) => {}}
                />
                <button
                  type="submit"
                  className="w-36 bg-main-accent rounded-full -ml-6 text-black active:scale-100 hover:scale-110 transition ease-in-out delay-50"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        <Trending />
        <Trailer />
      </section>
    </>
  );
}
