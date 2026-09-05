import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export const proxy = async (request: NextRequest) => {
  console.log(`Middleware hit at domain name ${request.nextUrl.pathname}`);

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/wishlist/:path*"],
};
