import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppSidebar } from '@/shared/ui/app-sidebar/app-sidebar.ui';
import { DefaultHeader, RootHeader } from '@/shared/ui/header/header.ui';

import { Separator } from '../components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../components/sidebar';

export default function Layout() {
  return <GuestLayout />;
}

function GuestLayout() {
  const [secondarySidebarIsHide, setSecondarySidebarIsHide] = React.useState(false);

  const styles = (
    secondarySidebarIsHide
      ? {}
      : {
          '--sidebar-width': '570px',
        }
  ) as React.CSSProperties;

  return (
    <SidebarProvider style={styles}>
      <AppSidebar
        setSecondarySidebarIsHide={setSecondarySidebarIsHide}
        secondarySidebarIsHide={secondarySidebarIsHide}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex items-center gap-2 border-b px-4 w-full overflow-hidden">
          <SidebarTrigger className="w-[42px] h-[42px]" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <RootHeader fallback={<DefaultHeader />} />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
