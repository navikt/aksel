import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GLOBAL_SEARCH_MAX_QUERY_LENGTH } from "@/app/_ui/global-search/server/GlobalSearch.config";
import { globalSearch } from "@/app/_ui/global-search/server/GlobalSearch.search";

const querySchema = z.string().trim().max(GLOBAL_SEARCH_MAX_QUERY_LENGTH);

export async function GET(request: NextRequest) {
  const query = querySchema.safeParse(request.nextUrl.searchParams.get("q"));

  if (!query.success) {
    return NextResponse.json(
      { error: "Invalid query parameter: q" },
      { status: 400 },
    );
  }

  return NextResponse.json(await globalSearch(query.data), {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
