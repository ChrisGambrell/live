import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { SupaSelectType } from './supabase'
import { supaclient } from './supabase-client'

const useStreams = () => {
	const [data, setData] = useState<SupaSelectType<'streams'>[]>([])
	const supabase = supaclient()

	useEffect(() => {
		async function getInitialData() {
			const { data, error } = await supabase
				.from('streams')
				.select()
				.gte('date', dayjs().format('YYYY-MM-DD'))
				.order('date', { ascending: true })
			if (error || !data) throw error || new Error('Something went wrong getting the initial streams')
			setData(data)
		}

		getInitialData()
	}, [supabase])

	useEffect(() => {
		const channel = supabase
			.channel('streams')
			.on<SupaSelectType<'streams'>>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'streams' }, (payload) => {
				if (!dayjs.utc(payload.new.date).local().isBefore(dayjs().startOf('day')))
					setData((prev) => [...prev, payload.new].sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1)))
			})
			.on<SupaSelectType<'streams'>>('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'streams' }, (payload) => {
				setData((prev) =>
					prev
						.map((p) => (p.id === payload.old.id ? payload.new : p))
						.sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1))
				)
			})
			.on<SupaSelectType<'streams'>>('postgres_changes', { event: 'DELETE', schema: 'public', table: 'streams' }, (payload) => {
				setData((prev) => prev.filter((p) => p.id !== payload.old.id))
			})
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase])

	return data
}

export default useStreams
