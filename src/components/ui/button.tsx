import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-stone-50 shadow hover:bg-primary/90 rounded-md',
        danger:
          'bg-[#FFE3E3] text-[#E40000] font-semibold hover:bg-[#E4000040] border border-[#E40000]',
        success:
          'bg-[#E8FFE8] text-[#008000] font-semibold hover:bg-[#E8FFE880] border border-[#008000]',
        destructive:
          'bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90 rounded-md',
        outline:
          'border border-stone-200 text-primary rounded-md xbg-black shadow-sm xhover:bg-black/80 hover:text-primary',
        secondary:
          'bg-white text-blue font-semibold shadow-sm hover:bg-black/5 border border-primary rounded-md',
        ghost: 'hover:bg-stone-100 hover:text-stone-900',
        link: 'text-stone-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
