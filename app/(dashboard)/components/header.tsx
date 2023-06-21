import { H2 } from '@/components/ui/typography'

interface HeaderProps {
	heading: string
	text?: string
	children?: React.ReactNode
}

export function Header({ heading, text, children }: HeaderProps) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='grid gap-1'>
				<H2 className='text-3xl font-heading md:text-4xl'>{heading}</H2>
				{text && <p className='text-lg text-muted-foreground'>{text}</p>}
			</div>
			{children}
		</div>
	)
}
