import React, { Suspense } from 'react';
import { Loader } from '@src/components/Loader/Loader';

export const withSuspense = (WrappedComponent: React.ComponentType) => {
  return () => (
    <Suspense fallback={<Loader />}>
      <WrappedComponent/>
    </Suspense>
  );
};
