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
import { z } from 'zod'

const formSchema = z.object({ name: z.instanceof(FileList).nullable() })
type TForm = z.infer<typeof formSchema>

export default function StreamUpload({ stream }: { stream: SupaSelectType<'streams'> }) {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema), defaultValues: { name: null } })
	const router = useRouter()

	async function onSubmit({ name }: TForm) {
		try {
			if (!name || name.length === 0) toast.error('You must select an image to upload.')

			const file = name![0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${stream.id}-${Math.random()}.${fileExt}`

			let { error: uploadError } = await supaclient().storage.from('stream_media').upload(filePath, file)
			if (uploadError) toast.error(uploadError.message)

			toast('Successfully uploaded media')
		} catch (err) {
			toast.error('Error uploading media')
		}
		// const { error } = await supaclient().from('streams').update({ name }).eq('id', stream.id)
		// if (error) toast.error(error.message)
		// else {
		// 	toast.success('Stream updated successfully')
		// 	router.refresh()
		// }
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Uploaded Media</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<ul className='ml-6 list-disc [&>li]:mt-2'>
							<li>1st level of puns: 5 gold coins</li>
							<li>2nd level of jokes: 10 gold coins</li>
							<li>3rd level of one-liners : 20 gold coins</li>
						</ul>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upload new</FormLabel>
									<FormControl>
										<Input
											className='max-w-[400px]'
											type='file'
											{...field}
											value={
												form.getValues('name')?.[0]?.name ? `C:\\fakepath\\${form.getValues('name')![0]!.name}` : ''
											}
											onChange={(e) => form.setValue('name', e.target.files)}
										/>
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
