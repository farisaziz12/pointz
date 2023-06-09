import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { storyPoints, sessionKey, username } = body;

    if (typeof storyPoints !== 'number' || !sessionKey || !username) {
        return NextResponse.json({
            message: "Invalid request body",
        }, { status: 400 });
    }

    const storyPointLog = {
      [username]: storyPoints,
    };

    await kv.hset(sessionKey, storyPointLog);

    return NextResponse.json({ status: "success", storyPoints });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
