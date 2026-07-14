// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { auth } from './lib/auth'
// import { headers } from 'next/headers'
 
// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {
//     const session = await auth.api.getSession({
//         headers: await headers()
//     })

//     if (!session) {
//         return NextResponse.redirect(new URL('login', request.url))

//     }
  
// }
 
// export const config = {
//   matcher: ['/share-food','/my-shared-foods','/my-requests','/request-send/:path',
//     '/incoming-food-requests'],
// }










import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

/**
 * Protects private ShareBite pages.
 *
 * Unauthenticated users are redirected to:
 * /login?callbackURL=/the-original-page
 */
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const originalPage = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    const loginURL = request.nextUrl.clone();

    loginURL.pathname = "/login";
    loginURL.search = "";
    loginURL.searchParams.set(
      "callbackURL",
      originalPage,
    );

    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/share-food/:path*",
    "/my-shared-foods/:path*",
    "/my-requests/:path*",
    "/request-send/:path*",
    "/incoming-food-requests/:path*",
  ],
};