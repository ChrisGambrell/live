import { cn } from '@/lib/utils'
import { Command } from 'lucide-react'
import Link from 'next/link'

export function MobileNav() {
	return (
		<div
			className={cn(
				'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
			)}>
			<div className='relative z-20 grid gap-6 p-4 rounded-md shadow-md bg-popover text-popover-foreground'>
				<Link href='/' className='flex items-center space-x-2'>
					<Command />
					<span className='font-bold'>Stepworks Live</span>
				</Link>
			</div>
		</div>
	)
}
