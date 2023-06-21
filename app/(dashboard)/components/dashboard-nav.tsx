'use client'

import { cn } from '@/lib/utils'
import { Gauge, LayoutDashboard, Settings, Tv } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
	{
		href: '/',
		icon: Tv,
		title: 'Streams',
	},
	{
		href: '/settings',
		icon: Settings,
		title: 'Settings',
	},
]

export function DashboardNav() {
	const path = usePathname()

	return (
		<nav className='grid items-start gap-2'>
			{items.map((item) => (
				<Link key={item.href} href={item.href}>
					<span
						className={cn(
							'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
							path === item.href ? 'bg-accent' : 'transparent'
						)}>
						<item.icon className='w-4 h-4 mr-2' />
						<span>{item.title}</span>
					</span>
				</Link>
			))}
		</nav>
	)
}
