const url = process.env.NEXT_PUBLIC_BASE_URL+"/api/tmdb";

export const searchMulti = async (payload:any) =>{
    const fullUrl = `${url}/multi/search/`;
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