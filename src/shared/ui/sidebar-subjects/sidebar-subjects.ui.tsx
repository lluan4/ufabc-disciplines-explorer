import React, { useCallback, useEffect } from 'react';

import { Separator } from '@/shared/ui/components/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shared/ui/components/sheet';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar } from '@/shared/ui/components/sidebar';

import { getSubjectsByAcronymPaginated } from '@/entities/subjects/subject.api';
import { ISubject } from '@/entities/subjects/subject.model';
import {
  Category,
  getAllAcronymByCategoryCode,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.api';

import { CourseCard } from '../course-card/course-card.ui';
import { TypographyH4 } from '../typography/h4';

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
  const [acronyms, setAcronyms] = React.useState<string[]>([]);
  const [subjects, setSubjects] = React.useState<ISubject[]>([]);

  const [cursor, setCursor] = React.useState<number | null>(0);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sheetScrollRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const { setOpenMobile, isMobile } = useSidebar();

  const loadMoreItems = useCallback(async () => {
    if (cursor === null || acronyms.length === 0) return;

    const res = await getSubjectsByAcronymPaginated(acronyms, cursor);
    setSubjects((prev) => [...prev, ...res.items]);
    setCursor(res.nextCursor);
  }, [acronyms, cursor]);

  useEffect(() => {
    if (!activeCategory?.categoryCode) return;

    const initialize = async () => {
      setSubjects([]);
      const list = await getAllAcronymByCategoryCode(activeCategory.categoryCode);
      setAcronyms(list);
      setCursor(0);
    };

    initialize();

    scrollRef.current?.scrollTo(0, 0);
    sheetScrollRef.current?.scrollTo(0, 0);
  }, [activeCategory]);

  useEffect(() => {
    if (cursor === 0 && acronyms.length > 0) {
      loadMoreItems();
    }
  }, [cursor, acronyms, loadMoreItems]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const root = isMobile ? sheetScrollRef.current : scrollRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { root, threshold: 0.4 },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [loadMoreItems, isMobile]);

  const Cards = () => (
    <>
      {subjects.map((s) => (
        <CourseCard
          key={`${s.SIGLA}-${s.DISCIPLINA}`}
          subjectName={s.DISCIPLINA}
          subjectCode={activeCategory?.categoryCode || ''}
          categoryName={s.SIGLA}
          tpei={s.TPEI}
          handleClickCardMobile={isMobile ? handleClickCardMobile : undefined}
        />
      ))}

      {cursor !== null && <div ref={sentinelRef} style={{ height: 8 }} />}
    </>
  );

  function handleClickCardMobile() {
    setSecondarySidebarIsHide(false);
    setOpenMobile(false);
  }

  if (!isMobile) {
    return (
      <Sidebar collapsible="none" className="flex-1 md:flex" hidden={secondarySidebarIsHide}>
        <SidebarHeader>
          <TypographyH4>Matérias: {`${acronyms.length}`}</TypographyH4>
        </SidebarHeader>
        <Separator orientation="horizontal" />
        <SidebarContent ref={scrollRef} className="gap-2 p-2 bg-gray-100">
          <Cards />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sheet open={!secondarySidebarIsHide} onOpenChange={(o) => setSecondarySidebarIsHide(!o)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Disciplinas</SheetTitle>
          <SheetDescription ref={sheetScrollRef} className="overflow-y-auto max-h-[calc(100vh)] flex flex-col gap-2">
            <Cards />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
