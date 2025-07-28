import { TypographyH4 } from '@/shared/ui/typography/h4';

type CourseDetailsCardProps = {
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
};

export default function CourseDetailsCard({ icon, title, children }: CourseDetailsCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 flex-1">
      <div className="flex items-center gap-1 mb-2">
        {icon}
        <TypographyH4>{title}</TypographyH4>
      </div>
      {children}
    </div>
  );
}
