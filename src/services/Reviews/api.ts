const url = process.env.NEXT_PUBLIC_BASE_URL+"/api/tmdb";


export const get = async (payload: any) => {
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