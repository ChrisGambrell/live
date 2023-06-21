'use client'

import { Command, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { MobileNav } from './mobile-nav'

export default function MainNav({ title }: { title?: string }) {
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	return (
		<div className='flex gap-6 md:gap-10'>
			<Link href='/' className='items-center hidden space-x-2 md:flex'>
				<Command />
				<span className='hidden font-bold sm:inline-block'>{title || 'Stepworks Live'}</span>
			</Link>
			<button className='flex items-center space-x-2 md:hidden' onClick={() => setShowMobileMenu(!showMobileMenu)}>
				{showMobileMenu ? <X /> : <Command />}
				<span className='font-bold'>Menu</span>
			</button>
			{showMobileMenu && <MobileNav title={title} />}
		</div>
	)
}
