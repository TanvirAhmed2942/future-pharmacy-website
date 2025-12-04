import createIntlMiddleware from "next-intl/middleware";

// Create the intl middleware for internationalization
const intlMiddleware = createIntlMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "never",
});

export default intlMiddleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files with extensions (e.g. .png, .jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
