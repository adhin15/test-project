import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const url = process.env.TMDB_BASE_URL;

type SearchParams = {
  keyword?: unknown;
  adult?: unknown;
  page?: unknown;
};

const searchTv = async (params: SearchParams) => {
  // Validate & coerce inputs to prevent SSRF / URL injection.
  const keyword = typeof params?.keyword === "string" ? params.keyword.trim() : "";
  if (!keyword) return { results: [], total_pages: 0 };

  const adult = params?.adult === true || params?.adult === "true" ? "true" : "false";
  const page = Number(params?.page);
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;

  const fullUrl = `${url}/search/tv?query=${encodeURIComponent(
    keyword
  )}&include_adult=${adult}&language=en-US&page=${safePage}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN || "",
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export async function POST(request: NextRequest) {
  let response;

  const requestData = (await request.json()) as SearchParams;
  await searchTv(requestData).then((val) => {
    response = val;
  });

  return NextResponse.json(response, { status: 200 });
}
