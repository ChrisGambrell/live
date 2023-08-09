import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { useMeeting } from '@videosdk.live/react-sdk'

export default function Participants({ stream, user }: { stream: SupaSelectType<'streams'>; user: UserProfile }) {
	const { participants } = useMeeting()

	return (
		<Card className='w-[400px] h-[20%] flex flex-col flex-shrink-0'>
			<CardHeader>
				<CardTitle>Participants</CardTitle>
				<CardDescription>There are {participants.size - 1} people watching the stream</CardDescription>
			</CardHeader>
			<CardContent className='overflow-scroll'>
				{[...participants.values()].map((p) => (
					<p key={p.id}>
						{p.displayName}
						{stream.presenter === user.id && ' (Host)'}
					</p>
				))}
			</CardContent>
		</Card>
	)
}
