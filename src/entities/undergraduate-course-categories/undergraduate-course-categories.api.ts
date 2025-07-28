import { undergraduateCourseCategories } from './undergraduate-course-categories.mock';

export type Category = {
  categoryCode: string;
  categoryName: string;
};

export async function getCategories(filter?: string): Promise<Category[]> {
  const map = new Map<string, Category>();

  undergraduateCourseCategories.forEach((item) => {
    item.CATEGORIA.split(';').forEach((cat) => {
      const [rawCode, ...rawNameParts] = cat.split('-');
      const categoryCode = rawCode.trim();
      const categoryName = rawNameParts.join('-').trim();
      const cleanedCategoryName = categoryName.replace(/\s*\([^)]*\)/g, '').trim();

      if (categoryCode && cleanedCategoryName && !map.has(categoryCode)) {
        map.set(categoryCode, { categoryCode, categoryName: cleanedCategoryName });
      }
    });
  });

  const allCategories = Array.from(map.values());

  if (!filter) {
    return allCategories;
  }

  const lowercasedFilter = filter.toLowerCase();

  return allCategories.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(lowercasedFilter) ||
      category.categoryCode.toLowerCase().includes(lowercasedFilter),
  );
}

export async function getAllAcronymByCategoryCode(categoryCode: string) {
  if (categoryCode === 'all') {
    return undergraduateCourseCategories.map((item) => item.SIGLA);
  }
  return undergraduateCourseCategories
    .filter((item) => item.CATEGORIA.includes(categoryCode))
    .map((item) => item.SIGLA);
}

export async function getCategoryByCode(categoryCode: string) {
  return undergraduateCourseCategories.find((category) => category.SIGLA === categoryCode);
}
