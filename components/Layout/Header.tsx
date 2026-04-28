'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const Header = () => {
	const [user, setUser] = useState<any>(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const supabase = createClient()
		if (!supabase) return

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
		setIsMenuOpen(false)
	}

	const closeMenu = () => setIsMenuOpen(false)

	const navLinks = [
		{ href: '/', label: 'Главная' },
		{ href: '/about', label: 'Обо мне' },
		{ href: '/services', label: 'Услуги' },
		{ href: '/prices', label: 'Цены' },
		{ href: '/reviews', label: 'Отзывы' },
		{ href: '/contacts', label: 'Контакты' },
	]

	return (
		<header className='bg-black text-white shadow-md sticky top-0 z-50'>
			<nav className='container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'>
				{/* Логотип */}
				<Link href='/' className='text-2xl font-bold text-orange-500 shrink-0'>
					FIT<span className='text-white'>PRO</span>
				</Link>

				{/* Десктопная навигация */}
				<div className='hidden md:flex items-center space-x-6 lg:space-x-8'>
					{navLinks.map((link) => (
						<Link key={link.href} href={link.href} className='hover:text-orange-400 transition text-sm lg:text-base'>
							{link.label}
						</Link>
					))}
				</div>

				{/* Кнопка входа/выхода (десктоп) */}
				<div className='hidden md:flex items-center gap-4'>
					{user ? (
						<>
							<Link href='/dashboard' className='text-white hover:text-orange-400 transition text-sm lg:text-base'>
								Личный кабинет
							</Link>
							<button onClick={handleLogout} className='bg-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition'>
								Выйти
							</button>
						</>
					) : (
						<Link href='/auth/login' className='bg-orange-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition'>
							Личный кабинет
						</Link>
					)}
				</div>

				{/* Кнопка гамбургера (мобильная) */}
				<button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-2' aria-label='Открыть меню'>
					{isMenuOpen ? (
						// Иконка закрытия
						<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
						</svg>
					) : (
						// Иконка гамбургера
						<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
						</svg>
					)}
				</button>
			</nav>

			{/* Мобильное меню */}
			{isMenuOpen && (
				<div className='md:hidden bg-gray-900 border-t border-gray-700'>
					<div className='px-4 py-4 space-y-3'>
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} onClick={closeMenu} className='block px-3 py-2 rounded-lg hover:bg-gray-800 transition text-base font-medium'>
								{link.label}
							</Link>
						))}
						<hr className='border-gray-700 my-3' />
						{user ? (
							<>
								<Link href='/dashboard' onClick={closeMenu} className='block px-3 py-2 rounded-lg hover:bg-gray-800 transition text-base font-medium'>
									Личный кабинет
								</Link>
								<button onClick={handleLogout} className='w-full text-left px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-base font-medium'>
									Выйти
								</button>
							</>
						) : (
							<Link href='/auth/login' onClick={closeMenu} className='block px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition text-center text-base font-semibold'>
								Личный кабинет
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
