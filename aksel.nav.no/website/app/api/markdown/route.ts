import { NextRequest, NextResponse } from "next/server";
import { AVALIABLE_MARKDOWN_ROUTES } from "@/app/api/markdown/llm.config";

/**
 * Central markdown route handler
 * Handles all .md requests by determining the route type and converting to markdown
 */
export async function GET(request: NextRequest) {
  if (!request.nextUrl.pathname.endsWith(".md")) {
    return new NextResponse("Request not valid for markdown conversion", {
      status: 400,
    });
  }
  const basePath = request.nextUrl.pathname.slice(0, -3);

  if (!AVALIABLE_MARKDOWN_ROUTES.includes(basePath)) {
    return new NextResponse("Markdown version not available for this route", {
      status: 404,
    });
  }

  try {
    return new NextResponse(`## Hello world`, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
    /* return new NextResponse("Markdown version not available for this route", {
      status: 404,
    }); */
  } catch (error) {
    console.error("Error generating markdown:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
