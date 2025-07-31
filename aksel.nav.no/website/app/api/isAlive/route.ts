import { NextResponse } from "next/server";

export function GET(): NextResponse {
  return NextResponse.json({ message: "It's Alive!!!" });
}
