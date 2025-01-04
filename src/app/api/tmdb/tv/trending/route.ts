
import { NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

type payload = {
    timeWindow: 'day' | 'week'
}

const getTrendingSeries = async ({timeWindow = "day"}: payload) => {
  try {
    const response = await fetch(`${url}/trending/tv/${timeWindow}`, {
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
  await getTrendingSeries(requestData?.timeWindow).then((val)=>{
    response = val;
  })

    return NextResponse.json({ results: response, status:'OK' }, { status: 200 });
 
}