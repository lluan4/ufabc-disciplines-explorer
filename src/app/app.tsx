import React from 'react';

import { LoaderCircle } from 'lucide-react';

import { AppRouter } from './browser-router';

export default function App() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <LoaderCircle size="xl" />
        </div>
      }
    >
      <AppRouter />
    </React.Suspense>
  );
}
