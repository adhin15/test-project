
import { NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const searchTv = async (params:any) =>{
    const {keyword,adult="false",page=1,} = params
    const fullUrl = `${url}/search/tv?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
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


export async function POST(request:any) {
  let response;

  const requestData = await request.json();
  await searchTv(requestData).then((val)=>{
    response = val;
  })

    return NextResponse.json(response, { status: 200 });
 
}