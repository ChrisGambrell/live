import { useParticipant } from '@videosdk.live/react-sdk'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'

export default function ScreenShareFeed({ participantId }: { participantId: string }) {
	const { screenShareStream, screenShareOn } = useParticipant(participantId)

	const videoStream = useMemo(() => {
		if (screenShareOn && screenShareStream) {
			const mediaStream = new MediaStream()
			mediaStream.addTrack(screenShareStream.track)
			return mediaStream
		}
	}, [screenShareStream, screenShareOn])

	return (
		<ReactPlayer
			playsinline
			pip={false}
			light={false}
			playing
			url={videoStream}
			width='100%'
			height='100%'
			onError={(err) => console.log(err, 'participant video error')}
		/>
	)
}
