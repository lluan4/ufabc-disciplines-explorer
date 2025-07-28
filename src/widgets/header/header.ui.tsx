import { useEffect, useState } from 'react';

import { Calendar } from 'lucide-react';
import { useLocation, useParams, useRoutes } from 'react-router-dom';

import { Badge } from '@/shared/ui/components/badge';
import { Separator } from '@/shared/ui/components/separator';
import { SidebarTrigger } from '@/shared/ui/components/sidebar';
import { TypographyH3 } from '@/shared/ui/typography/h3';

import { ISubject } from '@/entities/subjects/subject.contract';
import { getSubjectByAcronym } from '@/entities/subjects/subject.lib';
import IUndergraduateCourseCategories from '@/entities/undergraduate-course-categories/undergraduate-course-categories.contract';
import {
  Category,
  getCategories,
  getCategoryByCode,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.lib';

export function Header() {
  const [selectedCategory, setSelectedCategory] = useState<IUndergraduateCourseCategories | undefined>(undefined);
  const [selectedCourseCategories, setSelectedCourseCategories] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<ISubject>();

  const params = useParams<{ course: string; subjectCode: string }>();
  const location = useLocation();

  useEffect(() => {
    if (params.subjectCode) {
      const selectedCategory = getCategoryByCode(params.subjectCode);
      selectedCategory && setSelectedCategory(selectedCategory);

      const subject = getSubjectByAcronym(params.subjectCode);

      subject && setSelectedSubject(subject);
    }

    if (params.course) {
      const categories = getCategories();
      const category = categories.find((cat: Category) => cat.categoryCode === params.course);
      if (category) {
        setSelectedCourseCategories(category.categoryName);
      }
    }
  }, [params]);

  const isQuadIdealPage = location.pathname.includes('quad-ideal');

  const displayHeader = isQuadIdealPage ? (
    <div className="flex items-center gap-1">
      <Calendar size={24} className="stroke-blue-500" />
      <TypographyH3 className="truncate p-3"> Recomendações por Quadrimestre</TypographyH3>
    </div>
  ) : (
    <div>
      <TypographyH3 className="truncate">{selectedCategory?.DISCIPLINA}</TypographyH3>

      <div className="gap-2 p-1 flex items-center ">
        <Badge variant="outline" className="pl-2">
          {selectedCategory?.SIGLA}
        </Badge>
        <Badge variant="outline" className="bg-green-200 text-green-900">
          {selectedCourseCategories}
        </Badge>
      </div>
      <div className="text-sm text-gray-500 pl-2">
        {selectedSubject?.TPEI ? `TPEI: ${selectedSubject.TPEI}` : 'TPEI não disponível'}
      </div>
    </div>
  );

  return (
    <header className="bg-background sticky top-0 flex  items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4 mr-2" />

      {displayHeader}
    </header>
  );
}
