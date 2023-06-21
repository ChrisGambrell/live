import { Muted } from '@/components/ui/typography'
import { Constants, useMeeting } from '@videosdk.live/react-sdk'
import { Clapperboard, LogOut, MessageSquare, Mic, MicOff, MonitorX, Users2, Video, VideoOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import ActionIcon from './action-icon'
import Controls from './controls'
import Messages from './messages'
import ParticipantView from './participant-view'
import Participants from './participants'

type View = 'participants' | 'messages'

export default function SpeakerView() {
	const [view, setView] = useState<View[]>(['participants', 'messages'])

	const { participants, meetingId } = useMeeting({
		onParticipantJoined: (participant) => toast(`${participant.displayName} has joined`, { icon: '👋' }),
	})

	const speakers = useMemo(() => {
		const speakerParticipants = [...participants.values()].filter((p) => p.mode === Constants.modes.CONFERENCE)
		return speakerParticipants
	}, [participants])

	const toggleView = (newView: View) => {
		if (view.includes(newView)) setView((p) => p.filter((v) => v !== newView))
		else setView((p) => [...p, newView])
	}

	return (
		<>
			<div className='flex flex-grow space-x-4'>
				<div className='flex items-center h-full'>
					{speakers.map((p) => (
						<ParticipantView key={p.id} participantId={p.id} />
					))}
				</div>
				<div className='flex flex-col h-full pb-6 pr-4 space-y-4'>
					{view.includes('participants') && <Participants />}
					{view.includes('messages') && <Messages />}
				</div>
			</div>
			<div className='flex items-center justify-between flex-shrink-0 h-16 border-t'>
				<Muted className='flex-1 ml-8'>{meetingId}</Muted>
				<div className='flex-1'>
					<Controls />
				</div>
				<div className='flex-1 mr-8'>
					<div className='flex justify-end space-x-2'>
						<ActionIcon icon={Users2} onClick={() => toggleView('participants')} />
						<ActionIcon icon={MessageSquare} onClick={() => toggleView('messages')} />
					</div>
				</div>
			</div>
		</>
	)
}
