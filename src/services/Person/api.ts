const url = process.env.NEXT_PUBLIC_BASE_URL+"/api/tmdb";

export const getDetailPerson = async (payload:{id:string}) => {
    const fullUrl = `${url}/person/detail`;
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

  export const getPersonCredit = async (payload:{id:string}) => {
    const fullUrl = `${url}/person/combined_credits`;
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