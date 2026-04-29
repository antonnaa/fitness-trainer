import Image from 'next/image'

export default function About() {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20'>
				<div className='container mx-auto px-6'>
					<div className='max-w-3xl'>
						<h1 className='text-5xl md:text-6xl font-bold mb-4'>
							Привет, я <span className='text-orange-500'>Антон</span>
						</h1>
						<p className='text-xl text-gray-300 mb-8'>Профессиональный тренер с опытом работы более 2 лет. Помогаю людям достигать их целей через научный подход к тренировкам и питанию.</p>
					</div>
				</div>
			</section>

			{/* Основная информация */}
			<section className='container mx-auto px-6 py-16'>
				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<h2 className='text-3xl font-bold mb-6'>Моя история</h2>
						<div className='space-y-4 text-gray-700'>
							<p>Мой путь в фитнесе начался 9 лет назад, когда я впервые пришел в зал. С тех пор спорт стал неотъемлемой частью моей жизни.</p>
							<p>Я прошел курсы профессиональной переквалификации в "FPA - Ассоциация профессионалов фитнеса" по специальности "Персональный фитнес тренер".</p>
							<p>Моя философия тренировок основана на индивидуальном подходе. Я убежден, что не существует универсальной программы — каждому нужен свой путь к результату.</p>
							<p>За время работы я помог более 100 клиентам изменить свою жизнь: кто-то сбросил вес, кто-то набрал мышечную массу, а кто-то просто стал чувствовать себя лучше.</p>
						</div>
					</div>
					<div className='bg-white p-8 rounded-2xl shadow-lg'>
						<h3 className='text-2xl font-bold mb-6 text-center'>Мои квалификации</h3>
						<div className='space-y-4'>
							{[
								{
									title: 'Персональный фитнес тренер',
									desc: 'Сертификация FPA',
								},
								{
									title: 'Фитнес-нутрициолог',
									desc: 'Сертификация FPA',
								},
								{
									title: 'Реабилитационный тренинг',
									desc: 'Сертификация FPA',
								},
								{
									title: 'Опыт работы',
									desc: '3 года в индустрии фитнеса',
								},
							].map((item, idx) => (
								<div key={idx} className='border-l-4 border-orange-500 pl-4'>
									<h4 className='font-semibold text-gray-900'>{item.title}</h4>
									<p className='text-gray-600 text-sm'>{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Достижения */}
			<section className='bg-white py-16'>
				<div className='container mx-auto px-6'>
					<h2 className='text-3xl font-bold text-center mb-12'>Результаты моих клиентов</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						{[
							{
								stat: '100+',
								label: 'Довольных клиентов',
								icon: '👥',
							},
							{
								stat: '1000+',
								label: 'Проведенных тренировок',
								icon: '💪',
							},
							{
								stat: '95%',
								label: 'Достигают цели за 3 месяца',
								icon: '🎯',
							},
						].map((item, idx) => (
							<div key={idx} className='text-center p-8 bg-gray-50 rounded-2xl'>
								<div className='text-5xl mb-4'>{item.icon}</div>
								<div className='text-4xl font-bold text-orange-500 mb-2'>{item.stat}</div>
								<div className='text-gray-600'>{item.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Призыв к действию */}
			<section className='bg-orange-500 text-white py-16'>
				<div className='container mx-auto px-6 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>Готовы начать свой путь к идеальному телу?</h2>
					<p className='text-xl mb-8 opacity-90'>Запишитесь на бесплатную консультацию прямо сейчас</p>
					<a href='/contacts' className='inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition'>
						Записаться
					</a>
				</div>
			</section>
		</div>
	)
}
