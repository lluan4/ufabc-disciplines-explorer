import { Params, RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/router';
import { HeaderCourseCatalog, HeaderIdealQuad } from '@/shared/ui/header/header.ui';

import QuadIdeal from './quad-ideal.ui';

export const quadIdealRoute: RouteObject = {
  path: pathKeys.quadIdeal,
  element: <QuadIdeal />,
  handle: { header: () => <HeaderIdealQuad /> },
};
