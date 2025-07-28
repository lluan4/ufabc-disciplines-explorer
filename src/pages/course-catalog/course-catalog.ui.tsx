import { useEffect, useState } from 'react';

import { BookOpen, Lightbulb, Target, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Badge } from '@/shared/ui/components/badge';
import { Separator } from '@/shared/ui/components/separator';

import { getSubjectByAcronym } from '@/entities/subjects/subject.api';
import { ISubject } from '@/entities/subjects/subject.model';
import { getCategoryByCode } from '@/entities/undergraduate-course-categories/undergraduate-course-categories.api';
import IUndergraduateCourseCategories from '@/entities/undergraduate-course-categories/undergraduate-course-categories.model';

import CourseDetailsCard from '@/widgets/course-details-card/course-details-card.ui';

export default function CourseCatalog() {
  const [selectedSubject, setSelectedSubject] = useState<ISubject | undefined>(undefined);
  const [selectedCourseCategories, setSelectedCourseCategories] = useState<IUndergraduateCourseCategories | undefined>(
    undefined,
  );

  const params = useParams<{ course: string; subjectCode: string }>();

  const loadSubjectByAcronym = async (acronym: string) => {
    const subject = await getSubjectByAcronym(acronym);
    subject && setSelectedSubject(subject);
  };

  const loadCategoryByCode = async (categoryCode: string) => {
    const category = await getCategoryByCode(categoryCode);
    category && setSelectedCourseCategories(category);
  };

  useEffect(() => {
    if (params.subjectCode) {
      Promise.all([loadSubjectByAcronym(params.subjectCode), loadCategoryByCode(params.subjectCode)]);
    }
  }, [params]);

  return (
    <div className="p-4">
      <CourseDetailsCard icon={<Target size={16} />} title="Objetivos">
        <p className="text-gray-600">{selectedSubject?.OBJETIVOS || 'n/a'}</p>
      </CourseDetailsCard>
      <CourseDetailsCard icon={<BookOpen size={16} />} title="Ementa">
        <p className="text-gray-600">{selectedSubject?.EMENTA || 'n/a'}</p>
      </CourseDetailsCard>

      <CourseDetailsCard icon={<Users size={16} />} title="Cursos">
        <div className="flex flex-wrap gap-1 w-full">
          {selectedCourseCategories?.CATEGORIA?.split(';').map((cat, i) => {
            const [code, ...rest] = cat.split('-');
            const name = rest
              .join('-')
              .replace(/\s*\([^)]*\)/g, '')
              .trim();
            return (
              <Badge key={i} variant="outline" className="bg-gray-100 text-gray-900">
                {name} ({code.trim()})
              </Badge>
            );
          })}
        </div>
      </CourseDetailsCard>

      <div className="flex flex-col md:flex-row gap-2">
        <CourseDetailsCard icon={<Users size={16} />} title="Bibliografia Básica">
          <p className="text-gray-600 max-h-[450px] overflow-y-auto">{selectedSubject?.BIBLIOGRAFIA_BASICA || 'n/a'}</p>
        </CourseDetailsCard>
        <CourseDetailsCard icon={<Users size={16} />} title="Bibliografia Complementar">
          <p className="text-gray-600 max-h-[450px] overflow-y-auto">
            {selectedSubject?.BIBLIOGRAFIA_COMPLEMENTAR || 'n/a'}
          </p>
        </CourseDetailsCard>
      </div>

      <CourseDetailsCard icon={<Lightbulb size={16} />} title="Informações Adicionais">
        <div>
          <span>
            <b>Recomendações:</b> <p className="text-gray-600">{selectedSubject?.RECOMENDACAO || 'n/a'}</p>
          </span>

          <Separator orientation="horizontal" className="my-2" />
          <span>
            <b>Metodologia:</b> <p className="text-gray-600">{selectedSubject?.METODOLOGIA_EXTENSIONISTA || 'n/a'}</p>
          </span>
        </div>
      </CourseDetailsCard>
    </div>
  );
}
