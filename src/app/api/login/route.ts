
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const url = process.env.TMDB_BASE_URL;

const getRequestToken = async () => {
  const fullUrl = `${url}/authentication/token/new`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN || '',
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

const validateLogin = async (payload:any) => {
    
    const fullUrl = `${url}/authentication/token/validate_with_login`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: process.env.BEARER_TOKEN || '',
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

const validateSession = async (payload:any) => {
    const fullUrl = `${url}/authentication/session/new`;
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: process.env.BEARER_TOKEN || '',
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

const getDetailAccount = async (id:string) => {
  const fullUrl = `${url}/account/null?session_id=${id}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN || '',
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    return Promise.resolve(err)
  }
};

export async function POST(request:NextRequest) {
  let response;
  let status;
  const requestData = await request.json();

  await getRequestToken().then(async (res)=>{
    const payload ={
      username:requestData.username,
      password:requestData.password,
      request_token: res.request_token
    }
    await validateLogin(JSON.stringify(payload)).then(async(val)=>{
      await validateSession(JSON.stringify({request_token:val.request_token})).then(async(value)=>{
        if(value?.success){

          await getDetailAccount(value?.session_id).then(async(respDetail) => {
              const cookieStore = await cookies();
              cookieStore.set("MoFlixxUser", JSON.stringify({...respDetail, session_id:value?.session_id}), {});
              response = respDetail;
              status = 200;
            });
          }else if(value?.status_code === 34){
            response = 'Wrong Username / Password!';
            status=400;
          }
          console.log(value)
        });
      });
    })
    return NextResponse.json({ message: response, status:status }, { status: status });
 
}