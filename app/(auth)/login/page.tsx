'use client'

// TODO: There needs to be a page for admins to add accounts

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { H3, Muted } from '@/components/ui/typography'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({ email: z.string().email(), password: z.string().nonempty() })
type TForm = z.infer<typeof formSchema>

export default function LoginPage() {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema), defaultValues: { email: '', password: '' } })
	const router = useRouter()
	const searchParams = useSearchParams()

	async function onSubmit({ email, password }: TForm) {
		const { error } = await supaclient().auth.signInWithPassword({ email, password })
		if (error) toast.error(error.message)
		else {
			router.refresh()
			router.push(searchParams.get('redirectTo') || '/')
		}
	}

	return (
		<div className='container flex flex-col items-center justify-center w-screen h-screen'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]'>
				<div className='flex flex-col space-y-1 text-center'>
					<H3>Welcome back</H3>
					<Muted>Enter your credentials to sign in</Muted>
				</div>
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Email address' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Password' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full' type='submit'>
							Sign in
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
