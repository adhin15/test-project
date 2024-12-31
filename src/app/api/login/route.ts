import { getRequestToken, validateSession, validateLogin, getDetailAccount } from "@/services/Auth/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


type loginPayload = {
  username:string,
  password:string,
} 

export async function POST(request:loginPayload) {
  let response;
  const requestData = await request.json();

  await getRequestToken().then(async (res)=>{
    const payload ={
      username:requestData.username,
      password:requestData.password,
      request_token: res.request_token
    }
    await validateLogin(JSON.stringify(payload)).then(async(val)=>{
      
      await validateSession(JSON.stringify({request_token:val.request_token})).then(async(value)=>{
        await getDetailAccount(value?.session_id).then(async(respDetail) => {
          const cookieStore = await cookies();
          cookieStore.set("MoFlixxUser", JSON.stringify({...respDetail, session_id:value?.session_id}), {});
          response = respDetail;
        });
      });
    })
  })
  return NextResponse.json({ message: response }, { status: 200 });
 
}