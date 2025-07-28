import React from 'react';

import { Outlet } from 'react-router-dom';

import { Separator } from '@/shared/ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/components/sidebar';

import { AppSidebar } from '@/widgets/app-sidebar/app-sidebar.ui';

import { Header } from '../../widgets/header/header.ui';

export default function CourseCatalog() {
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
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
