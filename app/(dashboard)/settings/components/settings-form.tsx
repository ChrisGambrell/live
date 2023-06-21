'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserProfile } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({ name: z.string().nonempty() })
type TForm = z.infer<typeof formSchema>

export default function SettingsForm({ user }: { user: UserProfile }) {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema), defaultValues: { name: user.name } })

	async function onSubmit({ name }: TForm) {
		const { error } = await supaclient().from('profiles').update({ name }).eq('id', user.id)
		if (error) toast.error(error.message)
		else toast.success('Profile updated successfully')
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Your name</CardTitle>
						<CardDescription>Please enter your full name or a display name you are comfortable with.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='max-w-[400px]' placeholder='Full name' {...field} />
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
