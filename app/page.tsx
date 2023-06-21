import { verifyAuth } from '@/lib/supabase-server'

export default async function HomePage() {
	const user = await verifyAuth()
	return <div>hello, world!</div>
}
