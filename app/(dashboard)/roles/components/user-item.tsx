'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { SupaSelectType } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function UserItem({ user }: { user: SupaSelectType<'profiles'> }) {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between p-4'>
			<div className='grid gap-1'>
				<div className='font-semibold'>{user.name}</div>
				<div>
					<p className='text-sm text-muted-foreground'>Joined {dayjs(user.created_at).format('MMMM D, YYYY')}</p>
				</div>
			</div>
			{/* {speaker && <StreamOperations stream={stream} />} */}
			<Switch
				checked={user.role === 'speaker'}
				onCheckedChange={async (val) => {
					await supaclient()
						.from('profiles')
						.update({ role: val ? 'speaker' : 'viewer' })
						.eq('id', user.id)
					router.refresh()
				}}
			/>
		</div>
	)
}

UserItem.Skeleton = function StreamItemSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='w-2/5 h-5' />
				<Skeleton className='w-4/5 h-4' />
			</div>
		</div>
	)
}
