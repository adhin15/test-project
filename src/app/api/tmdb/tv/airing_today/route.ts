
import { NextRequest, NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getAiringToday = async () =>{
    const fullUrl = `${url}/tv/airing_today`;
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

  await getAiringToday().then((val)=>{
    response = val;
  })

    return NextResponse.json(response, { status: 200 });
 
}