import { useMeeting } from '@videosdk.live/react-sdk'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

export default function ViewerView() {
	const { hlsState, hlsUrls, meetingId } = useMeeting({
		onHlsStarted: () => toast('The livestream is starting', { icon: '⏯️' }),
		onHlsStopped: () => toast('The livestream has ended', { icon: '⏯️' }),
	})
	const playerRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (hlsUrls.downstreamUrl && hlsState === 'HLS_PLAYABLE') {
			if (Hls.isSupported()) {
				const hls = new Hls({
					capLevelToPlayerSize: true,
					maxLoadingDelay: 4,
					minAutoBitrate: 0,
					autoStartLoad: true,
					defaultAudioCodec: 'mp4a.40.2',
				})

				const player = document.querySelector('#hlsPlayer')
				hls.loadSource(hlsUrls.downstreamUrl)
				hls.attachMedia(player)
			} else {
				if (typeof playerRef.current?.play === 'function') {
					playerRef.current.src = hlsUrls.downstreamUrl
					playerRef.current.play()
				}
			}
		}
	}, [hlsState, hlsUrls])

	return (
		<>
			{/* <Header meetingId={meetingId} /> */}
			<div className='flex h-full space-x-4'>
				{hlsState !== 'HLS_PLAYABLE' ? (
					<div className='flex-grow w-full'>
						<div className='flex items-center justify-center h-full'>HLS has not started yet of is stopped</div>
					</div>
				) : (
					hlsState === 'HLS_PLAYABLE' && (
						<div className='flex-grow'>
							<video
								ref={playerRef}
								id='hlsPlayer'
								autoPlay
								style={{ width: '100%', height: '100%' }}
								playsInline
								muted
								onError={(err) => console.error(err, 'hls video error')}
							/>
						</div>
					)
				)}
				{/* <ChatView /> */}
			</div>
		</>
	)
}
