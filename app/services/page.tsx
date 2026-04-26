import Link from 'next/link'

export default function Services() {
	const services = [
		{
			title: 'Персональные тренировки',
			price: 'от 2000 ₽',
			description: 'Индивидуальные занятия с учетом ваших целей и физической подготовки',
			features: ['Составление программы тренировок', 'Контроль техники выполнения', 'Коррекция программы каждые 2 недели', 'Доступ к видео-урокам'],
			icon: '💪',
			popular: true,
		},
		{
			title: 'Онлайн-ведение',
			price: 'от 5000 ₽/мес',
			description: 'Полное сопровождение онлайн: тренировки и питание',
			features: ['Индивидуальный план тренировок', 'План питания с расчетом КБЖУ', 'Еженедельная корректировка', 'Чат поддержка 24/7', 'Видео-отчеты и контроль'],
			icon: '🌐',
			popular: false,
		},
		{
			title: 'Составление программы',
			price: 'от 3000 ₽',
			description: 'Разработка индивидуальной программы тренировок',
			features: ['Программа на 4-8 недель', 'Видео-демонстрация упражнений', 'Рекомендации по питанию', '1 консультация по программе'],
			icon: '📋',
			popular: false,
		},
		{
			title: 'Консультация по питанию',
			price: '1500 ₽',
			description: 'Разбор вашего рациона и составление плана питания',
			features: ['Анализ текущего питания', 'Расчет КБЖУ', 'Примерное меню на неделю', 'Рекомендации по добавкам'],
			icon: '🥗',
			popular: false,
		},
	]

	return (
		<div className='min-h-screen bg-gray-50 py-16'>
			<div className='container mx-auto px-6'>
				{/* Заголовок */}
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Услуги и <span className='text-orange-500'>цены</span>
					</h1>
					<p className='text-xl text-gray-600'>Выберите подходящий формат работы. Все программы адаптируются индивидуально под ваши цели.</p>
				</div>

				{/* Карточки услуг */}
				<div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
					{services.map((service, idx) => (
						<div key={idx} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${service.popular ? 'border-2 border-orange-500 relative' : ''}`}>
							{service.popular && <div className='absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>Популярное</div>}
							<div className='p-8'>
								<div className='text-5xl mb-4'>{service.icon}</div>
								<h3 className='text-2xl font-bold mb-2'>{service.title}</h3>
								<p className='text-orange-500 text-xl font-semibold mb-4'>{service.price}</p>
								<p className='text-gray-600 mb-6'>{service.description}</p>
								<ul className='space-y-3 mb-8'>
									{service.features.map((feature, fIdx) => (
										<li key={fIdx} className='flex items-start'>
											<span className='text-green-500 mr-2'>✓</span>
											<span className='text-gray-700'>{feature}</span>
										</li>
									))}
								</ul>
								<Link href='/auth/register' className='block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition'>
									Выбрать
								</Link>
							</div>
						</div>
					))}
				</div>

				{/* Дополнительная информация */}
				<div className='mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto'>
					<h3 className='text-2xl font-bold mb-6 text-center'>Как проходит работа</h3>
					<div className='grid md:grid-cols-4 gap-6'>
						{[
							{
								step: '1',
								title: 'Заявка',
								desc: 'Оставляете заявку на сайте',
							},
							{
								step: '2',
								title: 'Консультация',
								desc: 'Обсуждаем цели и возможности',
							},
							{
								step: '3',
								title: 'Программа',
								desc: 'Составляю индивидуальный план',
							},
							{
								step: '4',
								title: 'Результат',
								desc: 'Достигаем цели вместе',
							},
						].map((item, idx) => (
							<div key={idx} className='text-center'>
								<div className='w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3'>{item.step}</div>
								<h4 className='font-semibold mb-1'>{item.title}</h4>
								<p className='text-sm text-gray-600'>{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
