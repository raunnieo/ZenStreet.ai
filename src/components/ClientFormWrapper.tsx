"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClientSyncWrapper } from './ClientSyncWrapper';
import { FormContent } from './FormContent';
import { FormSkeleton } from './FormSkeleton';

export function ClientFormWrapper() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for session parameter
    const url = new URL(window.location.href);
    const sessionParam = url.searchParams.get('session');

    if (!sessionParam) {
      // Generate new session ID
      const sessionId = Math.random().toString(36).substring(2, 9);
      url.searchParams.set('session', sessionId);
      
      // Update URL
      window.history.replaceState({}, '', url.toString());
      
      // Force router update
      router.replace(url.toString());
    }
    
    setMounted(true);
  }, [router]);

  if (!mounted) {
    return <FormSkeleton />;
  }

  return (
    <ClientSyncWrapper>
      <FormContent />
    </ClientSyncWrapper>
  );
}
