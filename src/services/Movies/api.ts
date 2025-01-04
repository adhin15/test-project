const url = process.env.NEXT_PUBLIC_BASE_URL+"/api/tmdb";


export const getTrendingMovies = async (payload: any) => {
  try {
    const response = await fetch(`${url}/movie/trending`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch {}
};

export const getDetailMovie = async (payload:{id:string}) => {
  const fullUrl = `${url}/movie/detail`;
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

export const getMovieCastingList = async (payload:{id:string}) => {
  const fullUrl = `${url}/movie/credits`;
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

export const getMovieKeywords = async (payload:{id:string}) => {
  const fullUrl = `${url}/movie/keywords`;
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

export const getUpcomingMovies = async () =>{
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
  }
}

export const getMoviesVideo = async (payload:{id:string}) =>{
  const fullUrl = `${url}/movie/videos`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body:JSON.stringify(payload)
    });
    const responseData = await response.json();
    return Promise.resolve(responseData?.results);
  } catch (err) {
    console.log(err);
  }
}

export const searchMovie = async (payload:any) =>{
  const fullUrl = `${url}/movie/search`;
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

export const getMovieExternalIds = async (payload:{id:string}) =>{
  const fullUrl = `${url}/movie/external_ids`;
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