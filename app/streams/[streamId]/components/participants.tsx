import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMeeting } from '@videosdk.live/react-sdk'

export default function Participants() {
	const { participants } = useMeeting()

	return (
		<Card className='w-[400px] flex-shrink-0'>
			<CardHeader>
				<CardTitle>Participants</CardTitle>
				<CardDescription>There are {[...participants].length - 1} people watching the stream</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				{[...participants.values()].map((p) => (
					<p key={p.id}>{p.displayName}</p>
				))}
			</CardContent>
		</Card>
	)
}
