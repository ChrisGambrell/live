import { useMeeting, useParticipant } from '@videosdk.live/react-sdk'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import Messages from './messages'
import Participants from './participants'

export default function ViewerView() {
	const { hlsState, hlsUrls, localParticipant } = useMeeting({
		onHlsStarted: () => toast('The livestream is starting', { icon: '⏯️' }),
		onHlsStopped: () => toast('The livestream has ended', { icon: '⏯️' }),
	})
	const { webcamStream } = useParticipant(localParticipant.id)
	const playerRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (hlsUrls.downstreamUrl && hlsState === 'HLS_PLAYABLE') {
			if (Hls.isSupported()) {
				const hls = new Hls({
					capLevelToPlayerSize: true,
					minAutoBitrate: 0,
					autoStartLoad: true,
					defaultAudioCodec: 'mp4a.40.2',
				})

				const player = document.querySelector('#hlsPlayer')
				hls.loadSource(hlsUrls.downstreamUrl)
				hls.attachMedia(player as HTMLMediaElement)
			} else {
				if (typeof playerRef.current?.play === 'function') {
					playerRef.current.src = hlsUrls.downstreamUrl
					playerRef.current.play()
				}
			}
		}
	}, [hlsState, hlsUrls])

	return (
		<div className='flex flex-grow space-x-4'>
			<div className='flex items-center w-full h-full'>
				{hlsState !== 'HLS_PLAYABLE' ? (
					<div className='flex-grow w-full'>
						<div className='flex items-center justify-center h-full'>Stream has not started yet</div>
					</div>
				) : (
					// (hlsState === 'HLS_PLAYABLE' || hlsState === 'HLS_STARTING') && (
					hlsState === 'HLS_PLAYABLE' && (
						<div className='flex-grow'>
							<video
								ref={playerRef}
								id='hlsPlayer'
								autoPlay
								controls
								style={{ width: '100%', height: '100%' }}
								playsInline
								onError={(err) => console.error(err, 'hls video error')}
							/>
						</div>
					)
				)}
			</div>
			<div className='flex flex-col h-full pb-6 pr-4 space-y-4'>
				<Participants />
				<Messages />
			</div>
		</div>
	)
}
