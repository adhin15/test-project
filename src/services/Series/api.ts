import type {
  Credits,
  ExternalIds,
  Keyword,
  Paginated,
  SeriesDetail,
  SeriesSummary,
  Video,
} from "@/types";

const url = "/api/tmdb";

type payload = {
  timeWindow: "day" | "week";
};

export const getTrendingSeries = async (
  payload: payload
): Promise<SeriesSummary[] | undefined> => {
  try {
    const response = await fetch(`${url}/tv/trending`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return Promise.resolve(responseData.results);
  } catch {
    return undefined;
  }
};

export const getDetailTv = async (payload: {
  id: string;
}): Promise<SeriesDetail | undefined> => {
  const fullUrl = `${url}/tv/detail`;
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

export const getTvCastingList = async (payload: {
  id: string;
}): Promise<Credits | undefined> => {
  const fullUrl = `${url}/tv/credits`;
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

export const getTvKeywords = async (payload: {
  id: string;
}): Promise<{ results: Keyword[] } | undefined> => {
  const fullUrl = `${url}/tv/keywords`;
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

export const getAiringToday = async (): Promise<
  Paginated<SeriesSummary> | undefined
> => {
  const fullUrl = `${url}/tv/airing_today`;
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

export const getTvVideo = async (payload: {
  id: string;
}): Promise<{ results: Video[] } | undefined> => {
  const fullUrl = `${url}/tv//videos`;
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

export const searchTv = async (payload: {
  keyword?: string;
  adult?: boolean | string;
  page?: number | string;
}): Promise<Paginated<SeriesSummary> | undefined> => {
  const fullUrl = `${url}/tv/search/`;
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

export const getTvExternalIds = async (payload: {
  id: string;
}): Promise<ExternalIds | undefined> => {
  const fullUrl = `${url}/tv/external_ids`;
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
