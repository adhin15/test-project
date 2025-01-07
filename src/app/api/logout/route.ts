
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const url = process.env.TMDB_BASE_URL;


const validateLogout = async (payload:any) => {
      
    const fullUrl = `${url}/authentication/session`;
    try {
      const response = await fetch(fullUrl, {
        method: "DELETE",
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
export async function POST(request:NextRequest) {
  const requestData = await request.json();
  
  validateLogout(JSON.stringify({session_id: requestData?.session_id})).then(async(res)=>{
    const cookieStore = await cookies();
    cookieStore.delete("MoFlixxUser");
  })
  return NextResponse.json({ message: 'success' }, { status: 200 });
 
}