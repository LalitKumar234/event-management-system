import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import bg from '../../assets/bg.svg'


export default function Hero() {
  return (
    <section className="relative" style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-4xl md:text-6xl font-medium leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Streamline Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">Resturant</span> Operations with Our SaaS Solution </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm lg:text-lg text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Transform Your Restaurant Experience with our versatile platform, effortlessly managing digital menus, POS transactions, and orders seamlessly.</p>
              <div className="max-w-xs mx-auto sm:max-w-none flex sm:gap-4 justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <Button className='p-6'>
                  <Link href="/register" className="flex items-center">
                    Get started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center relative' data-aos="zoom-y-out" data-aos-delay="150">
            <Image
              src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_6ad54176-8872-4451-b724-e25a65eb963bresturant_dishdashboard.png"
              width={900}
              height={900}
              alt="Dashboard"
            />
            <div className='absolute right-0 bottom-[-20px] lg:bottom-[-10px] animate-bounce-slow-2'>
              <Image
                src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_bb70579e-4427-4d14-aac6-cc1a99320f96resturant_dishaddDIsh.png"
                width={250}
                height={900}
                alt="add dish"
                className="w-[7rem] lg:w-full"
              />
            </div>
            <div className='absolute left-0 bottom-[-20px] lg:bottom-[60px] animate-bounce-slow'>
              <Image
                src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_cab17423-d9d2-4092-baf1-0af5f1e1cd69resturant_dishanalytics.png"
                width={250}
                height={900}
                alt="add dish"
                className="w-[7rem] lg:w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}