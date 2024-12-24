"use client";

import React from 'react';
import { FormProvider } from '../context/FormContext';
import SyncStatus from './SyncStatus';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormSkeleton } from './FormSkeleton';
import { generateSessionId, updateUrlWithSession } from '../utils/session';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const ClientSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('session');
    
    if (sessionId) {
      setSession(sessionId);
      console.log('Using session:', sessionId);
    }
  }, []);

  if (!session) {
    return <FormSkeleton />;
  }

  return (
    <ErrorBoundary fallback={<FormSkeleton />}>
      <FormProvider initialSessionId={session}>
        {children}
      </FormProvider>
    </ErrorBoundary>
  );
};
