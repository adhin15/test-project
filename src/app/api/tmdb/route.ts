import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
  let response;
  let status;
  const requestData = await request.json();

    return NextResponse.json({ message: response, status:status }, { status: status });
 
}