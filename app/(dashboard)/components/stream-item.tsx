import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StreamOperations } from './stream-operations'

dayjs.extend(utc)

export function StreamItem({
	speaker,
	stream,
	user,
}: {
	speaker?: boolean
	stream: SupaSelectType<'streams'> & { presenter?: SupaSelectType<'profiles'> }
	user: UserProfile
}) {
	const router = useRouter()

	return (
		<div className='flex justify-between p-4'>
			<div className='grid gap-1'>
				<div className='flex items-center space-x-2'>
					<Link href={`/streams/${stream.id}`} className='font-semibold hover:underline' prefetch={false}>
						{stream.name}
					</Link>
					{stream.presenter && <div className='text-xs italic text-gray-400'>({stream.presenter.name})</div>}
				</div>
				<div>
					<p className='text-sm text-muted-foreground'>{dayjs.utc(stream.date).local().format('MMMM D, YYYY h:mma')}</p>
				</div>
				{(stream.week || stream.month) && (
					<div>
						<p className='text-sm text-muted-foreground'>
							Repeats every {stream.week || stream.month} {stream.week ? 'week' : 'month'}
							{(stream.week || stream.month || 0) > 1 && 's'}
						</p>
					</div>
				)}
				{/* {user.role === 'speaker' && (
					<div className='flex items-center mt-1 space-x-2'>
						{stream.presenter?.id === user.id && (
							<Button size='xs' onClick={() => router.push(`/streams/${stream.id}?mode=speaker`)}>
								Join as Speaker
							</Button>
						)}
						<Button size='xs' variant='secondary' onClick={() => router.push(`/streams/${stream.id}`)}>
							Join as Viewer
						</Button>
					</div>
				)} */}
				<div className='mt-1'>
					<Button
						size='xs'
						onClick={() => router.push(`/streams/${stream.id}${stream.presenter?.id === user.id ? '?mode=speaker' : ''}`)}>
						Join stream{stream.presenter?.id === user.id && ' as Host'}
					</Button>
				</div>
			</div>
			{speaker && <StreamOperations stream={stream} />}
		</div>
	)
}

StreamItem.Skeleton = function StreamItemSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='w-2/5 h-5' />
				<Skeleton className='w-4/5 h-4' />
			</div>
		</div>
	)
}
