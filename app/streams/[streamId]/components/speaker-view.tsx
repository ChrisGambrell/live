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
	const [externalVideo, setExternalVideo] = useState<{ link: string | null; playing: boolean }>({ link: null, playing: false })
	const [view, setView] = useState<View[]>(['participants', 'messages'])

	const { meetingId, pinnedParticipants, participants, leave, pauseVideo, seekVideo } = useMeeting({
		onHlsStarted: () => toast('You are now live!', { icon: '🔴' }),
		onParticipantJoined: (participant) => toast(`${participant.displayName} has joined`, { icon: '👋' }),
		onParticipantLeft: (participant) => toast(`${participant.displayName} has disconnected`, { icon: '🫠' }),
		onVideoStateChanged: (data: any) => {
			console.log('videoStateChanged', data)
			const { currentTime, link, status } = data

			switch (status) {
				case 'stopped':
					externalPlayer.current.src = null
					setExternalVideo({ link: null, playing: false })
					break
				case 'resumed':
					if (typeof currentTime === 'number') externalPlayer.current.currentTime = currentTime
					externalPlayer.current.play()
					setExternalVideo((p) => ({ ...p, playing: true }))
					break
				case 'paused':
					externalPlayer.current.pause()
					setExternalVideo((p) => ({ ...p, playing: false }))
					break
				case 'started':
					setExternalVideo({ link, playing: true })
					break
				default:
					break
			}
		},
		onVideoSeeked: (data) => {
			const { currentTime } = data
			if (typeof currentTime === 'number') externalPlayer.current.currentTime = currentTime
		},
	})

	const toggleView = (newView: View) => {
		if (view.includes(newView)) setView((p) => p.filter((v) => v !== newView))
		else setView((p) => [...p, newView])
	}

	// const pauseExternal = () => pauseVideo({ currentTime: externalPlayer.current.currentTime })
	// const seekExternal = (t) => seekVideo({ currentTime: t })

	return (
		<>
			<div className='flex flex-grow space-x-4'>
				<div className='flex items-center flex-grow h-full'>
					{externalVideo.link ? (
						externalVideo.link?.endsWith('.pptx') ? (
							<div>
								{/* <iframe src={externalVideo.link}></iframe> */}
								{/* <DocViewer documents={[{ uri: externalVideo.link }]} /> */}
							</div>
						) : (
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
						)
					) : [...pinnedParticipants].length > 0 ? (
						<div className='relative'>
							<ScreenShareFeed participantId={[...pinnedParticipants][0][0]} />
							<div className='fixed bottom-[72px] left-2 rounded border shadow-lg w-[250px] h-[150px]'>
								<ParticipantView participantId={[...pinnedParticipants][0][0]} />
							</div>
						</div>
					) : (
						<div className='w-full'>
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
					{/* {view.includes('media') && (
						<Media
							streamId={stream.id}
							externalPlayer={externalPlayer}
							externalVideo={externalVideo}
							setExternalVideo={setExternalVideo}
						/>
					)} */}
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
