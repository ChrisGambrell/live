'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SupaSelectType } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import {} from '@supabase/auth-helpers-nextjs'
import { ChangeEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({})
type TForm = z.infer<typeof formSchema>

export default function StreamUpload({
	stream,
	streamMedia,
}: {
	stream: SupaSelectType<'streams'>
	streamMedia: { id: string; name: string }[] | null
}) {
	const form = useForm<TForm>({ resolver: zodResolver(formSchema) })

	const handleSubmit: ChangeEventHandler<HTMLInputElement> = async (event) => {
		event.preventDefault()

		try {
			if (!event.target.files || event.target.files.length === 0) throw new Error('You must select an image to upload.')

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${stream.id}-${Math.random()}.${fileExt}`

			let { error: uploadError } = await supaclient().storage.from('stream_media').upload(filePath, file)

			if (uploadError) throw uploadError
			toast.success('Successfully uploaded media')
		} catch (error) {
			toast.error('Error uploading media')
		}
	}

	return (
		<Form {...form}>
			<form>
				<Card>
					<CardHeader>
						<CardTitle>Uploaded Media</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<ul className='ml-6 list-disc [&>li]:mt-2'>
							{streamMedia?.map((media) => (
								<li key={media.id}>{media.name}</li>
							))}
						</ul>
						<FormField
							control={form.control}
							name='name'
							render={() => (
								<FormItem>
									<FormLabel>Upload new</FormLabel>
									<FormControl>
										<Input className='max-w-[400px]' type='file' onChange={handleSubmit} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
