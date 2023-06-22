import { verifyAuth } from '@/lib/supabase-server'
import { ReactNode } from 'react'
import MainNav from '../../components/main-nav'
import { UserNav } from '../../components/user-nav'
import { DashboardNav } from './components/dashboard-nav'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const user = await verifyAuth()

	return (
		<div className='flex flex-col min-h-screen space-y-6'>
			<header className='sticky top-0 z-40 border-b bg-background'>
				<div className='container flex items-center justify-between h-16 py-4'>
					<MainNav />
					<UserNav user={user} />
				</div>
			</header>
			<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
				<aside className='hidden w-[200px] flex-col md:flex'>
					<DashboardNav speaker={user.role === 'speaker'} />
				</aside>
				<main className='flex flex-col flex-1 w-full overflow-hidden'>{children}</main>
			</div>
		</div>
	)
}
