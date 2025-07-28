import * as React from 'react';

import { Link, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/components/sidebar';

import {
  Category,
  getCategories,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.api';

import { SearchForm } from '../../../widgets/search-form/search-form.ui';
import { VersionSwitcher } from '../../../widgets/version-switcher/version-switcher.ui';
import SidebarSubjects from '../sidebar-subjects/sidebar-subjects.ui';

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
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const { setOpenMobile } = useSidebar();

  const location = useLocation();

  const handleActiveItemChange = (item: { title: string; url: string }) => {
    if (item.title !== 'Matérias') setActiveCategory(null);
    setActiveItem(item);

    if (item.title === 'Matérias') return;

    setOpenMobile(false);
  };

  const handleShowDisciplines = (category: Category) => {
    setActiveCategory(category);
  };

  const loadCategories = React.useCallback(async (filter?: string) => {
    const categories = await getCategories(filter);
    setCategories(categories);
  }, []);

  const handleDebounce = React.useCallback(
    (value: string) => {
      loadCategories(value);
    },
    [loadCategories],
  );

  React.useEffect(() => {
    setSecondarySidebarIsHide(!activeCategory);
  }, [activeCategory, setSecondarySidebarIsHide]);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const isMateriasActive = activeItem?.title === 'Matérias';
  const className = secondarySidebarIsHide ? '' : 'w-[calc(var(--sidebar-width-icon)+208px)]!';

  return (
    <Sidebar collapsible="offcanvas" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
      <Sidebar collapsible="none" className={`${className} border-r`}>
        <SidebarHeader>
          <VersionSwitcher />
          {activeItem?.title === 'Matérias' && (
            <SearchForm
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onDebounce={handleDebounce}
              placeholder="Busque o Curso..."
            />
          )}
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {data.navMain.map((item) => (
            <SidebarGroup>
              <SidebarGroupLabel asChild className="group/label text-sidebar-foreground  text-sm">
                <div>{item.title}</div>
              </SidebarGroupLabel>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="pl-2 ">
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
                <SidebarMenuItem className="pl-2">
                  <SidebarMenuButton
                    tooltip={{
                      children: 'Todas as categorias',
                      hidden: false,
                    }}
                    className="block max-w-100 truncate hover:cursor-pointer "
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
                  <SidebarMenuItem key={item.categoryCode} className="pl-2">
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
