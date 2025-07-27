import React from 'react';

import { Separator } from '@/shared/ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/components/sidebar';

import { AppSidebar } from '@/widgets/app-sidebar/app-sidebar.ui';

export default function CourseCatalog() {
  const [secondarySidebarIsHide, setSecondarySidebarIsHide] = React.useState(false);

  const styles = (
    secondarySidebarIsHide
      ? {}
      : {
          '--sidebar-width': '500px',
        }
  ) as React.CSSProperties;

  return (
    <SidebarProvider style={styles}>
      <AppSidebar
        setSecondarySidebarIsHide={setSecondarySidebarIsHide}
        secondarySidebarIsHide={secondarySidebarIsHide}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
