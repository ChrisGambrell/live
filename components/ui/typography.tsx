import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const H2 = ({ children, className }: { children: ReactNode; className?: string }) => (
	<h3 className={cn('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className)}>{children}</h3>
)

export const H3 = ({ children, className }: { children: ReactNode; className?: string }) => (
	<h3 className={cn('text-2xl font-semibold tracking-tight scroll-m-20', className)}>{children}</h3>
)

export const Muted = ({ children, className }: { children: ReactNode; className?: string }) => (
	<p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
)
