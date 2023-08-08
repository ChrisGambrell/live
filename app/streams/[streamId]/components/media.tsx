'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supaclient } from '@/lib/supabase-client'
import { useMeeting } from '@videosdk.live/react-sdk'
import { Pause, Play } from 'lucide-react'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Media({
	streamId,
	externalPlayer,
	externalVideo,
	setExternalVideo,
}: {
	streamId: string
	externalPlayer: MutableRefObject<HTMLVideoElement>
	externalVideo: { link: string | null; playing: boolean }
	setExternalVideo: Dispatch<
		SetStateAction<{
			link: null
			playing: boolean
		}>
	>
}) {
	const { meetingId, startVideo, stopVideo } = useMeeting({
		// TODO: Fix error
		// @ts-ignore
		onVideoStateChanged: ({ link, status }: { link: string; status: string }) => {
			switch (status) {
				case 'started':
					// TODO: Fix error
					// @ts-ignore
					setExternalVideo({ link, playing: true })
					break
				case 'stopped':
					// TODO: Fix error
					// @ts-ignore
					externalPlayer.current.src = null
					setExternalVideo({ link: null, playing: false })
			}
		},
	})
	const [streamMedia, setStreamMedia] = useState<{ id: string; name: string }[] | undefined>()
	const [selectedMedia, setSelectedMedia] = useState<number | null>(null)

	useEffect(() => {
		const getStreamMedias = async () => {
			const { data: stream } = await supaclient().from('streams').select().eq('meeting_id', meetingId).single()
			if (!stream) return toast.error('There was an error getting media for the stream')
			const { data: medias } = await supaclient().storage.from('stream_media').list(stream.id)
			setStreamMedia(medias!)
		}

		getStreamMedias()
	}, [meetingId])

	console.log(streamMedia)

	async function handleStartVideo(path: string) {
		const {
			data: { publicUrl },
		} = await supaclient().storage.from('stream_media').getPublicUrl(path)
		startVideo({ link: publicUrl })
	}

	async function handleStopVideo() {
		stopVideo()
	}

	return (
		<Card className='w-[400px] H-[30%] flex-shrink-0'>
			<CardHeader>
				<CardTitle>Media</CardTitle>
				<CardDescription>{streamMedia?.length || 0} items in the media library</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div>{}</div>
				{streamMedia?.map((media, i) => (
					<div key={media.id} className='flex items-center space-x-1'>
						<div className='flex-grow truncate'>{media.name.split('_').slice(0, -1).join('_')}</div>
						<Button
							size='xs'
							variant='secondary'
							onClick={async () => {
								const {
									data: { publicUrl: link },
								} = await supaclient().storage.from('stream_media').getPublicUrl(`/${streamId}/${media.name}`)
								console.log(link)

								if (externalVideo.link) {
									stopVideo()
									setSelectedMedia(null)
								} else {
									startVideo({ link })
									setSelectedMedia(i)
								}
							}}>
							{selectedMedia === i ? <Pause className='w-4 h-4' /> : <Play className='w-4 h-4' />}
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
