
import { NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

type payload = {
    timeWindow: 'day' | 'week'
}

const getTrendingMovies = async ({timeWindow = "day"}: payload) => {
    try {
      const response = await fetch(`${url}/trending/movie/${timeWindow}`, {
        method: "GET",
        headers: {
          Authorization: process.env.BEARER_TOKEN || '',
          accept: "application/json",
        },
      });
      const responseData = await response.json();
      return Promise.resolve(responseData.results);
    } catch {}
  };


export async function POST(request:any) {
  let response;

  const requestData = await request.json();
  await getTrendingMovies(requestData?.timeWindow).then((val)=>{
    console.log('log env',process.env.BEARER_TOKEN)
    response = val;
  })

    return NextResponse.json(response, { status: 200 });
 
}