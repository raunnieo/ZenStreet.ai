"use client";

import React from 'react';
import { DarkModeProvider } from '../context/DarkModeContext';
import { ClientSyncWrapper } from '../components/ClientSyncWrapper';
import { FormSkeleton } from '../components/FormSkeleton';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <React.Suspense fallback={<FormSkeleton />}>
        <ClientSyncWrapper>
          {children}
        </ClientSyncWrapper>
      </React.Suspense>
    </DarkModeProvider>
  );
};
