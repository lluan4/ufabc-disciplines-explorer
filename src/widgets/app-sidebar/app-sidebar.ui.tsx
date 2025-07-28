import * as React from 'react';

import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { it } from 'node:test';
import { Link, useLocation } from 'react-router-dom';

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

import {
  Category,
  getAllAcronymByCategoryCode,
  getCategories,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.lib';
import { undergraduateCourseCategories } from '@/entities/undergraduate-course-categories/undergraduate-course-categories.mock';

import { SearchForm } from '../search-form/search-form.ui';
import SidebarSubjects from '../sidebar-subjects/sidebar-subjects.ui';
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
          url: '/quad-ideal',
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
  const [activeItem, setActiveItem] = React.useState<{ title: string; url: string } | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<Category | null>(null);

  const location = useLocation();

  const handleActiveItemChange = (item: { title: string; url: string }) => {
    if (item.title !== 'Matérias') setActiveCategory(null);
    setActiveItem(item);
  };

  const handleShowDisciplines = (category: Category) => {
    setActiveCategory(category);
  };

  const categories = React.useMemo(() => {
    return getCategories();
  }, []);

  React.useEffect(() => {
    setSecondarySidebarIsHide(!activeCategory);

    console.log('activeCategory', activeCategory);
  }, [activeCategory]);

  const isMateriasActive = activeItem?.title === 'Matérias';
  const className = secondarySidebarIsHide ? '' : 'w-[calc(var(--sidebar-width-icon)+208px)]!';

  return (
    <Sidebar collapsible="offcanvas" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
      <Sidebar collapsible="none" className={`${className} border-r`}>
        <SidebarHeader>
          <VersionSwitcher />
          <SearchForm />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {data.navMain.map((item) => (
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
                    <Link to={item.url !== '#' ? item.url : location.pathname}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        className="block max-w-100 truncate hover:cursor-pointer"
                        isActive={activeItem?.title === item.title}
                        onClick={() => handleActiveItemChange(item)}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}

          {isMateriasActive && (
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <div>Categoria</div>
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: 'Todas as categorias',
                      hidden: false,
                    }}
                    className="block max-w-100 truncate hover:cursor-pointer"
                    isActive={!activeCategory}
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowDisciplines({ categoryCode: 'all', categoryName: 'all' });
                    }}
                  >
                    <a>Todas as categorias</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {categories.map((item) => (
                  <SidebarMenuItem key={item.categoryCode}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.categoryName,
                        hidden: false,
                      }}
                      className="block max-w-100 truncate hover:cursor-pointer"
                      isActive={activeCategory?.categoryCode === item.categoryCode}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShowDisciplines(item);
                      }}
                    >
                      <a>{item.categoryName}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>

      <SidebarSubjects
        secondarySidebarIsHide={secondarySidebarIsHide}
        activeCategory={activeCategory}
        setSecondarySidebarIsHide={setSecondarySidebarIsHide}
      />
    </Sidebar>
  );
}
