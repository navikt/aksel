import { NextResponse, connection } from "next/server";

export async function GET(): Promise<NextResponse> {
  await connection();
  return NextResponse.json({ message: "It's Alive!!!" });
}
