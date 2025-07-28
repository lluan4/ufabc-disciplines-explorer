import { useMemo } from 'react';

import { Outlet, RouterProvider, createBrowserRouter, redirect, useRouteError } from 'react-router';

import { pathKeys } from '@/shared/router';
import Layout from '@/shared/ui/layout/layout.ui';

import { catalogRoute } from '@/pages/course-catalog/course-catalog.route';
import { homeRoute } from '@/pages/home/home.router';
import { page404Route } from '@/pages/page-404/page-404.route';
import { quadIdealRoute } from '@/pages/quad-ideal/quad-ideal.route';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      errorElement: <BubbleError />,
      children: [
        {
          element: <Layout />,
          children: [homeRoute, catalogRoute, quadIdealRoute],
        },
        {
          element: <Outlet />,
          children: [page404Route],
        },
        {
          path: '*',
          loader: async () => redirect(pathKeys.page404),
        },
      ],
    },
    // {
    //   path: '*',
    //   lazy: () => import('./routes/not-found'),
    // },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};

function BubbleError(): null {
  const error = useRouteError();

  if (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
    }
  }
  return null;
}
