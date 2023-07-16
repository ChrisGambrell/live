import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { SupaSelectType } from '@/lib/supabase'
import dayjs from 'dayjs'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { StreamOperations } from './stream-operations'

export function StreamItem({
	speaker,
	stream,
}: {
	speaker?: boolean
	stream: SupaSelectType<'streams'> & { presenter?: SupaSelectType<'profiles'> }
}) {
	return (
		<div className='flex items-center justify-between p-4'>
			<div className='grid gap-1'>
				<div className='flex items-center space-x-2'>
					<Link href={`/streams/${stream.id}`} className='font-semibold hover:underline'>
						{stream.name}
					</Link>
					{stream.presenter && <div className='text-xs italic text-gray-400'>({stream.presenter.name})</div>}
				</div>
				<div>
					<p className='text-sm text-muted-foreground'>{dayjs(stream.date).format('MMMM D, YYYY h:mma')}</p>
				</div>
				{(stream.week || stream.month) && (
					<div>
						<p className='text-sm text-muted-foreground'>
							Repeats every {stream.week || stream.month} {stream.week ? 'week' : 'month'}
							{(stream.week || stream.month || 0) > 1 && 's'}
						</p>
					</div>
				)}
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
