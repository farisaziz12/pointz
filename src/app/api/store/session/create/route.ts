import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

function generateRandomKey(): string {
  return uuidv4();
}

async function checkIfKeyExists(key: string): Promise<boolean> {
  try {
    const value = await kv.hgetall(key);
    return value !== null;
  } catch (error) {
    console.error("Error checking key:", error);
    return false;
  }
}

async function generateUniqueKey(attempts = 0): Promise<string> {
  if (attempts >= 3) {
    throw new Error("Failed to generate a unique key after 3 attempts.");
  }

  const key = generateRandomKey();
  const exists = await checkIfKeyExists(key);

  if (exists) {
    return generateUniqueKey(attempts + 1); // Recursively generate a new key
  }

  return key;
}

export async function POST(request: Request) {
  try {
    const uniqueKey = await generateUniqueKey();

    return NextResponse.json({ sessionKey: uniqueKey });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Failed to create session'
    });
  }
}
