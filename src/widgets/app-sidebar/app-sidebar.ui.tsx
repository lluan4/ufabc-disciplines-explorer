import * as React from 'react';

import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';

import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Button } from '@/shared/ui/components/button';
import { Collapsible } from '@/shared/ui/components/collapsible';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shared/ui/components/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/shared/ui/components/sidebar';

import { SearchForm } from '../search-form/search-form.ui';
import { VersionSwitcher } from '../version-switcher/version-switcher.ui';

const data = {
  navMain: [
    {
      title: 'Navegação',
      url: '#',
      items: [
        {
          title: 'Matérias',
          url: '#',
        },
        {
          title: 'Quad Ideal',
          url: '#',
        },
      ],
    },
    {
      title: 'Categorias',
      url: '#',
      items: [
        {
          title: 'Todas as Matérias',
          url: '#',
        },
        {
          title: 'Ciência e Tecnologia',
          url: '#',
        },
        {
          title: 'Bacharelado em Ciência da Computação',
          url: '#',
        },
      ],
    },
  ],
};

type AppSidebarProps = {
  setSecondarySidebarIsHide: React.Dispatch<React.SetStateAction<boolean>>;
  secondarySidebarIsHide: boolean;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ setSecondarySidebarIsHide, secondarySidebarIsHide, ...props }: AppSidebarProps) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0].items[0]);
  const [teste, setTeste] = React.useState(false);

  const { setOpenMobile, isMobile } = useSidebar();

  const canShowSecondarySidebar = !isMobile;
  const canShowSheet = isMobile;
  const className = secondarySidebarIsHide ? '' : 'w-[calc(var(--sidebar-width-icon)+208px)]!';

  const filteredMenus = React.useMemo(() => {
    if (activeItem.title === 'Matérias') return data.navMain;

    return data.navMain.filter((item) => item.title === 'Navegação');
  }, [activeItem]);

  return (
    <Sidebar collapsible="offcanvas" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
      <Sidebar collapsible="none" className={`${className} border-r`}>
        <SidebarHeader>
          <VersionSwitcher />
          <SearchForm />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {filteredMenus.map((item) => (
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <div>{item.title} </div>
              </SidebarGroupLabel>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      className="block max-w-100 truncate"
                      isActive={activeItem?.title === item.title}
                      onClick={() => {
                        setActiveItem(item);

                        if (item.title === 'Matérias') {
                          setSecondarySidebarIsHide(false);
                        } else {
                          setSecondarySidebarIsHide(true);
                        }
                      }}
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      {canShowSecondarySidebar && (
        <Sidebar collapsible="none" className="flex-1 md:flex" hidden={secondarySidebarIsHide}>
          <SidebarHeader>
            <VersionSwitcher />
            <SearchForm />
          </SidebarHeader>
          <SidebarContent className="gap-0"></SidebarContent>
          <SidebarRail />
        </Sidebar>
      )}
      {canShowSheet && (
        <Sheet open={!secondarySidebarIsHide} onOpenChange={(open) => setSecondarySidebarIsHide(!open)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                <Button
                  onClick={() => {
                    setSecondarySidebarIsHide(true);
                    setOpenMobile(false);
                  }}
                >
                  Teste
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </Sidebar>
  );
}
