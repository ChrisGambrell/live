'use client'

// TODO: There needs to be a page for admins to add accounts

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { H3, Muted } from '@/components/ui/typography'
import { supaclient } from '@/lib/supabase-client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({ name: z.string().nonempty(), email: z.string().email(), password: z.string().min(6) })
type TForm = z.infer<typeof formSchema>

export default function RegisterPage() {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema), defaultValues: { name: '', email: '', password: '' } })
	const router = useRouter()
	const searchParams = useSearchParams()

	async function onSubmit({ name, email, password }: TForm) {
		const {
			data: { user },
			error: signUpError,
		} = await supaclient().auth.signUp({ email, password })
		if (signUpError || !user) return toast.error(signUpError?.message || 'Something went wrong. Please try again.')

		const { error: profileError } = await supaclient().from('profiles').insert({ id: user.id, name })
		if (profileError) return toast.error(profileError.message)

		toast.success('Successfully registered! Please check your email to verify your account.')
		router.push(`/login?redirectTo=${searchParams.get('redirectTo')}`)
	}

	return (
		<div className='container flex flex-col items-center justify-center w-screen h-screen'>
			<Link
				href={{ pathname: '/login', query: { redirectTo: searchParams.get('redirectTo') } }}
				className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
				Login
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]'>
				<div className='flex flex-col space-y-1 text-center'>
					<H3>Let&apos;s get started</H3>
					<Muted>Fill out your information below</Muted>
				</div>
				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Full name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
							Register
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
