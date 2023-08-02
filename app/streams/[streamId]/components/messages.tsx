import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Muted } from '@/components/ui/typography'
import { SupaSelectType } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { useMeeting } from '@videosdk.live/react-sdk'
import { useEffect, useState } from 'react'

export default function Messages() {
	const { localParticipant, meetingId } = useMeeting()
	const [messages, setMessages] = useState<SupaSelectType<'messages'>[]>([])
	const [body, setBody] = useState('')
	const supabase = supaclient()

	useEffect(() => {
		async function getInitialData() {
			const { data, error } = await supabase
				.from('messages')
				.select()
				.eq('meeting_id', meetingId)
				.order('created_at', { ascending: false })
			if (error || !data) throw error || new Error('Something went wrong getting the initial data')
			setMessages(data)
		}

		getInitialData()
	}, [meetingId, supabase])

	useEffect(() => {
		const channel = supabase
			.channel('messages')
			.on<SupaSelectType<'messages'>>(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'messages', filter: `meeting_id=eq.${meetingId}` },
				(payload) => {
					setMessages((prev) => [payload.new, ...prev])
				}
			)
			.on<SupaSelectType<'messages'>>(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'messages', filter: `meeting_id=eq.${meetingId}` },
				(payload) => {
					setMessages((prev) => prev.map((p) => (p.id === payload.old.id ? payload.new : p)))
				}
			)
			.on<SupaSelectType<'messages'>>(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'messages', filter: `meeting_id=eq.${meetingId}` },
				(payload) => {
					setMessages((prev) => prev.filter((p) => p.id !== payload.old.id))
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [meetingId, supabase])

	return (
		<Card className='w-[400px] max-h-[750px] flex-1 flex flex-col'>
			<CardHeader className='flex-shrink-0'>
				<CardTitle>Messages</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 overflow-scroll divide-y'>
				{messages.length > 0 ? (
					messages.map((m) => (
						<p key={m.id} className='p-1'>
							<span className='font-semibold'>{m.display_name}: </span>
							{m.message}
						</p>
					))
				) : (
					<Muted className='italic'>No messages yet</Muted>
				)}
			</CardContent>
			<CardFooter className='flex-shrink-0 pt-6 border-t'>
				<form
					className='flex w-full space-x-2'
					onSubmit={async (event) => {
						event.preventDefault()
						await supabase
							.from('messages')
							.insert({ meeting_id: meetingId, display_name: localParticipant.displayName, message: body })
						setBody('')
					}}>
					<Input className='flex-1' placeholder='New message...' value={body} onChange={(e) => setBody(e.target.value)} />
					<Button>Send</Button>
				</form>
			</CardFooter>
		</Card>
	)
}
