const DEFAULT_CALLBACK_URL = "/";

const AUTH_ROUTES = ["/login", "/signup"];

const PROTECTED_ROUTE_PREFIXES = [
  "/share-food",
  "/my-shared-foods",
  "/my-requests",
  "/request-send",
  "/incoming-food-requests",
];

/**
 * Prevents external/open redirects.
 * Only internal paths beginning with a single "/" are accepted.
 */
export const getSafeCallbackURL = (
  value?: string | null,
): string => {
  const callbackURL = value?.trim();

  if (!callbackURL) {
    return DEFAULT_CALLBACK_URL;
  }

  if (
    !callbackURL.startsWith("/") ||
    callbackURL.startsWith("//")
  ) {
    return DEFAULT_CALLBACK_URL;
  }

  const pathname = callbackURL
    .split("?")[0]
    .split("#")[0];

  const pointsToAuthPage = AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  if (pointsToAuthPage) {
    return DEFAULT_CALLBACK_URL;
  }

  return callbackURL;
};

export const buildLoginHref = (
  callbackURL?: string | null,
): string => {
  const safeCallbackURL =
    getSafeCallbackURL(callbackURL);

  const params = new URLSearchParams({
    callbackURL: safeCallbackURL,
  });

  return `/login?${params.toString()}`;
};

export const buildSignupHref = (
  callbackURL?: string | null,
): string => {
  const safeCallbackURL =
    getSafeCallbackURL(callbackURL);

  const params = new URLSearchParams({
    callbackURL: safeCallbackURL,
  });

  return `/signup?${params.toString()}`;
};

export const isProtectedPathname = (
  value?: string | null,
): boolean => {
  if (!value) {
    return false;
  }

  const pathname = value
    .split("?")[0]
    .split("#")[0];

  return PROTECTED_ROUTE_PREFIXES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );
};