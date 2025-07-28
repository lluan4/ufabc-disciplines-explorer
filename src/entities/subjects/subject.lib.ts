import { subjectsMock } from './subjects.mock';

export function getSubjectsByAcronym(acronym: string[]) {
  return subjectsMock.filter((subject) => acronym.includes(subject.SIGLA));
}

export function getSubjectByAcronym(acronym: string) {
  return subjectsMock.find((subject) => subject.SIGLA === acronym);
}
