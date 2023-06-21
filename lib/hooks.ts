import { useEffect, useState } from 'react'
import { SupaInsertType, SupaSelectType, SupaTables, SupaUpdateType } from './supabase'
import { supaclient } from './supabase-client'

export function useRealtime<T extends SupaTables>(
	table: T
): {
	data: SupaSelectType<T>[]
	create: (values: SupaInsertType<T>) => void
	update: (values: SupaUpdateType<T>) => void
	remove: (id: SupaSelectType<T>['id']) => void
} {
	const [data, setData] = useState<SupaSelectType<typeof table>[]>([])
	const supabase = supaclient()

	useEffect(() => {
		async function getInitialData() {
			const { data, error } = await supabase.from(table).select()
			if (error || !data) throw error || new Error('Something went wrong getting the initial data')
			setData(data)
		}

		getInitialData()
	}, [supabase, table])

	useEffect(() => {
		const channel = supabase
			.channel(table)
			.on<SupaSelectType<T>>('postgres_changes', { event: 'INSERT', schema: 'public', table }, (payload) => {
				setData((prev) => [...prev, payload.new])
			})
			.on<SupaSelectType<T>>('postgres_changes', { event: 'UPDATE', schema: 'public', table }, (payload) => {
				setData((prev) => prev.map((p) => (p.id === payload.old.id ? payload.new : p)))
			})
			.on<SupaSelectType<T>>('postgres_changes', { event: 'DELETE', schema: 'public', table }, (payload) => {
				setData((prev) => prev.filter((p) => p.id !== payload.old.id))
			})
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, table])

	async function create(values: SupaInsertType<T>) {
		await supabase.from(table).insert(values)
	}

	async function update(values: SupaUpdateType<T>) {
		await supabase.from(table).update(values)
	}

	async function remove(id: SupaSelectType<T>['id']) {
		await supabase.from(table).delete().eq('id', id)
	}

	return { data, create, update, remove }
}
