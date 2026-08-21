
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const url = process.env.TMDB_BASE_URL;

const getMovieRecommendations = async (id: string) => {
  const fullUrl = `${url}/movie/${id}/recommendations`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN ?? "",
        accept: "application/json",
      },
    });
    return Promise.resolve(await response.json());
  } catch (err) {
    console.log(err);
  }
};

export async function POST(request: NextRequest) {
  let response;
  const requestData = await request.json();
  await getMovieRecommendations(requestData?.id).then((val) => {
    response = val;
  });
  return NextResponse.json(response, { status: 200 });
}
