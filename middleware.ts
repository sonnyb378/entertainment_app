
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/movies", "/tvshows", "/mylist", "/watch", "/person", "/movie", "/tv", "/search"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  if (isPathProtected) {
    if (!req.cookies.get("token")) {
      const url = new URL(`/signin`, req.url);
    //   url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return res;
}