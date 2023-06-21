import { NextResponse } from 'next/server'

export async function POST() {
	const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
		method: 'POST',
		headers: {
			authorization: `${process.env.VIDEOSDK_AUTH_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	})

	const { roomId }: { roomId: string } = await res.json()
	return NextResponse.json({ roomId })
}
