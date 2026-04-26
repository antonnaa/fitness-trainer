import Link from 'next/link'

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section className='relative bg-gray-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/50 z-10'></div>
				<div className='relative z-20 container mx-auto px-6 py-24 md:py-32 flex flex-col items-start'>
					<h1 className='text-5xl md:text-7xl font-bold max-w-3xl'>
						Трансформируй свое тело <br />
						<span className='text-orange-500'>с профессионалом</span>
					</h1>
					<p className='text-xl text-gray-300 mt-6 max-w-xl'>Индивидуальный план питания и тренировок. Бесплатная консультация и расчет КБЖУ в личном кабинете.</p>
					<div className='mt-10 flex space-x-4'>
						<Link href='/auth/register' className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition'>
							Попробовать бесплатно
						</Link>
						<Link href='/about' className='border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition'>
							Узнать больше
						</Link>
					</div>
				</div>
			</section>

			{/* Преимущества */}
			<section className='container mx-auto px-6 py-16'>
				<h2 className='text-3xl font-bold text-center mb-12'>Почему выбирают меня</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					{[
						{ title: 'Научный подход', desc: 'Расчет БЖУ под ваш метаболизм' },
						{ title: 'Онлайн 24/7', desc: 'Чат поддержка в личном кабинете' },
						{ title: 'Без жестких диет', desc: 'Едим вкусно и достигаем цели' },
					].map((item, idx) => (
						<div key={idx} className='bg-white p-6 rounded-xl shadow-lg border text-center'>
							<div className='text-orange-500 text-4xl mb-4'>⚡</div>
							<h3 className='text-xl font-bold mb-2'>{item.title}</h3>
							<p className='text-gray-600'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>
		</>
	)
}
