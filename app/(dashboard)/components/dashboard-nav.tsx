'use client'

import { cn } from '@/lib/utils'
import { Gauge, LayoutDashboard, Settings, Tv, Users2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
	{
		href: '/',
		icon: Tv,
		title: 'Streams',
		locked: false,
	},
	{
		href: '/roles',
		icon: Users2Icon,
		title: 'Roles',
		locked: true,
	},
	{
		href: '/settings',
		icon: Settings,
		title: 'Settings',
		locked: false,
	},
]

export function DashboardNav({ speaker }: { speaker?: boolean }) {
	const path = usePathname()

	return (
		<nav className='grid items-start gap-2'>
			{items
				.filter((i) => (speaker ? true : !i.locked))
				.map((item) => (
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
