import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { sessionKey, username } = body;

    if (!sessionKey || !username) {
      return NextResponse.json(
        {
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    await kv.hdel(sessionKey, username);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}