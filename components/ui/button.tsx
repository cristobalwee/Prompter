import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap hover:border-[#c2c2c2] focus-visible:border-[#c2c2c2] rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-0 transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'button-primary rounded-full',
        secondary: 'button-secondary rounded-full',
        contrast: 'surface-hc-bg rounded-full text-black',
      },
      size: {
        default: 'px-4 py-1.5',
        sm: 'px-3',
        lg: 'px-8',
        icon: 'w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
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
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
