import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/shared/ui/components/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/card';

type CourseCardProps = {
  subjectName: string;
  subjectCode: string;
  categoryName: string;
  tpei: string;
  handleClickCardMobile?: () => void;
};

export function CourseCard({ subjectName, subjectCode, categoryName, tpei, handleClickCardMobile }: CourseCardProps) {
  const navigate = useNavigate();
  const params = useParams<{ course: string; subjectCode: string }>();

  const handleCardClick = () => {
    navigate(`/${subjectCode}/${categoryName}`);
    handleClickCardMobile?.();
  };

  const isSelected = params.subjectCode === categoryName;

  return (
    <Card
      className="gap-2 p-2 hover:cursor-pointer hover:bg-gray-200/40 transition-colors duration-300 data-[active=true]:bg-gray-200/40"
      onClick={handleCardClick}
      data-active={isSelected}
    >
      <CardHeader className="px-2 py-0">
        <CardTitle>{subjectName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row px-2 items-center gap-2">
        <Badge variant="outline" className="pl-2">
          {categoryName}
        </Badge>
        {subjectCode !== 'all' && <Badge className="bg-green-200 text-green-900">{subjectCode}</Badge>}
      </CardContent>
      <CardFooter className="px-2 py-0">
        <CardDescription>TPEI: {tpei}</CardDescription>
      </CardFooter>
    </Card>
  );
}
