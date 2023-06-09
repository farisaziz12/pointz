import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionKey = searchParams.get("sessionKey");


  if (!sessionKey || sessionKey === "undefined") {
    return NextResponse.json({
      message: "Session key not provided",
    }, { status: 400 });
  }

  try {
    const list = await kv.hgetall(sessionKey);

    // if (list === null) {
    //   return NextResponse.json({
    //     message: "Session not found",
    //   }, { status: 404 });
    // }

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
