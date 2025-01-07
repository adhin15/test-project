
import { NextRequest, NextResponse } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getDetailAccount = async (id:string) => {
  const fullUrl = `${url}/account/null?session_id=${id}`;
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
    return Promise.resolve(err)
  }
};

export async function POST(request:NextRequest) {
  let response;

  const requestData = await request.json();
  await getDetailAccount(requestData?.id).then((val)=>{
    response = val;
  })
    return NextResponse.json(response, { status: 200 });
}