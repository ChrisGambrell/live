import { cn } from '@/lib/utils'
import { useMeeting } from '@videosdk.live/react-sdk'
import { Clapperboard, LogOut, Mic, MicOff, MonitorX, PauseOctagon, ScreenShare, ScreenShareOff, Video, VideoOff } from 'lucide-react'
import { useEffect } from 'react'
import ActionIcon from './action-icon'

export default function Controls() {
	const {
		hlsState,
		leave,
		localMicOn,
		localScreenShareOn,
		localWebcamOn,
		localParticipant,
		startHls,
		stopHls,
		toggleMic,
		toggleScreenShare,
		toggleWebcam,
	} = useMeeting()

	// HLS_STARTING, HLS_STARTED, HLS_STOPPING, HLS_STOPPED, HLS_PLAYABLE
	const toggleHls = () => {
		if (hlsState === 'HLS_STOPPED')
			startHls({
				layout: {
					type: 'SPOTLIGHT',
					priority: 'PIN',
					gridSize: 20,
				},
				theme: 'LIGHT',
				mode: 'video-and-audio',
				quality: 'high',
				orientation: 'landscape',
			})
		else if (hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE') stopHls()
	}

	return (
		<div className='flex justify-center space-x-6'>
			<ActionIcon icon={LogOut} onClick={() => leave()} />
			<ActionIcon
				className={cn(localMicOn && 'bg-red-600 hover:bg-red-500')}
				icon={localMicOn ? Mic : MicOff}
				onClick={() => toggleMic()}
			/>
			<ActionIcon
				className={cn(localWebcamOn && 'bg-red-600 hover:bg-red-500')}
				icon={localWebcamOn ? Video : VideoOff}
				onClick={() => toggleWebcam()}
			/>
			<ActionIcon
				className={cn(localScreenShareOn && 'bg-red-600 hover:bg-red-500')}
				icon={localScreenShareOn ? ScreenShareOff : ScreenShare}
				onClick={() => toggleScreenShare()}
			/>
			<ActionIcon
				className={cn(['HLS_PLAYABLE', 'HLS_STARTED', 'HLS_STARTING'].includes(hlsState) && 'bg-red-600 hover:bg-red-500')}
				icon={['HLS_PLAYABLE', 'HLS_STARTED', 'HLS_STARTING'].includes(hlsState) ? PauseOctagon : Clapperboard}
				onClick={() => toggleHls()}
			/>
		</div>
	)
}
