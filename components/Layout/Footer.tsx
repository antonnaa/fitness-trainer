'use client'

import React, { useState } from 'react'

const Footer = () => {
	const [formData, setFormData] = useState({
		name: '',
		contact: '',
		message: '',
	})
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<{
		type: 'success' | 'error' | null
		text: string
	}>({ type: null, text: '' })

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setStatus({ type: null, text: '' })

		try {
			const response = await fetch('/api/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					formType: 'footer',
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Ошибка отправки')
			}

			setStatus({
				type: 'success',
				text: 'Спасибо! Я свяжусь с вами в ближайшее время.',
			})
			setFormData({ name: '', contact: '', message: '' })
		} catch (error: any) {
			setStatus({
				type: 'error',
				text: error.message || 'Произошла ошибка. Попробуйте позже.',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<footer className='bg-gray-900 text-white pt-12 pb-8 mt-auto'>
			<div className='container mx-auto px-6'>
				<div className='grid md:grid-cols-2 gap-12'>
					<div>
						<h3 className='text-2xl font-bold text-orange-500 mb-4'>Начни менять себя сейчас</h3>
						<p className='text-gray-400 mb-6'>Оставь заявку, и я свяжусь с тобой в течение 15 минут, чтобы обсудить цели и предложить план действий.</p>
						<p className='text-sm text-gray-500'>© 2026 FitPro. Все права защищены.</p>
					</div>

					<div>
						<form onSubmit={handleSubmit} className='space-y-4 bg-gray-800 p-6 rounded-xl'>
							{status.type && (
								<div
									className={`p-3 rounded-lg text-sm ${
										status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
									}`}>
									{status.text}
								</div>
							)}

							<div>
								<label htmlFor='footer-name' className='block text-sm font-medium text-gray-300 mb-1'>
									Имя *
								</label>
								<input
									type='text'
									id='footer-name'
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-white'
									placeholder='Алексей'
									required
									disabled={loading}
								/>
							</div>

							<div>
								<label htmlFor='footer-contact' className='block text-sm font-medium text-gray-300 mb-1'>
									Телефон или Email *
								</label>
								<input
									type='text'
									id='footer-contact'
									value={formData.contact}
									onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
									className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-white'
									placeholder='+7 (900) 123-45-67'
									required
									disabled={loading}
								/>
							</div>

							<div>
								<label htmlFor='footer-message' className='block text-sm font-medium text-gray-300 mb-1'>
									Сообщение
								</label>
								<textarea
									id='footer-message'
									rows={2}
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-white'
									placeholder='Хочу похудеть к лету...'
									disabled={loading}></textarea>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
								{loading ? 'Отправка...' : 'Отправить заявку'}
							</button>

							<p className='text-xs text-gray-400 text-center mt-2'>Нажимая кнопку, вы соглашаетесь с обработкой данных</p>
						</form>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
