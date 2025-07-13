import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-start bg-background p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M12 2v2.5" />
              <path d="M12 19.5V22" />
              <path d="m4.93 4.93 1.77 1.77" />
              <path d="m17.3 17.3 1.77 1.77" />
              <path d="M2 12h2.5" />
              <path d="M19.5 12H22" />
              <path d="m4.93 19.07 1.77-1.77" />
              <path d="m17.3 6.7-1.77 1.77" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <h1 className="text-2xl font-headline font-semibold">NexusConnect</h1>
          </div>
        {children}
      </div>
    </div>
  );
}
