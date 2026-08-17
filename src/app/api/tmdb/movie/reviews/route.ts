
import { NextRequest, NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getMovieReview = async (payload:{id:string, page:string}) => {
  const {id, page = "1"} = payload;
    const fullUrl = `${url}/movie/${id}/reviews?language=en-US&page=${page}`;
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
  };


export async function POST(request:NextRequest) {
  let response;

  const requestData = await request.json();
  await getMovieReview({ id:requestData?.id, page:requestData?.page}).then((val)=>{
    response = val;
  })

    return NextResponse.json(response, { status: 200 });
 
}