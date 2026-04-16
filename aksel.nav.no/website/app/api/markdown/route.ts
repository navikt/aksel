import { NextRequest, NextResponse } from "next/server";
import { isValidRoute, markdownForRoute } from "@/app/api/markdown/llm.config";

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

  if (!isValidRoute(basePath)) {
    return new NextResponse(
      "ERROR: Markdown version not available for this route",
      {
        status: 404,
      },
    );
  }

  try {
    const markdown = await markdownForRoute(basePath);

    if (!markdown || markdown.length === 0) {
      return new NextResponse(
        "ERROR: Markdown version not available for this route",
        {
          status: 404,
        },
      );
    }

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new NextResponse(
      "ERROR: Markdown version not available for this route",
      {
        status: 404,
      },
    );
  }
}
