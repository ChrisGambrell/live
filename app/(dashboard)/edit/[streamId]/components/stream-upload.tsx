'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SupaSelectType } from '@/lib/supabase'
import { supaclient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function StreamUpload({
	stream,
	streamMedia,
}: {
	stream: SupaSelectType<'streams'>
	streamMedia: { id: string; name: string }[] | null
}) {
	const router = useRouter()
	const [name, setName] = useState('')
	const [files, setFiles] = useState<FileList | null>(null)

	const uploadFile = async (file: File, filePath: string) => {
		const { error } = await supaclient().storage.from('stream_media').upload(filePath, file)
		if (error) {
			console.error(error)
			throw error
		}
	}

	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault()

		try {
			console.log(files)
			if (!name || name.trim() === '') return toast.error('Please enter a name for the file.')
			if (!files || files.length === 0) return toast.error('You must select media to upload.')

			const file = files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${stream.id}/${name}_${Math.random()}.${fileExt}`

			await toast.promise(uploadFile(file, filePath), {
				loading: 'Uploading...',
				success: 'Successfully uploaded file!',
				error: 'There was an error uploading the file.',
			})

			router.refresh()
		} catch (error) {
			toast.error('Error uploading media')
		}
	}

	console.log(streamMedia)

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Uploaded Media</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<ul className='ml-6 list-disc [&>li]:mt-2'>
						{streamMedia?.map((media) => (
							<li key={media.id}>
								{media.name.split('_').slice(0, -1).join('_')}{' '}
								<span
									className='text-xs cursor-pointer text-primary hover:underline'
									onClick={async () => {
										await supaclient()
											.storage.from('stream_media')
											.remove([`${stream.id}/${media.name}`])
										router.refresh()
									}}>
									(remove)
								</span>
							</li>
						))}
					</ul>
					<div className='space-y-3'>
						<Label>Upload new</Label>
						<Input className='max-w-[400px]' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
						<Input className='max-w-[400px] file-upload' type='file' onChange={(event) => setFiles(event.target.files)} />
						<Button>Upload</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	)
}
