import Button from '../components/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className='flex flex-col items-center justify-center py-24'>
        <h1 className='text-center text-6xl font-extrabold leading-tight text-gray-800 dark:text-white'>
          A <span className='text-blue-500'>Booster</span>
          <br />
          to Your NextJS Apps
        </h1>
        <div className='my-6 px-4 md:px-20 text-center text-xl text-gray-600 dark:text-gray-300 max-w-3xl'>
          An approachable, performant and versatile boilerplate for building SSR applications.
        </div>
        <div className='mt-6 flex flex-row gap-4'>
          <Link href="/auth/login">
            <button className="px-6 py-3 bg-teal-500 text-white rounded font-medium hover:bg-teal-600 transition-colors">
              Use Template
            </button>
          </Link>

        </div>
      </section>
      <section className='bg-sky-100 dark:bg-gray-800 py-20 max-lg:py-10'>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-10 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='text-center p-6'>
            <h2 className='mb-3 text-xl font-semibold text-gray-800 dark:text-white'>Approachable</h2>
            <p className='text-gray-600 dark:text-gray-300 max-lg:max-w-[500px]'>
              Add components without sending additional client-side JavaScript. Built on the latest React features.
            </p>
          </div>
          <div className='text-center p-6'>
            <h2 className='mb-3 text-xl font-semibold text-gray-800 dark:text-white'>Versatile</h2>
            <p className='text-gray-600 dark:text-gray-300 max-lg:max-w-[500px]'>
              Automatic Image, Font, and Script Optimizations for improved UX and Core Web Vitals.
            </p>
          </div>
          <div className='text-center p-6'>
            <h2 className='mb-3 text-xl font-semibold text-gray-800 dark:text-white'>Performant</h2>
            <p className='text-gray-600 dark:text-gray-300 max-lg:max-w-[500px]'>
              A rich, incredibly adoptable template that scales between a small showcase website and a full-size app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
