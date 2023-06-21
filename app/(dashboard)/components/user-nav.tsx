'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserProfile } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HTMLAttributes } from 'react'
import { UserAvatar } from './user-avatar'

interface UserNavProps extends HTMLAttributes<HTMLDivElement> {
	user: UserProfile
}

export function UserNav({ user }: UserNavProps) {
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar className='w-8 h-8' user={user} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && <p className='w-[200px] truncate text-sm text-muted-foreground'>{user.email}</p>}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/'>Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/settings'>Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={async (event) => {
						event.preventDefault()
						await supaclient().auth.signOut()
						router.refresh()
					}}>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
