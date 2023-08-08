import { supaclient } from '@/lib/supabase-client'
import { verifyAuth } from '@/lib/supabase-server'
// import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '../../components/header'
import Shell from '../../components/shell'
import StreamForm from './components/stream-form'
import StreamUpload from './components/stream-upload'

export default async function EditStreamPage({ params: { streamId } }: { params: { streamId: string } }) {
	await verifyAuth()

	const { data: stream } = await supaclient().from('streams').select().eq('id', streamId).single()
	if (!stream) notFound()

	const { data: streamMedia } = await supaclient().storage.from('stream_media').list(stream.id)

	return (
		<Shell>
			<Header heading='Edit Stream' text='Make changes to an existing stream.' />
			<div className='grid gap-10'>
				<StreamForm stream={stream} />
			</div>
			<div className='grid gap-10'>
				<StreamUpload stream={stream} streamMedia={streamMedia} />
			</div>
		</Shell>
	)
}
