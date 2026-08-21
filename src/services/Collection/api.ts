import type { CollectionDetail } from "@/types";

const url = "/api/tmdb";

export const getCollection = async (payload: {
  id: string;
}): Promise<CollectionDetail | undefined> => {
  const fullUrl = `${url}/collection`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
