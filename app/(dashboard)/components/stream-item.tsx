import { Skeleton } from '@/components/ui/skeleton'
import { SupaSelectType } from '@/lib/supabase'
import dayjs from 'dayjs'
import Link from 'next/link'
import { StreamOperations } from './stream-operations'

export function StreamItem({ stream }: { stream: SupaSelectType<'streams'> }) {
	return (
		<div className='flex items-center justify-between p-4'>
			<div className='grid gap-1'>
				<Link href={`/streams/${stream.id}`} className='font-semibold hover:underline'>
					{stream.name}
				</Link>
				<div>
					<p className='text-sm text-muted-foreground'>{dayjs(stream.date).format('MMMM D, YYYY h:mma')}</p>
				</div>
			</div>
			<StreamOperations stream={stream} />
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
