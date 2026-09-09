import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/signup', '/sign-in', '/'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  // Only protect non-public routes
  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
