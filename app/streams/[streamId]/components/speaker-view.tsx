import { Muted } from '@/components/ui/typography'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { useMeeting } from '@videosdk.live/react-sdk'
import { Image, LogOut, MessageSquare, Users2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import ActionIcon from './action-icon'
import Controls from './controls'
import Media from './media'
import Messages from './messages'
import ParticipantView from './participant-view'
import Participants from './participants'
import ScreenShareFeed from './screen-share-feed'

type View = 'participants' | 'messages' | 'media'

export default function SpeakerView({ stream, user }: { stream: SupaSelectType<'streams'>; user: UserProfile }) {
	const externalPlayer = useRef<HTMLVideoElement>()
	const [externalVideo, setExternalVideo] = useState({ link: null, playing: false, index: null })
	const [view, setView] = useState<View[]>(['participants', 'messages'])

	const { meetingId, pinnedParticipants, participants, leave } = useMeeting({
		onHlsStarted: () => toast('You are now live!', { icon: '🔴' }),
		onParticipantJoined: (participant) => toast(`${participant.displayName} has joined`, { icon: '👋' }),
		onParticipantLeft: (participant) => toast(`${participant.displayName} has disconnected`, { icon: '🫠' }),
	})

	const toggleView = (newView: View) => {
		if (view.includes(newView)) setView((p) => p.filter((v) => v !== newView))
		else setView((p) => [...p, newView])
	}
	console.log([...pinnedParticipants])

	return (
		<>
			<div className='flex flex-grow space-x-4'>
				<div className='flex items-center flex-grow h-full'>
					{externalVideo.link ? (
						<video
							// TODO: Fix error
							// @ts-ignore
							onDoubleClick={(e) => externalPlayer.current.requestFullscreen()}
							className='h-full'
							autoPlay
							// TODO: Fix error
							// @ts-ignore
							ref={externalPlayer}
							src={externalVideo.link}
						/>
					) : [...pinnedParticipants].length > 0 ? (
						<div className='relative'>
							<ScreenShareFeed participantId={[...pinnedParticipants][0][0]} />
							<div className='fixed bottom-[72px] left-2 rounded border shadow-lg w-[250px] h-[150px]'>
								<ParticipantView participantId={[...pinnedParticipants][0][0]} />
							</div>
						</div>
					) : (
						<div className='w-full bg-red-100'>
							{[...participants.values()].map((p) => (
								<ParticipantView key={p.id} participantId={p.id} />
							))}
						</div>
					)}
				</div>
				<div className='flex flex-col h-full pb-6 pr-4 space-y-4'>
					{view.includes('participants') && <Participants />}
					{/* // TODO: Fix error
							// @ts-ignore */}
					{view.includes('media') && <Media externalPlayer={externalPlayer} setExternalVideo={setExternalVideo} />}
					{view.includes('messages') && <Messages />}
				</div>
			</div>
			<div className='flex items-center justify-between flex-shrink-0 h-16 border-t'>
				<Muted className='flex-1 ml-8'>{meetingId}</Muted>
				<div className='flex-1'>{stream.presenter === user.id && <Controls />}</div>
				<div className='flex-1 mr-8'>
					<div className='flex justify-end space-x-2'>
						<ActionIcon icon={Users2} onClick={() => toggleView('participants')} />
						<ActionIcon icon={MessageSquare} onClick={() => toggleView('messages')} />
						{stream.presenter === user.id && <ActionIcon icon={Image} onClick={() => toggleView('media')} />}
						<ActionIcon icon={LogOut} onClick={() => leave()} />
					</div>
				</div>
			</div>
		</>
	)
}
