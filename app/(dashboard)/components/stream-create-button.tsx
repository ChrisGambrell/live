'use client'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supaclient } from '@/lib/supabase-client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({ name: z.string().nonempty(), date: z.string() })
type TForm = z.infer<typeof formSchema>

export function StreamCreateButton({ className, variant, ...props }: ButtonProps) {
	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', date: dayjs().startOf('hour').add(1, 'hour').format('YYYY-MM-DDTHH:mm') },
	})
	const router = useRouter()
	const supabase = supaclient()

	async function onSubmit(values: TForm) {
		const { roomId: meetingId } = await fetch('/api/meetings', { method: 'POST' }).then((res) => res.json())

		const { error } = await supabase.from('streams').insert({ ...values, meeting_id: meetingId })
		if (error) return toast.error(error.message)

		toast.success(`${values.name} created successfully`)
	}

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
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Stream name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Scheduled for...' type='datetime-local' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Save</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
