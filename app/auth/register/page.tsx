'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const router = useRouter()
	const supabase = createClient()

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setMessage(null)

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
					},
				},
			})

			if (error) throw error

			if (data.user) {
				setMessage({
					type: 'success',
					text: 'Регистрация успешна! Проверьте почту для подтверждения.',
				})

				// Автоматический вход через 2 секунды
				setTimeout(() => {
					router.push('/dashboard')
				}, 2000)
			}
		} catch (error: any) {
			setMessage({ type: 'error', text: error.message })
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Регистрация</h2>
				<p className='mt-2 text-center text-sm text-gray-600'>
					Или{' '}
					<Link href='/auth/login' className='font-medium text-orange-600 hover:text-orange-500'>
						войдите в существующий аккаунт
					</Link>
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{message && <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{message.text}</div>}

					<form className='space-y-6' onSubmit={handleRegister}>
						<div>
							<label htmlFor='fullName' className='block text-sm font-medium text-gray-700'>
								Полное имя
							</label>
							<div className='mt-1'>
								<input
									id='fullName'
									name='fullName'
									type='text'
									autoComplete='name'
									required
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
								/>
							</div>
						</div>

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
									autoComplete='new-password'
									required
									minLength={6}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
								/>
							</div>
							<p className='mt-1 text-xs text-gray-500'>Минимум 6 символов</p>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50'>
								{loading ? 'Регистрация...' : 'Зарегистрироваться'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
