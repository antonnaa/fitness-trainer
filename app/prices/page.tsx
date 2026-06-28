import Link from 'next/link'

export default function Prices() {
	const packages = [
		{
			name: 'Пробное занятие',
			price: '1000 ₽',
			duration: '60 минут',
			description: 'Знакомство, тестирование, определение целей',
			features: ['Консультация по целям', 'Оценка физической формы', 'Пробная тренировка', 'Рекомендации по питанию'],
			color: 'gray',
		},
		{
			name: 'Базовый',
			price: '13 000 ₽',
			duration: 'месяц',
			description: '8 персональных тренировок',
			features: ['2 тренировки в неделю', 'Программа тренировок', 'Контроль питания', 'Чат поддержка'],
			color: 'orange',
			popular: true,
		},
		{
			name: 'Оптимальный',
			price: '18 000 ₽',
			duration: 'месяц',
			description: '12 персональных тренировок',
			features: ['3 тренировки в неделю', 'Индивидуальная программа', 'План питания с КБЖУ', 'Чат поддержка 24/7', 'Видео-отчеты'],
			color: 'orange',
		},
		{
			name: 'VIP',
			price: '25 000 ₽',
			duration: 'месяц',
			description: 'Полное сопровождение',
			features: ['Неограниченное количество тренировок', 'Выезд к клиенту', 'Персональный план питания', 'VIP поддержка 24/7', 'Анализ состава тела', 'Спортивное питание в подарок'],
			color: 'black',
		},
	]

	// Маппинг цветов для Tailwind классов
	const colorClasses = {
		gray: {
			bg: 'bg-gray-800',
			bgHover: 'hover:bg-gray-900',
			badge: 'bg-gray-700',
		},
		orange: {
			bg: 'bg-orange-500',
			bgHover: 'hover:bg-orange-600',
			badge: 'bg-orange-600',
		},
		black: {
			bg: 'bg-black',
			bgHover: 'hover:bg-gray-900',
			badge: 'bg-gray-800',
		},
	}

	return (
		<div className='min-h-screen bg-gray-50 py-16'>
			<div className='container mx-auto px-6'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Цены на <span className='text-orange-500'>услуги</span>
					</h1>
					<p className='text-xl text-gray-600'>Прозрачные цены без скрытых платежей. Выберите подходящий пакет.</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
					{packages.map((pkg, idx) => (
						<div key={idx} className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${pkg.popular ? 'border-2 border-orange-500 relative' : ''}`}>
							{/* Бейдж "Популярный" */}
							{pkg.popular && (
								<div className='absolute top-4 right-4 z-10'>
									<span className='bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full'>Популярный</span>
								</div>
							)}

							{/* Хедер карточки с правильными цветами */}
							<div className={`${colorClasses[pkg.color].bg} text-white p-6 text-center`}>
								<h3 className='text-xl font-bold mb-1'>{pkg.name}</h3>
								<div className='text-3xl font-bold mb-1'>{pkg.price}</div>
								<div className='text-sm opacity-90'>{pkg.duration}</div>
							</div>

							{/* Тело карточки */}
							<div className='p-6'>
								<p className='text-gray-600 mb-4'>{pkg.description}</p>
								<ul className='space-y-2 mb-6'>
									{pkg.features.map((feature, fIdx) => (
										<li key={fIdx} className='flex items-start'>
											<span className='text-green-500 mr-2 font-bold'>✓</span>
											<span className='text-sm text-gray-700'>{feature}</span>
										</li>
									))}
								</ul>
								<Link
									href='/contacts'
									className={`block w-full text-center py-2.5 rounded-lg font-semibold transition-all duration-300 ${
										pkg.popular ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
									}`}>
									Выбрать
								</Link>
							</div>
						</div>
					))}
				</div>

				{/* Скидки */}
				<div className='mt-12 max-w-3xl mx-auto'>
					<div className='bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 text-center shadow-xl'>
						<h3 className='text-2xl font-bold mb-2'>Специальные предложения</h3>
						<p className='text-lg mb-4'>
							При оплате 3 месяцев — скидка 10%
							<br />
							Приведи друга — получи 2 бесплатные тренировки
						</p>
						<Link href='/contacts' className='inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg'>
							Узнать подробнее
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
