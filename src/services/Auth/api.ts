import { bearerToken } from "../Apikey";
const url = `https://api.themoviedb.org/3`;

export const getRequestToken = async () => {
  const fullUrl = `${url}/authentication/token/new`;
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

export const validateLogin = async (payload:any) => {
    
    const fullUrl = `${url}/authentication/token/validate_with_login`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json'
        },
        body:payload
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  export const authLogin = async (payload:any) => {
    
    const fullUrl = `http://localhost:3000/api/login`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json'
        },
        body:payload
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const authLogout = async (payload:any) => {
    
    const fullUrl = `http://localhost:3000/api/logout`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json'
        },
        body:payload
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const validateLogout = async (payload:any) => {
      
    const fullUrl = `${url}/authentication/session`;
    try {
      const response = await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json'
        },
        body:payload
      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const validateSession = async (payload:any) => {
    
    const fullUrl = `${url}/authentication/session/new`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json'
        },
        body:payload

      });
      const responseData = await response.json();
      return Promise.resolve(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  export const getDetailAccount = async (id:string) => {
    
    const fullUrl = `${url}/account/null?session_id=${id}`;
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
      return Promise.resolve(err)
    }
  };