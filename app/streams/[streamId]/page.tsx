import MainNav from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { supaclient } from '@/lib/supabase-client'
import { supaserver, verifyAuth } from '@/lib/supabase-server'
import { Metadata, ResolvingMetadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Meeting from './components/meeting'

type Props = {
	params: { streamId: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { streamId }, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const { data: stream } = await supaclient().from('streams').select().eq('id', streamId).single()
	return { title: stream?.name || 'Stepworks Live' }
}

export default async function StreamPage({
	params: { streamId },
	searchParams: { mode },
}: {
	params: { streamId: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const user = await verifyAuth()
	const token = process.env.VIDEOSDK_AUTH_TOKEN!

	const { data: stream, error } = await supaserver(cookies).from('streams').select().eq('id', streamId).single()
	if (error || !stream) notFound()

	const getMode = () => {
		if (user.role !== 'speaker') return 'VIEWER'
		if (mode && mode === 'speaker') return 'CONFERENCE'
		return 'VIEWER'
	}

	return (
		<div className='flex flex-col min-h-screen space-y-6'>
			<header className='sticky top-0 z-40 border-b bg-background'>
				<div className='container flex items-center justify-between h-16 py-4'>
					<MainNav title={stream.name} />
					<UserNav user={user} />
				</div>
			</header>
			<div className='grid flex-1 gap-12'>
				<main className='flex flex-col flex-1 w-full overflow-hidden'>
					<Meeting mode={getMode()} stream={stream} token={token} user={user} />
				</main>
			</div>
		</div>
	)
}
