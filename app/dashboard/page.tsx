'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Profile {
	id: string
	email: string
	full_name: string
	weight: number | null
	height: number | null
	age: number | null
	gender: string | null
	goal: string | null
	activity_level: string | null
	daily_calories: number | null
	protein: number | null
	fat: number | null
	carbs: number | null
}

export default function Dashboard() {
	const [profile, setProfile] = useState<Profile | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const router = useRouter()
	const supabase = createClient()

	useEffect(() => {
		loadProfile()
	}, [])

	const loadProfile = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser()

			if (!user) {
				router.push('/auth/login')
				return
			}

			const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

			if (error) throw error
			setProfile(data)
		} catch (error) {
			console.error('Error loading profile:', error)
		} finally {
			setLoading(false)
		}
	}

	const calculateBJU = () => {
		if (!profile?.weight || !profile?.height || !profile?.age || !profile?.activity_level || !profile?.goal) {
			setMessage({ type: 'error', text: 'Заполните все поля для расчета' })
			return
		}

		let bmr
		if (profile.gender === 'female') {
			bmr = 447.6 + 9.2 * profile.weight + 3.1 * profile.height - 4.3 * profile.age
		} else {
			bmr = 88.36 + 13.4 * profile.weight + 4.8 * profile.height - 5.7 * profile.age
		}

		const activityMultipliers: { [key: string]: number } = {
			sedentary: 1.2,
			light: 1.375,
			moderate: 1.55,
			active: 1.725,
			very_active: 1.9,
		}

		let tdee = bmr * (activityMultipliers[profile.activity_level] || 1.2)

		if (profile.goal === 'weight_loss') {
			tdee = tdee * 0.85
		} else if (profile.goal === 'weight_gain') {
			tdee = tdee * 1.15
		}

		const protein = Math.round(profile.weight * 1.8)
		const fat = Math.round((tdee * 0.25) / 9)
		const carbs = Math.round((tdee - protein * 4 - fat * 9) / 4)

		setProfile({
			...profile,
			daily_calories: Math.round(tdee),
			protein,
			fat,
			carbs,
		})

		setMessage({ type: 'success', text: 'Расчет выполнен! Не забудьте сохранить данные.' })
	}

	const handleSave = async () => {
		if (!profile) return

		setSaving(true)
		setMessage(null)

		try {
			const { error } = await supabase
				.from('profiles')
				.update({
					weight: profile.weight,
					height: profile.height,
					age: profile.age,
					gender: profile.gender,
					goal: profile.goal,
					activity_level: profile.activity_level,
					daily_calories: profile.daily_calories,
					protein: profile.protein,
					fat: profile.fat,
					carbs: profile.carbs,
					updated_at: new Date().toISOString(),
				})
				.eq('id', profile.id)

			if (error) throw error
			setMessage({ type: 'success', text: 'Данные успешно сохранены!' })
		} catch (error: any) {
			setMessage({ type: 'error', text: error.message })
		} finally {
			setSaving(false)
		}
	}

	const handleLogout = async () => {
		await supabase.auth.signOut()
		router.push('/')
		router.refresh()
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-2xl'>Загрузка...</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto'>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-900'>
							Личный кабинет
							{profile?.full_name && <span className='text-orange-500 ml-2'>{profile.full_name}</span>}
						</h1>
						<button onClick={handleLogout} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'>
							Выйти
						</button>
					</div>

					{message && <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>}

					<div className='bg-white shadow rounded-lg p-6 mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Ваши данные</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Вес (кг)</label>
								<input
									type='number'
									step='0.1'
									value={profile?.weight || ''}
									onChange={(e) => setProfile({ ...profile!, weight: parseFloat(e.target.value) || null })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
									placeholder='70'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Рост (см)</label>
								<input
									type='number'
									value={profile?.height || ''}
									onChange={(e) => setProfile({ ...profile!, height: parseFloat(e.target.value) || null })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
									placeholder='175'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Возраст</label>
								<input
									type='number'
									value={profile?.age || ''}
									onChange={(e) => setProfile({ ...profile!, age: parseInt(e.target.value) || null })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
									placeholder='30'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Пол</label>
								<select
									value={profile?.gender || ''}
									onChange={(e) => setProfile({ ...profile!, gender: e.target.value })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'>
									<option value=''>Выберите</option>
									<option value='male'>Мужской</option>
									<option value='female'>Женский</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Цель</label>
								<select
									value={profile?.goal || ''}
									onChange={(e) => setProfile({ ...profile!, goal: e.target.value })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'>
									<option value=''>Выберите</option>
									<option value='weight_loss'>Снижение веса</option>
									<option value='weight_gain'>Набор веса</option>
									<option value='maintenance'>Поддержание веса</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Уровень активности</label>
								<select
									value={profile?.activity_level || ''}
									onChange={(e) => setProfile({ ...profile!, activity_level: e.target.value })}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'>
									<option value=''>Выберите</option>
									<option value='sedentary'>Сидячий образ жизни</option>
									<option value='light'>Легкая активность (1-3 раза в неделю)</option>
									<option value='moderate'>Умеренная активность (3-5 раз в неделю)</option>
									<option value='active'>Высокая активность (6-7 раз в неделю)</option>
									<option value='very_active'>Очень высокая активность (спортсмен)</option>
								</select>
							</div>
						</div>

						<div className='flex gap-4'>
							<button onClick={calculateBJU} className='px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition'>
								Рассчитать КБЖУ
							</button>
							<button onClick={handleSave} disabled={saving} className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50'>
								{saving ? 'Сохранение...' : 'Сохранить данные'}
							</button>
						</div>
					</div>

					{profile?.daily_calories && (
						<div className='bg-white shadow rounded-lg p-6'>
							<h2 className='text-xl font-semibold mb-4'>Ваш расчет КБЖУ</h2>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								<div className='bg-orange-50 p-4 rounded-lg'>
									<div className='text-sm text-gray-600'>Калории</div>
									<div className='text-2xl font-bold text-orange-600'>{profile.daily_calories} ккал</div>
								</div>
								<div className='bg-blue-50 p-4 rounded-lg'>
									<div className='text-sm text-gray-600'>Белки</div>
									<div className='text-2xl font-bold text-blue-600'>{profile.protein} г</div>
								</div>
								<div className='bg-yellow-50 p-4 rounded-lg'>
									<div className='text-sm text-gray-600'>Жиры</div>
									<div className='text-2xl font-bold text-yellow-600'>{profile.fat} г</div>
								</div>
								<div className='bg-green-50 p-4 rounded-lg'>
									<div className='text-sm text-gray-600'>Углеводы</div>
									<div className='text-2xl font-bold text-green-600'>{profile.carbs} г</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
