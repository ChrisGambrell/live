import { cn } from '@/lib/utils'
import { useMeeting } from '@videosdk.live/react-sdk'
import { LogOut, Mic, MicOff, ScreenShare, ScreenShareOff, Video, VideoOff } from 'lucide-react'
import ActionIcon from './action-icon'

export default function Controls() {
	const { leave, localMicOn, localScreenShareOn, localWebcamOn, toggleMic, toggleScreenShare, toggleWebcam } = useMeeting({
		onError({ code, message }) {
			console.log(code, message)
		},
	})

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
		</div>
	)
}
