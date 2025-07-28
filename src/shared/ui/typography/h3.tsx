type TypographyH3Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export function TypographyH3({ children, className = '', ...props }: TypographyH3Props) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}
