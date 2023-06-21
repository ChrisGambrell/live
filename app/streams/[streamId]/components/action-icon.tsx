import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface ActionIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: LucideIcon
}

export default function ActionIcon({ className, icon: Icon, ...props }: ActionIconProps) {
	return (
		// <button
		// 	className={cn(
		// 		'p-2 text-white bg-sky-600 rounded-full shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
		// 		className
		// 	)}
		// 	type='button'
		// 	{...props}>
		// 	<Icon className='w-5 h-5' aria-hidden='true' />
		// </button>
		<Button variant='ghost' {...props}>
			<Icon className='w-5 h-5' />
		</Button>
	)
}
