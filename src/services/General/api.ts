import { bearerToken } from "../Apikey";
const url = `https://api.themoviedb.org/3`;

export const searchMulti = async (params:any) =>{
    const {keyword,adult="false",page=1,} = params
    const fullUrl = `${url}/search/multi?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
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