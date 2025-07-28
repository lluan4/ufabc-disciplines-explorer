import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/router';
import { DefaultHeader } from '@/shared/ui/header/header.ui';

import Home from './home.ui';

export const homeRoute: RouteObject = {
  path: pathKeys.home,
  element: <Home />,
  handle: { header: () => <DefaultHeader /> },
};
