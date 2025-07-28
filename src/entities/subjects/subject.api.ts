import { ISubject } from './subject.model';
import { subjectsMock } from './subjects.mock';

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: number | null;
}

const PAGE_SIZE = 5;

export async function getSubjectsByAcronymPaginated(
  acronyms: string[],
  cursor = 0,
): Promise<PaginatedResponse<ISubject>> {
  const filtered = subjectsMock.filter((s) => acronyms.includes(s.SIGLA));

  const items = filtered.slice(cursor, cursor + PAGE_SIZE);
  const nextCursor = cursor + PAGE_SIZE < filtered.length ? cursor + PAGE_SIZE : null;

  return { items, nextCursor };
}

export async function getSubjectsByAcronym(acronym: string[]) {
  return subjectsMock.filter((subject) => acronym.includes(subject.SIGLA));
}

export async function getSubjectByAcronym(acronym: string) {
  return subjectsMock.find((subject) => subject.SIGLA === acronym);
}
