import { getRequestToken, validateSession, validateLogin, getDetailAccount, validateLogout } from "@/services/Auth/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


type logoutPayload = {
    session_id:string;
} 

export async function POST(request:logoutPayload) {
  let response;
  const requestData = await request.json();

  validateLogout(requestData?.session_id).then((res)=>{
    response = res;
  })
  return NextResponse.json({ message: response }, { status: 200 });
 
}