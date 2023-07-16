'use client'

import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SupaSelectType } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import StreamForm from './stream-form'

export function StreamCreateButton({ profiles, variant }: ButtonProps & { profiles: SupaSelectType<'profiles'>[] }) {
	return (
		<Dialog>
			<DialogTrigger className={cn(buttonVariants({ variant }))}>
				<Plus className='w-4 h-4 mr-2' />
				New stream
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Stream</DialogTitle>
					<DialogDescription>Create and schedule a new stream</DialogDescription>
				</DialogHeader>
				<StreamForm profiles={profiles} />
			</DialogContent>
		</Dialog>
	)
}
