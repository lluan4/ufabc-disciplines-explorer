import React, { useEffect } from 'react';

import { Button } from '@/shared/ui/components/button';
import { Separator } from '@/shared/ui/components/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shared/ui/components/sheet';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar } from '@/shared/ui/components/sidebar';

import { ISubject } from '@/entities/subjects/subject.contract';
import { getSubjectsByAcronym } from '@/entities/subjects/subject.lib';
import {
  Category,
  getAllAcronymByCategoryCode,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.lib';

import { CourseCard } from '../course-card/course-card.ui';
import { SearchForm } from '../search-form/search-form.ui';
import { VersionSwitcher } from '../version-switcher/version-switcher.ui';

type SidebarSubjectsProps = {
  secondarySidebarIsHide: boolean;
  setSecondarySidebarIsHide: React.Dispatch<React.SetStateAction<boolean>>;
  activeCategory: Category | null;
};

export default function SidebarSubjects({
  secondarySidebarIsHide,
  setSecondarySidebarIsHide,
  activeCategory,
}: SidebarSubjectsProps) {
  const [allAcronymByCategoryCode, setAllAcronymByCategoryCode] = React.useState<string[]>([]);
  const [subjects, setSubjects] = React.useState<ISubject[]>([]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sheetScrollRef = React.useRef<HTMLDivElement>(null);
  const { setOpenMobile, isMobile } = useSidebar();

  const loadAcronymByCategoryCode = (categoryCode: string) => {
    const allAcronymByCategoryCode = getAllAcronymByCategoryCode(categoryCode);
    setAllAcronymByCategoryCode(allAcronymByCategoryCode);
  };

  const loadSubjectsByAcronym = (acronym: string[]) => {
    const subjects = getSubjectsByAcronym(acronym);
    setSubjects(subjects);
  };

  const handleClickCardMobile = () => {
    setSecondarySidebarIsHide(false);
    setOpenMobile(false);
  };

  useEffect(() => {
    activeCategory?.categoryCode && loadAcronymByCategoryCode(activeCategory.categoryCode);

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    if (sheetScrollRef.current) {
      sheetScrollRef.current.scrollTop = 0;
    }
  }, [activeCategory]);

  useEffect(() => {
    allAcronymByCategoryCode && loadSubjectsByAcronym(allAcronymByCategoryCode);
  }, [allAcronymByCategoryCode]);

  if (!isMobile) {
    return (
      <Sidebar collapsible="none" className="flex-1 md:flex" hidden={secondarySidebarIsHide}>
        <SidebarHeader>
          <SearchForm />
        </SidebarHeader>
        <Separator orientation="horizontal" />
        <SidebarContent ref={scrollRef} className="gap-2 p-2 bg-gray-100">
          {subjects.map((subject) => (
            <CourseCard
              key={subject.SIGLA}
              subjectName={subject.DISCIPLINA}
              subjectCode={activeCategory?.categoryCode || ''}
              categoryName={subject.SIGLA}
              tpei={subject.TPEI}
            />
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sheet open={!secondarySidebarIsHide} onOpenChange={(open) => setSecondarySidebarIsHide(!open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription ref={sheetScrollRef} className="overflow-y-auto max-h-[calc(100vh)]">
            {subjects.map((subject) => (
              <CourseCard
                key={subject.SIGLA}
                subjectName={subject.DISCIPLINA}
                subjectCode={activeCategory?.categoryCode || ''}
                categoryName={subject.SIGLA}
                tpei={subject.TPEI}
                handleClickCardMobile={handleClickCardMobile}
              />
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
