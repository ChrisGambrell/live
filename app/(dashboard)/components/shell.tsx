// TODO: Check all components for default export

import { cn } from '@/lib/utils'

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Shell({ className, ...props }: ShellProps) {
	return <div className={cn('grid items-start gap-8', className)} {...props} />
}
