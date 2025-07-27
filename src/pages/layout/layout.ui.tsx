import { NavLink, Outlet } from 'react-router-dom';

import { pathKeys } from '@/shared/router';

export default function Layout() {
  return <GuestLayout />;
}

function GuestLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
