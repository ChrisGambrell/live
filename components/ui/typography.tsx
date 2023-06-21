import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const H3 = ({ children, className }: { children: ReactNode; className?: string }) => (
	<h3 className={cn('text-2xl font-semibold tracking-tight scroll-m-20', className)}>{children}</h3>
)

export const Muted = ({ children, className }: { children: ReactNode; className?: string }) => (
	<p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
)
