import type { TrendingItem } from "@/types";

const url = "/api/tmdb";

export const searchMulti = async (payload: {
  keyword?: string;
  adult?: boolean | string;
  page?: number | string;
}): Promise<TrendingItem[] | undefined> => {
  const fullUrl = `${url}/multi/search/`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData.results);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
