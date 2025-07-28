export interface IDisciplina {
  SIGLA: string;
  DISCIPLINA: string;
  TPEI: string;
  RECOMENDACAO?: string;
}

export default interface IIdealQuad {
  [periodo: string]: IDisciplina[];
}
