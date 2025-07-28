import { RouteObject } from 'react-router-dom';

import { pathKeys } from '@/shared/router';

import CourseDetails from '../course-details/course-details.ui';
import CourseCatalog from './course-catalog.ui';

export const homeRoute: RouteObject = {
  path: pathKeys.home,
  element: <CourseCatalog />,
  children: [
    {
      path: ':course/:subjectCode',
      element: <CourseDetails />,
    },
  ],
};
