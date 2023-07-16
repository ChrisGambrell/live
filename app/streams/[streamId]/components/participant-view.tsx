import { useParticipant } from '@videosdk.live/react-sdk'
import { MicOff } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import ReactPlayer from 'react-player'

export default function ParticipantView({ participantId }: { participantId: string }) {
	const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId)
	const micRef = useRef<HTMLAudioElement>(null)

	const videoStream = useMemo(() => {
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream()
			mediaStream.addTrack(webcamStream.track)
			return mediaStream
		}
	}, [webcamStream, webcamOn])

	useEffect(() => {
		if (micRef.current) {
			if (micOn && micStream) {
				const mediaStream = new MediaStream()
				mediaStream.addTrack(micStream.track)

				micRef.current.srcObject = mediaStream
				micRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error))
			} else {
				micRef.current.srcObject = null
			}
		}
	}, [micStream, micOn])

	return (
		<div className='relative w-full bg-red-50 min-h-[250px]'>
			{/* <pre>{JSON.stringify(webcamStream, null, 2)}</pre> */}
			<div className='absolute bottom-0 left-0 px-1 bg-white'>{displayName}</div>
			{!micOn && (
				<div className='absolute bottom-0 right-0 px-1 bg-white'>
					<MicOff className='w-4 h-4' />
				</div>
			)}
			<audio ref={micRef} autoPlay playsInline muted={isLocal} />
			{webcamOn && (
				<ReactPlayer
					controls={false}
					light={false}
					muted
					pip={false}
					playing
					playsinline
					url={videoStream}
					height='100%'
					width='100%'
					onError={(err) => console.log(err, 'participant video error')}
				/>
			)}
		</div>
	)
}
