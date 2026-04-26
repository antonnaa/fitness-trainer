'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const router = useRouter()
	const supabase = createClient()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setMessage(null)

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) throw error

			setMessage({ type: 'success', text: 'Успешный вход! Перенаправление...' })
			router.push('/dashboard')
			router.refresh()
		} catch (error: any) {
			setMessage({ type: 'error', text: error.message })
		} finally {
			setLoading(false)
		}
	}

	const handleSendOTP = async () => {
		if (!email) {
			setMessage({ type: 'error', text: 'Введите email' })
			return
		}

		setLoading(true)
		try {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					shouldCreateUser: true,
				},
			})

			if (error) throw error
			setMessage({ type: 'success', text: 'Код отправлен на вашу почту! Проверьте email.' })
		} catch (error: any) {
			setMessage({ type: 'error', text: error.message })
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Вход в личный кабинет</h2>
				<p className='mt-2 text-center text-sm text-gray-600'>
					Или{' '}
					<Link href='/auth/register' className='font-medium text-orange-600 hover:text-orange-500'>
						зарегистрируйтесь
					</Link>
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{message && <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{message.text}</div>}

					<form className='space-y-6' onSubmit={handleLogin}>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
								Email
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Пароль
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50'>
								{loading ? 'Загрузка...' : 'Войти'}
							</button>
						</div>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-gray-500'>Или</span>
							</div>
						</div>

						<div className='mt-6'>
							<button
								onClick={handleSendOTP}
								disabled={loading}
								className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>
								Войти по коду из SMS/Email
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
