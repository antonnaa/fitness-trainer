export default function Reviews() {
	const reviews = [
		{
			name: 'Анна Петрова',
			goal: 'Снижение веса',
			result: '-12 кг за 4 месяца',
			text: 'Обратилась к тренеру с целью похудеть после родов. За 4 месяца не только сбросила лишний вес, но и полюбила спорт. Тренировки всегда разнообразные, питание вкусное и сытное. Очень благодарна за результат!',
			rating: 5,
			date: 'Январь 2026',
		},
		{
			name: 'Михаил Иванов',
			goal: 'Набор мышечной массы',
			result: '+8 кг мышц за 6 месяцев',
			text: 'До начала занятий был очень худым, не мог набрать вес. Тренер составил грамотную программу тренировок и питания. Результат превзошел ожидания — набрал 8 кг качественной массы, стал увереннее в себе.',
			rating: 5,
			date: 'Декабрь 2025',
		},
		{
			name: 'Елена Смирнова',
			goal: 'Общая физическая подготовка',
			result: 'Улучшение самочувствия и тонуса',
			text: 'Пришла с проблемами в спине от сидячей работы. Тренер подобрал специальные упражнения, которые помогли укрепить мышцы спины. Теперь чувствую себя намного лучше, прошли боли, появилась энергия!',
			rating: 5,
			date: 'Февраль 2026',
		},
		{
			name: 'Дмитрий Козлов',
			goal: 'Подготовка к марафону',
			result: 'Пробежал первый марафон',
			text: 'Готовился к первому марафону под руководством тренера. Профессиональный подход, грамотное распределение нагрузок, восстановление. В итоге не только финишировал, но и показал хорошее время!',
			rating: 5,
			date: 'Март 2026',
		},
		{
			name: 'Ольга Николаева',
			goal: 'Реабилитация после травмы',
			result: 'Полное восстановление за 3 месяца',
			text: 'После травмы колена боялась возвращаться к тренировкам. Тренер разработал программу реабилитации с постепенным увеличением нагрузок. Сейчас чувствую себя даже лучше, чем до травмы!',
			rating: 5,
			date: 'Апрель 2026',
		},
		{
			name: 'Александр Волков',
			goal: 'Коррекция фигуры',
			result: '-8% жира, +5 кг мышц',
			text: 'Хотел подтянуть фигуру к лету. Тренер предложил комплексный подход: тренировки + питание. За 3 месяца тело полностью преобразилось. Продолжаю заниматься дальше!',
			rating: 5,
			date: 'Май 2026',
		},
	]

	return (
		<div className='min-h-screen bg-gray-50 py-16'>
			<div className='container mx-auto px-6'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Отзывы моих <span className='text-orange-500'>клиентов</span>
					</h1>
					<p className='text-xl text-gray-600'>Истории реальных людей, которые достигли своих целей</p>
				</div>

				{/* Статистика */}
				<div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12'>
					{[
						{ value: '4.9', label: 'Средняя оценка', icon: '⭐' },
						{ value: '100%', label: 'Довольных клиентов', icon: '😊' },
						{ value: '50+', label: 'Отзывов', icon: '📝' },
					].map((stat, idx) => (
						<div key={idx} className='bg-white rounded-xl p-6 text-center shadow'>
							<div className='text-3xl mb-2'>{stat.icon}</div>
							<div className='text-3xl font-bold text-orange-500'>{stat.value}</div>
							<div className='text-gray-600'>{stat.label}</div>
						</div>
					))}
				</div>

				{/* Сетка отзывов */}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
					{reviews.map((review, idx) => (
						<div key={idx} className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-xl mr-4'>{review.name.charAt(0)}</div>
								<div>
									<h3 className='font-bold text-gray-900'>{review.name}</h3>
									<p className='text-sm text-gray-500'>{review.date}</p>
								</div>
							</div>
							<div className='flex mb-3'>
								{[...Array(review.rating)].map((_, i) => (
									<span key={i} className='text-yellow-400 text-lg'>
										★
									</span>
								))}
							</div>
							<div className='mb-3'>
								<span className='inline-block bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full mr-2'>{review.goal}</span>
								<span className='inline-block bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full'>{review.result}</span>
							</div>
							<p className='text-gray-700'>{review.text}</p>
						</div>
					))}
				</div>

				{/* Оставить отзыв */}
				<div className='mt-16 text-center'>
					<a href='/contacts' className='inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition'>
						Оставить свой отзыв
					</a>
				</div>
			</div>
		</div>
	)
}
