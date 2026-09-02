import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
  highlight?: boolean;
}

export default function Card({ raised, highlight, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border p-5',
        raised ? 'bg-[var(--color-surface-2)]' : 'bg-[var(--color-surface)]',
        highlight
          ? 'border-[var(--color-route)] shadow-[0_0_0_1px_var(--color-route),0_0_24px_-8px_var(--color-route)]'
          : 'border-[var(--color-hairline)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
