import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const newSchema = z.object({ name: z.string().nonempty(), date: z.string() })
type TNew = z.infer<typeof newSchema>

export default function StreamForm() {
	const router = useRouter()
	const supabase = supaclient()

	const form = useForm<TNew>({
		resolver: zodResolver(newSchema),
		defaultValues: { name: '', date: dayjs().startOf('hour').add(1, 'hour').format('YYYY-MM-DDTHH:mm') },
	})

	async function onSubmit(values: TNew) {
		const { roomId: meetingId } = await fetch('/api/meetings', { method: 'POST' }).then((res) => res.json())

		const { error } = await supabase.from('streams').insert({ ...values, meeting_id: meetingId })
		if (error) return toast.error(error.message)

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
	)
}
