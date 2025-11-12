import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "never", // Don't add locale prefix to URLs
});

export default function middleware(request) {
  // Get locale from cookie
  const cookieLocale = request.cookies.get("MYNEXTAPP_LOCALE")?.value;

  // If cookie exists and is valid, use it
  if (cookieLocale && ["en", "fr"].includes(cookieLocale)) {
    const response = intlMiddleware(request);
    // Add locale to headers so it can be accessed server-side
    response.headers.set("x-locale", cookieLocale);
    return response;
  }

  // Otherwise use default behavior
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes, static files, and Next.js internals
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
