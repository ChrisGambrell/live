'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import stream from 'stream'
import { z } from 'zod'

const formSchema = z.object({ name: z.string().nonempty() })
type TForm = z.infer<typeof formSchema>

export default function StreamForm({ stream }: { stream: SupaSelectType<'streams'> }) {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema), defaultValues: { name: stream.name } })
	const router = useRouter()

	async function onSubmit({ name }: TForm) {
		const { error } = await supaclient().from('streams').update({ name }).eq('id', stream.id)
		if (error) toast.error(error.message)
		else {
			toast.success('Stream updated successfully')
			router.refresh()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>{stream.name}</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Stream name</FormLabel>
									<FormControl>
										<Input className='max-w-[400px]' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Save</Button>
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
