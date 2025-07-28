import type { ReactNode } from 'react';

import type { Params } from 'react-router-dom';

export type RouteHandle = {
  header?: (params: Params) => ReactNode;
};

export const pathKeys = {
  home: '/',
  catalog: '/:course/:subjectCode',
  page404: '/404/',
  quadIdeal: '/quad-ideal',
} as const;
