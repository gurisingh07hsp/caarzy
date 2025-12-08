import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const PopularQuestions = () => {
  return (
    <section className='relative'>
        <div className='absolute w-[93%] top-28 ms-12 flex lg:flex-row flex-col justify-between'>
            <div>
                <h2 className='text-5xl font-bold mt-10'>Popular Questions</h2>
                <div className='mt-20 space-y-3 text-lg'>
                    <p className='flex justify-between items-center bg-white px-4 py-6 w-[650px] font-semibold'>What should I consider when buying a used car? <ArrowUpRight className='text-[#FF3F25]' size={28}/></p>
                    <p className='flex justify-between items-center bg-white px-4 py-6 w-[650px] font-semibold'>Do you offer financing options for purchasing a used car? <ArrowUpRight className='text-[#FF3F25]' size={28}/></p>
                    <p className='flex justify-between items-center bg-white px-4 py-6 w-[650px] font-semibold'>Can I trade in my current vehicle when buying a car from Wheeliant? <ArrowUpRight className='text-[#FF3F25]' size={28}/></p>
                    <p className='flex justify-between items-center bg-white px-4 py-6 w-[650px] font-semibold'>Can I test drive the cars before making a purchase? <ArrowUpRight className='text-[#FF3F25]' size={28}/></p>
                    <p className='flex justify-between items-center bg-white px-4 py-6 w-[650px] font-semibold'>What warranties or guarantees do you offer on your vehicles? <ArrowUpRight className='text-[#FF3F25]' size={28}/></p>
                </div>
            </div>

            <img src='./popularQuestion.png' className='w-[600px] h-[630px] mt-5'/>

        </div>
        <svg className='w-full' viewBox="0 0 1917 1110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C0 11.1929 11.1929 0 25 0H1139.01C1142.31 0 1145.56 0.649874 1148.6 1.91233L1393.4 103.588C1396.44 104.85 1399.69 105.5 1402.99 105.5H1895C1908.81 105.5 1920 116.693 1920 130.5V1085C1920 1098.81 1908.81 1110 1895 1110H943.628C941.222 1110 938.829 1109.65 936.522 1108.97L731.478 1048.18C729.171 1047.5 726.778 1047.15 724.372 1047.15H25C11.1929 1047.15 0 1035.96 0 1022.15V25Z" fill="#F6F6F6"/>
        </svg>
    </section>
  )
}

export default PopularQuestions
