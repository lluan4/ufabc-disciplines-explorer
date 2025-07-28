import { undergraduateCourseCategories } from './undergraduate-course-categories.mock';

export type Category = {
  categoryCode: string;
  categoryName: string;
};

export function getCategories() {
  const map = new Map<string, Category>();
  undergraduateCourseCategories.forEach((item) => {
    item.CATEGORIA.split(';').forEach((cat) => {
      const [rawCode, ...rawName] = cat.split('-');
      const categoryCode = rawCode.trim();
      const categoryName = rawName?.[0]?.trim();
      const cleanedCategoryName = categoryName?.replace(/\s*\([^)]*\)/g, '').trim();
      if (categoryCode && !map.has(categoryCode)) {
        map.set(categoryCode, { categoryCode, categoryName: cleanedCategoryName });
      }
    });
  });
  return Array.from(map.values());
}
