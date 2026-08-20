import type {
  Credits,
  ExternalIds,
  Keyword,
  MovieDetail,
  MovieSummary,
  Paginated,
  Review,
  Video,
} from "@/types";

const url = "/api/tmdb";

export const getTrendingMovies = async (payload: {
  timeWindow: "day" | "week";
}): Promise<MovieSummary[] | undefined> => {
  try {
    const response = await fetch(`${url}/movie/trending`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch {
    return undefined;
  }
};

export const getDetailMovie = async (payload: {
  id: string;
}): Promise<MovieDetail | undefined> => {
  const fullUrl = `${url}/movie/detail`;
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

export const getMovieCastingList = async (payload: {
  id: string;
}): Promise<Credits | undefined> => {
  const fullUrl = `${url}/movie/credits`;
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

export const getMovieKeywords = async (payload: {
  id: string;
}): Promise<{ keywords: Keyword[] } | undefined> => {
  const fullUrl = `${url}/movie/keywords`;
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

export const getUpcomingMovies = async (): Promise<
  Paginated<MovieSummary> | undefined
> => {
  const fullUrl = `${url}/movie/upcoming`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getMoviesVideo = async (payload: {
  id: string;
}): Promise<{ results: Video[] } | undefined> => {
  const fullUrl = `${url}/movie/videos`;
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

export const searchMovie = async (payload: {
  keyword?: string;
  adult?: boolean | string;
  page?: number | string;
}): Promise<Paginated<MovieSummary> | undefined> => {
  const fullUrl = `${url}/movie/search`;
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

export const getMovieExternalIds = async (payload: {
  id: string;
}): Promise<ExternalIds | undefined> => {
  const fullUrl = `${url}/movie/external_ids`;
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

export const getMovieReviews = async (payload: {
  id: string;
  page: string;
}): Promise<Paginated<Review> | undefined> => {
  try {
    const response = await fetch(`${url}/movie/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch {
    return undefined;
  }
};
