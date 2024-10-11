import { cn } from '../../lib/utils';

type MainProps = React.HTMLAttributes<HTMLDivElement> & {};

export function Main({ className, children, ...props }: MainProps) {
  return (
    <div className={cn('relative flex flex-col overflow-y-auto grow shrink-0', className)} {...props}>
      {children}
    </div>
  );
}
