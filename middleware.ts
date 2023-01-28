
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/movies", "/tvshows", "/mylist", "/watch", "/person/", "/movie/", "/tv/", "/search"];
  const isPathProtected = protectedPaths?.some((path) => pathname === path || pathname.includes(path));
  const res = NextResponse.next();

  if (isPathProtected) {
    if (!req.cookies.get("token")) {
      const url = new URL(`/signin`, req.url);
      return NextResponse.redirect(url);
    }
  }

  return res;
}