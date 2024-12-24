import { useQuery } from "@tanstack/react-query";
import { bearerToken } from "../Apikey";
const url = `https://api.themoviedb.org/3`;

type payload = {
    timeWindow: 'day' | 'week'
}

export const getTrendingSeries = async ({timeWindow = "day"}: payload) => {
  try {
    const response = await fetch(`${url}/trending/tv/${timeWindow}`, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData.results);
  } catch {}
};

export const getDetailTv = async (id:string) => {
  const fullUrl = `${url}/tv/${id}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvCastingList = async (id:string) => {
  const fullUrl = `${url}/tv/${id}/credits`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvKeywords = async (id:string) => {
  const fullUrl = `${url}/tv/${id}/keywords`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getAiringToday = async () =>{
  const fullUrl = `${url}/tv/airing_today`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getTvVideo = async (id:string) =>{
  const fullUrl = `${url}/tv/${id}/videos`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}
export const searchTv = async (params:any) =>{
  const {keyword,adult="false",page=1,} = params
  const fullUrl = `${url}/search/tv?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}