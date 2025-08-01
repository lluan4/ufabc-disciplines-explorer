import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/shared/ui/components/badge';

import { idealQuadMock } from '@/entities/ideal-quad/ideal-quad.mock';
import { IDisciplina } from '@/entities/ideal-quad/ideal-quad.model';

export default function QuadIdeal() {
  const navigate = useNavigate();

  const handleNavigate = (disciplina: IDisciplina) => {
    console.log('Navegando para a disciplina:', disciplina);
    navigate(`/all/${disciplina.SIGLA}`);
  };
  return (
    <div className="p-4">
      {Object.entries(idealQuadMock).map(([period, disciplines]) => (
        <div key={period} className="rounded-md border border-l-4 border-l-blue-500 shadow-sm p-4 mb-4">
          <div className="flex items-baseline gap-2 mb-4">
            <Clock size={14} /> <h2 className="text-lg font-bold mb-2">{period}º Quadrimestre</h2>
          </div>

          <div className="flex flex-col gap-2">
            {disciplines.map((disciplina) => (
              <div
                key={disciplina.SIGLA}
                className="bg-blue-100/20 p-2 rounded-md flex justify-between items-center hover:bg-blue-100/30 transition-colors cursor-pointer pointer-coarse:"
                onClick={() => {
                  handleNavigate(disciplina);
                }}
              >
                <div>
                  <h3 className="font-semibold">{disciplina.DISCIPLINA}</h3>
                  <p className="text-sm text-gray-600">TPEI: {disciplina.TPEI}</p>
                  {disciplina.RECOMENDACAO && (
                    <b className="text-sm text-orange-600">Recomendações: {disciplina.RECOMENDACAO}</b>
                  )}
                </div>
                <div>
                  <Badge variant="outline" className="pl-2">
                    {disciplina.SIGLA || 'Sem sigla'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
