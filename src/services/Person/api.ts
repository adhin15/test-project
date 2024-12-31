import { bearerToken } from "../Apikey";
const url = `https://api.themoviedb.org/3`;

export const getDetailPerson = async (id:any) => {
    const fullUrl = `${url}/person/${id}`;
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

  export const getPersonCredit = async (id:any) => {
    const fullUrl = `${url}/person/${id}/combined_credits`;
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