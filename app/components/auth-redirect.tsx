'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ReactNode } from 'react';

interface ConditionalAuthProps {
  children: ReactNode;
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're not already on the signup or sign-in page
    if (
      pathname !== '/signup' && 
      !pathname.startsWith('/signup/') &&
      pathname !== '/sign-in' &&
      !pathname.startsWith('/sign-in/')
    ) {
      router.push('/signup');
    }
  }, [router, pathname]);

  // If already on signup/sign-in page, render children (the signup page)
  if (pathname === '/signup' || pathname.startsWith('/signup/') || pathname === '/sign-in' || pathname.startsWith('/sign-in/')) {
    return <>{children}</>;
  }

  // Otherwise show redirecting message
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Redirecting...</div>
    </div>
  );
}
