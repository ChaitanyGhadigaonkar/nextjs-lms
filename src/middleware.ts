import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const skipMiddlewareRoutes = ["/api/upload"];

  if (skipMiddlewareRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
