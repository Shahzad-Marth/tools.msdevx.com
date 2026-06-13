export function proxy(request) {
  const host = request.headers.get("host") || "";
  const legacyHost = "tools.marth.systems";

  if (host === legacyHost || host === `www.${legacyHost}`) {
    const url = request.nextUrl.clone();
    url.host = "tools.msdevx.com";
    url.protocol = "https";
    return Response.redirect(url, 308);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|assets/).*)",
  ],
};
