const url = process.env.NEXT_PUBLIC_BASE_URL+"/api/tmdb";

type payload = {
    timeWindow: 'day' | 'week'
}

export const getTrendingSeries = async (payload: payload) => {
  try {
    const response = await fetch(`${url}/tv/trending`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData.results);
  } catch {}
};

export const getDetailTv = async (payload:{id:string}) => {
  const fullUrl = `${url}/tv/detail`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvCastingList = async (payload:{id:string}) => {
  const fullUrl = `${url}/tv/credits`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvKeywords = async (payload:{id:string}) => {
  const fullUrl = `${url}/tv/keywords`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
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
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getTvVideo = async (payload:{id:string}) =>{
  const fullUrl = `${url}/tv//videos`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}
export const searchTv = async (payload:any) =>{
  const fullUrl = `${url}/tv/search/`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getTvExternalIds = async (payload:{id:string}) =>{
  const fullUrl = `${url}/tv/external_ids`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}