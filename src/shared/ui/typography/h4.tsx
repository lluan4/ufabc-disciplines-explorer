type TypographyH4Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export function TypographyH4({ children, className = '', ...props }: TypographyH4Props) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`} {...props}>
      {children}
    </h4>
  );
}
