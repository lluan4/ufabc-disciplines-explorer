import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/router';

import CourseCatalog from './course-catalog.ui';

export const homeRoute: RouteObject = {
  path: pathKeys.home,
  element: <CourseCatalog />,
};
