'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SupaSelectType } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { profile } from 'console'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({ name: z.string().nonempty(), presenter: z.string().nonempty(), date: z.string() })
type TForm = z.infer<typeof formSchema>

export default function StreamForm({ profiles }: { profiles: SupaSelectType<'profiles'>[] }) {
	const supabase = supaclient()
	const [repeat, setRepeat] = useState(false)
	const [repeatValue, setRepeatValue] = useState<string>('week')
	const [repeatNumber, setRepeatNumber] = useState(0)

	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', date: dayjs().startOf('hour').add(1, 'hour').format('YYYY-MM-DDTHH:mm') },
	})

	async function onSubmit(values: TForm) {
		const { roomId: meetingId } = await fetch('/api/meetings', { method: 'POST' }).then((res) => res.json())

		if (!repeat) {
			const { error } = await supabase
				.from('streams')
				.insert({ ...values, meeting_id: meetingId, date: dayjs(values.date).toISOString() })
			if (error) return toast.error(error.message)
		} else {
			const { error } = await supabase
				.from('streams')
				.insert({ ...values, meeting_id: meetingId, [repeatValue]: repeatNumber, date: dayjs(values.date).toISOString() })
			if (error) return toast.error(error.message)
		}

		toast.success(`${values.name} created successfully`)
	}

	return (
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
					name='presenter'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a presenter' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{profiles.map((profile) => (
										<SelectItem key={profile.id} value={profile.id}>
											{profile.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
				<div className='flex space-x-2'>
					<Switch value={repeat.toString()} onCheckedChange={setRepeat} />
					<div>Repeat meeting?</div>
				</div>
				{repeat && (
					<div className='flex space-x-2'>
						<Input value={repeatNumber} onChange={(e) => setRepeatNumber(+e.target.value)} />
						<Tabs className='w-[250px]' value={repeatValue} onValueChange={setRepeatValue}>
							<TabsList className='grid w-full grid-cols-2'>
								<TabsTrigger value='week'>Week</TabsTrigger>
								<TabsTrigger value='month'>Month</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				)}
				<Button type='submit'>Save</Button>
			</form>
		</Form>
	)
}
