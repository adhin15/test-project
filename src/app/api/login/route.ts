
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
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

const validateLogin = async (payload: string) => {
    
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

const validateSession = async (payload: string) => {
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
  // Use the session-scoped account endpoint (no hardcoded account id).
  const fullUrl = `${url}/account?session_id=${encodeURIComponent(id)}`;
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

  // Rate limit by client IP to slow brute-force attempts.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = rateLimit(`login:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const requestData = await request.json();

  // Validate required fields.
  if (
    typeof requestData?.username !== "string" ||
    typeof requestData?.password !== "string" ||
    !requestData.username.trim() ||
    !requestData.password
  ) {
    return NextResponse.json(
      { message: "Username and password are required." },
      { status: 400 }
    );
  }

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
              cookieStore.set("MoFlixxUser", JSON.stringify({...respDetail, session_id:value?.session_id}), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
              });
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