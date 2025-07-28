import { Params, RouteObject, useParams } from 'react-router-dom';

import { pathKeys } from '@/shared/router';
import { HeaderCourseCatalog } from '@/shared/ui/header/header.ui';

import CourseCatalog from './course-catalog.ui';

export const catalogRoute: RouteObject = {
  path: pathKeys.catalog,
  element: <CourseCatalog />,
  handle: {
    header: (params: { course: string; subjectCode: string }) => {
      return <HeaderCourseCatalog params={params} />;
    },
  },
};
