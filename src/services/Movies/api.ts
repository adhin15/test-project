import { useQuery } from "@tanstack/react-query";
import { bearerToken } from "../Apikey";
const url = `https://api.themoviedb.org/3`;

type payload = {
    timeWindow: 'day' | 'week'
}

export const getTrendingMovies = async ({timeWindow = "day"}: payload) => {
  try {
    const response = await fetch(`${url}/trending/movie/${timeWindow}`, {
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

export const getDetailMovie = async (id:string) => {
  const fullUrl = `${url}/movie/${id}`;
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

export const getMovieCastingList = async (id:string) => {
  const fullUrl = `${url}/movie/${id}/credits`;
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

export const getMovieKeywords = async (id:string) => {
  const fullUrl = `${url}/movie/${id}/keywords`;
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

export const getUpcomingMovies = async () =>{
  const fullUrl = `${url}/movie/upcoming`;
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

export const getMoviesVideo = async (id:string) =>{
  const fullUrl = `${url}/movie/${id}/videos`;
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

export const searchMovie = async (params:any) =>{
  const {keyword,adult="false",page=1,} = params
  const fullUrl = `${url}/search/movie?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
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

export const getExternalIds = async (movie_id:string) =>{
  const fullUrl = `${url}/movie/${movie_id}/external_ids`;
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