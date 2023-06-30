import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMeeting } from '@videosdk.live/react-sdk'

export default function Participants() {
	const { participants } = useMeeting()
	// console.log([...participants.values()])

	return (
		<Card className='w-[400px] flex-shrink-0'>
			<CardHeader>
				<CardTitle>Participants</CardTitle>
				<CardDescription>There are {participants.size - 1} people watching the stream</CardDescription>
			</CardHeader>
			<CardContent>
				{[...participants.values()]
					.filter((p) => p.mode !== 'CONFERENCE')
					.map((p) => (
						<p key={p.id}>{p.displayName}</p>
					))}
			</CardContent>
		</Card>
	)
}
