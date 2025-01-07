
import { NextRequest, NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getMoviesVideo = async (id:string) =>{
    const fullUrl = `${url}/movie/${id}/videos`;
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
  await getMoviesVideo(requestData?.id).then((val)=>{
    response = val;
  })

    return NextResponse.json({ results: response, status:'OK' }, { status: 200 });
 
}