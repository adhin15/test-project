
import { NextRequest, NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getMovieExternalIds = async (movie_id:string) =>{
    const fullUrl = `${url}/movie/${movie_id}/external_ids`;
    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: process.env.BEARER_TOKEN || '',
          accept: "application/json",
        },
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  }


export async function POST(request:NextRequest) {
  let response;

  const requestData = await request.json();
  await getMovieExternalIds(requestData?.id).then((val)=>{
    response = {...val, results:[]};
  })

    return NextResponse.json(response, { status: 200 });
 
}