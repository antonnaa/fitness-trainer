'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const Header = () => {
	const [user, setUser] = useState<any>(null)
	const router = useRouter()

	useEffect(() => {
		const supabase = createClient()
		if (!supabase) {
			console.warn('Supabase client not initialized')
			return
		}

		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUser(user)
		}
		getUser()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user || null)
		})

		return () => subscription.unsubscribe()
	}, [])

	const handleLogout = async () => {
		const supabase = createClient()
		if (supabase) {
			await supabase.auth.signOut()
		}
		router.push('/')
		router.refresh()
	}

	return (
		<header className='bg-black text-white shadow-md sticky top-0 z-50'>
			<nav className='container mx-auto px-6 py-4 flex justify-between items-center'>
				<Link href='/' className='text-2xl font-bold text-orange-500'>
					FIT<span className='text-white'>PRO</span>
				</Link>
				<div className='hidden md:flex space-x-8'>
					<Link href='/' className='hover:text-orange-400 transition'>
						Главная
					</Link>
					<Link href='/about' className='hover:text-orange-400 transition'>
						Обо мне
					</Link>
					<Link href='/services' className='hover:text-orange-400 transition'>
						Услуги
					</Link>
					<Link href='/prices' className='hover:text-orange-400 transition'>
						Цены
					</Link>
					<Link href='/reviews' className='hover:text-orange-400 transition'>
						Отзывы
					</Link>
					<Link href='/contacts' className='hover:text-orange-400 transition'>
						Контакты
					</Link>
				</div>
				<div>
					{user ? (
						<div className='flex items-center gap-4'>
							<Link href='/dashboard' className='text-white hover:text-orange-400 transition'>
								Личный кабинет
							</Link>
							<button onClick={handleLogout} className='bg-red-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition'>
								Выйти
							</button>
						</div>
					) : (
						<Link href='/auth/login' className='bg-orange-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition'>
							Личный кабинет
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
