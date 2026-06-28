'use client'

import { useState } from 'react'

export default function Contacts() {
	const [formData, setFormData] = useState({
		name: '',
		contact: '',
		goal: '',
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
			const goalText = formData.goal ? `\nЦель: ${formData.goal}` : ''
			const fullMessage = `${formData.message}${goalText}`

			const response = await fetch('/api/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					contact: formData.contact,
					message: fullMessage,
					formType: 'contacts',
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Ошибка отправки')
			}

			setStatus({
				type: 'success',
				text: 'Спасибо за сообщение! Я свяжусь с вами в ближайшее время.',
			})
			setFormData({ name: '', contact: '', goal: '', message: '' })
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
		<div className='min-h-screen bg-gray-50 py-16'>
			<div className='container mx-auto px-6'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Свяжитесь со <span className='text-orange-500'>мной</span>
					</h1>
					<p className='text-xl text-gray-600'>Остались вопросы? Напишите мне, и я отвечу в течение часа</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
					{/* Контактная информация */}
					<div className='space-y-6'>
						<div className='bg-white rounded-2xl shadow-lg p-8'>
							<h3 className='text-2xl font-bold mb-6'>Контактная информация</h3>

							<div className='space-y-6'>
								<div className='flex items-start'>
									<div className='text-3xl mr-4'>📍</div>
									<div>
										<h4 className='font-semibold text-gray-900'>Адрес</h4>
										<p className='text-gray-600'>
											Нижний Новгород, Белинского 124
											<br />
											Сеть клубов &laquo;Физкульт&raquo;
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='text-3xl mr-4'>📞</div>
									<div>
										<h4 className='font-semibold text-gray-900'>Телефон</h4>
										<p className='text-gray-600'>
											<a href='tel:+79087262857' className='hover:text-orange-500'>
												+7 (908) 726-28-57
											</a>
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='text-3xl mr-4'>✉️</div>
									<div>
										<h4 className='font-semibold text-gray-900'>Email</h4>
										<p className='text-gray-600'>
											<a href='mailto:antonio-03@mail.ru' className='hover:text-orange-500'>
												antonio-03@mail.ru
											</a>
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='text-3xl mr-4'>🕐</div>
									<div>
										<h4 className='font-semibold text-gray-900'>График работы</h4>
										<p className='text-gray-600'>
											Пн-Пт: 8:00 - 22:00
											<br />
											Сб-Вс: 9:00 - 20:00
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Социальные сети */}
						<div className='bg-white rounded-2xl shadow-lg p-8'>
							<h3 className='text-xl font-bold mb-4'>Социальные сети</h3>
							<div className='flex space-x-4'>
								{[
									{
										name: 'VK',
										icon: (
											<svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
												<path d='M15.684 0H8.316C3.725 0 0 3.725 0 8.316v7.368C0 20.275 3.725 24 8.316 24h7.368C20.275 24 24 20.275 24 15.684V8.316C24 3.725 20.275 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.523-2.049-1.723-1.033-1.001-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .423-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.201C5.48 12.15 4.27 8.366 4.27 8.214c0-.203.152-.39.508-.39h1.744c.406 0 .559.186.66.643.745 2.168 1.998 4.066 2.506 4.066.203 0 .305-.288.305-.678V9.388c-.067-1.117-.661-1.218-.661-1.625 0-.17.136-.305.355-.305h2.743c.305 0 .423.17.423.542v2.896c0 .305.136.407.22.407.186 0 .34-.101.661-.44 1.016-1.134 1.744-2.88 1.744-2.88.1-.27.29-.44.66-.44h1.743c.423 0 .525.22.423.542-.17.796-1.828 3.133-1.828 3.133-.152.254-.203.372 0 .66.152.22.66.644 1.016 1.015.66.677 1.168 1.252 1.168 1.524.017.424-.237.627-.66.627z' />
											</svg>
										),
										url: 'https://vk.com/antonna_03',
									},
									{
										name: 'Telegram',
										icon: (
											<svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
												<path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.938z' />
											</svg>
										),
										url: 'https://t.me/ANTONNA_03',
									},
								].map((social, idx) => (
									<a
										key={idx}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition'
										title={social.name}>
										{social.icon}
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Форма обратной связи */}
					<div className='bg-white rounded-2xl shadow-lg p-8'>
						<h3 className='text-2xl font-bold mb-6'>Напишите мне</h3>

						{status.type && <div className={`mb-4 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status.text}</div>}

						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label htmlFor='contact-name' className='block text-sm font-medium text-gray-700 mb-1'>
									Ваше имя *
								</label>
								<input
									type='text'
									id='contact-name'
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
									placeholder='Иван Иванов'
									required
									disabled={loading}
								/>
							</div>

							<div>
								<label htmlFor='contact-contact' className='block text-sm font-medium text-gray-700 mb-1'>
									Email или телефон *
								</label>
								<input
									type='text'
									id='contact-contact'
									value={formData.contact}
									onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
									placeholder='example@mail.ru или +7 (900) 123-45-67'
									required
									disabled={loading}
								/>
							</div>

							<div>
								<label htmlFor='contact-goal' className='block text-sm font-medium text-gray-700 mb-1'>
									Ваша цель
								</label>
								<select
									id='contact-goal'
									value={formData.goal}
									onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white'
									disabled={loading}>
									<option value=''>Выберите цель</option>
									<option value='Снижение веса'>Снижение веса</option>
									<option value='Набор мышечной массы'>Набор мышечной массы</option>
									<option value='Улучшение физической формы'>Улучшение физической формы</option>
									<option value='Реабилитация'>Реабилитация</option>
									<option value='Другое'>Другое</option>
								</select>
							</div>

							<div>
								<label htmlFor='contact-message' className='block text-sm font-medium text-gray-700 mb-1'>
									Сообщение *
								</label>
								<textarea
									id='contact-message'
									rows={4}
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
									placeholder='Расскажите о ваших целях, текущей физической форме, пожеланиях...'
									required
									disabled={loading}></textarea>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed'>
								{loading ? 'Отправка...' : 'Отправить сообщение'}
							</button>

							<p className='text-xs text-gray-500 text-center mt-4'>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
						</form>
					</div>
				</div>

				{/* Яндекс.Карта */}
				<div className='mt-10 md:mt-12 bg-white rounded-2xl shadow-lg overflow-hidden max-w-7xl mx-auto'>
					<div className='p-4 sm:p-6'>
						<h3 className='text-lg sm:text-xl font-bold mb-4'>Как добраться</h3>
						<p className='text-sm sm:text-base text-gray-600 mb-4'>г. Нижний Новгород, ул. Белинского, 124, 603024</p>
					</div>
					<div className='relative w-full' style={{ height: '400px' }}>
						<iframe
							src='https://yandex.ru/map-widget/v1/?ll=44.026719%2C56.319410&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njk4MDU0ORJR0KDQvtGB0YHQuNGPLCDQndC40LbQvdC40Lkg0J3QvtCy0LPQvtGA0L7QtCwg0YPQu9C40YbQsCDQkdC10LvQuNC90YHQutC-0LPQviwgMTI0IgoNXRswQhUTR2FC&z=16'
							width='100%'
							height='100%'
							frameBorder='0'
							allowFullScreen={true}
							style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
							title='Яндекс Карта — Белинского, 124'></iframe>
					</div>
					<div className='px-4 sm:px-6 py-2 bg-gray-100 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1'>
						<a href='https://yandex.ru/maps/47/nizhny-novgorod/?utm_medium=mapframe&utm_source=maps' target='_blank' rel='noopener noreferrer' className='hover:text-orange-500 transition'>
							Нижний Новгород
						</a>
						<a
							href='https://yandex.ru/maps/47/nizhny-novgorod/house/ulitsa_belinskogo_124/YE0YdgVmTkcHQFtsfX9weHhjbQ==/?ll=44.026719%2C56.319410&utm_medium=mapframe&utm_source=maps&z=16'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-orange-500 transition'>
							Улица Белинского, 124 — Яндекс Карты
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
