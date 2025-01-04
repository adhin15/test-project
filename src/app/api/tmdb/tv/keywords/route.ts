
import { NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getTvKeywords = async (id:string) => {
  const fullUrl = `${url}/tv/${id}/keywords`;
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


export async function POST(request:any) {
  let response;

  const requestData = await request.json();
  await getTvKeywords(requestData?.id).then((val)=>{
    response = val;
  })

    return NextResponse.json(response, { status: 200 });
 
}