'use client';
import React from 'react';
import { cn } from '../../lib/utils';

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {};
type HeaderSlotProps = React.HTMLAttributes<HTMLDivElement> & {};

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <>
      <MobileHeader {...{ className, ...props }}>{children}</MobileHeader>
      <div className={cn('block sm:hidden', className)} {...props}>
        {children}
      </div>
    </>
  );
}

function HeaderLeft({ className, children, ...props }: HeaderSlotProps) {
  return (
    <div className={cn('flex-1 text-left', className)} {...props}>
      {children}
    </div>
  );
}

function HeaderCenter({ className, children, ...props }: HeaderSlotProps) {
  return (
    <div className={cn('flex-1 text-center', className)} {...props}>
      {children}
    </div>
  );
}

function HeaderRight({ className, children, ...props }: HeaderSlotProps) {
  return (
    <div className={cn('flex-1 text-right', className)} {...props}>
      {children}
    </div>
  );
}

export function MobileHeader({ className, children, ...props }: HeaderProps) {
  return (
    <div className={cn('hidden sm:block', className)} {...props}>
      {children}
    </div>
  );
}

Header.Mobile = MobileHeader;
Header.Left = HeaderLeft;
Header.Center = HeaderCenter;
Header.Right = HeaderRight;
