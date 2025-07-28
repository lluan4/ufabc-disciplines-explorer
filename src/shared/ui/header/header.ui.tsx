import { PropsWithChildren, useEffect, useState } from 'react';

import { Calendar } from 'lucide-react';
import { Params, UIMatch, useLocation, useMatches, useParams, useRoutes } from 'react-router-dom';

import { RouteHandle } from '@/shared/router';
import { Badge } from '@/shared/ui/components/badge';
import { Separator } from '@/shared/ui/components/separator';
import { SidebarTrigger } from '@/shared/ui/components/sidebar';
import { TypographyH3 } from '@/shared/ui/typography/h3';

import { getSubjectByAcronym } from '@/entities/subjects/subject.api';
import { ISubject } from '@/entities/subjects/subject.model';
import {
  Category,
  getCategories,
  getCategoryByCode,
} from '@/entities/undergraduate-course-categories/undergraduate-course-categories.api';
import IUndergraduateCourseCategories from '@/entities/undergraduate-course-categories/undergraduate-course-categories.model';

type RootHeaderProps = PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

export function RootHeader({ fallback = null }: RootHeaderProps) {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const last = [...matches].reverse().find((m) => m.handle?.header);
  const headerJSX = last?.handle?.header?.(last.params as Params);

  return <>{headerJSX ?? fallback}</>;
}

export function DefaultHeader() {
  return (
    <div className="flex items-center gap-1">
      <TypographyH3 className="break-words p-3">Bem-vindo ao sistema de disciplinas</TypographyH3>
    </div>
  );
}

export function HeaderIdealQuad() {
  return (
    <div className="flex items-center gap-1 wrap-anywhere">
      <Calendar size={24} className="stroke-blue-500" />
      <TypographyH3 className="break-words p-3"> Recomendações por Quadrimestre</TypographyH3>
    </div>
  );
}

type HeaderCourseCatalogProps = {
  params: Readonly<
    Partial<{
      course: string;
      subjectCode: string;
    }>
  >;
};

export function HeaderCourseCatalog({ params }: HeaderCourseCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<IUndergraduateCourseCategories | undefined>(undefined);
  const [selectedCourseCategories, setSelectedCourseCategories] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<ISubject>();

  const loadSubjectByAcronym = async (subjectCode: string) => {
    const subject = await getSubjectByAcronym(subjectCode);
    if (subject) setSelectedSubject(subject);
  };

  const loadCategoryByCode = async (subjectCode: string) => {
    const category = await getCategoryByCode(subjectCode);
    if (category) setSelectedCategory(category);
  };

  const loadCategories = async (course: string) => {
    const categories = await getCategories();
    const category = categories.find((cat: Category) => cat.categoryCode === course);
    if (category) setSelectedCourseCategories(category.categoryName);
  };

  useEffect(() => {
    if (params.subjectCode) {
      Promise.all([loadSubjectByAcronym(params.subjectCode), loadCategoryByCode(params.subjectCode)]).catch((error) => {
        console.error('Error loading data:', error);
      });
    }

    if (params.course) {
      Promise.all([loadCategories(params.course)]).catch((error) => {
        console.error('Error loading data:', error);
      });
    }
  }, [params]);

  return (
    <div className="wrap-anywhere">
      <TypographyH3 className="break-words">{selectedCategory?.DISCIPLINA}</TypographyH3>

      <div className="gap-2 p-1 flex flex-col md:flex-row items-start md:items-center">
        <Badge variant="outline" className="pl-2">
          {selectedCategory?.SIGLA}
        </Badge>
        {params.course !== 'all' && (
          <Badge variant="outline" className="bg-green-200 text-green-900">
            {selectedCourseCategories}
          </Badge>
        )}
      </div>
      <div className="text-sm text-gray-500 pl-2">
        {selectedSubject?.TPEI ? `TPEI: ${selectedSubject.TPEI}` : 'TPEI não disponível'}
      </div>
    </div>
  );
}
