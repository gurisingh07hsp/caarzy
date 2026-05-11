import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import React from 'react'

const PopularQuestions = () => {
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };
  return (
    <section className='relative'>
        <div className='absolute lg:w-[93%] lg:top-0 lg:ms-12 px-4 w-full flex md:flex-row flex-col justify-between md:items-center'>
            <div>
                <h2 className='lg:text-5xl text-2xl font-bold mt-10'>Popular Questions</h2>
                <div className='mt-10 lg:mx-0 mx-auto space-y-3 text-sm lg:text-lg'>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            What information can I check on Caarzy? 
                            {expandedIndex == 0 ? (
                                <Minus onClick={()=> toggleExpand(0)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(0)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 0 && (
                            <p className='text-sm mt-2'>Compare on-road prices, mileage, specifications, features, colours, variants, and all other essential car-related information.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Does Caarzy show on-road car prices? 
                            {expandedIndex == 1 ? (
                                <Minus onClick={()=> toggleExpand(1)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(1)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 1 && (
                            <p className='text-sm mt-2'>Yes, Caarzy provides estimated on-road prices that include registration, insurance, and other applicable charges for better price transparency.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Can I compare multiple cars at the same time? 
                            {expandedIndex == 2 ? (
                                <Minus onClick={()=> toggleExpand(2)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(2)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 2 && (
                            <p className='text-sm mt-2'>Absolutely. With Caarzy, you can compare cars side by side to find the best option for you between price, features, mileage, and performance.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Does Caarzy include mileage and fuel efficiency details? 
                            {expandedIndex == 3 ? (
                                <Minus onClick={()=> toggleExpand(3)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(3)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 3 && (
                            <p className='text-sm mt-2'>Yes, you get to see mileage, fuel and engine related details and other performance specs of every listing to make informed choices</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Can I check available car colors and variants?
                            {expandedIndex == 4 ? (
                                <Minus onClick={()=> toggleExpand(4)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(4)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 4 && (
                            <p className='text-sm mt-2'>Yes, you can check other colour options and variants for each car model with its price and feature differences.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Is Caarzy free to use?
                            {expandedIndex == 5 ? (
                                <Minus onClick={()=> toggleExpand(5)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(5)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 5 && (
                            <p className='text-sm mt-2'>Yes, Caarzy is completely free to use for researching, comparing, and exploring cars online.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            How often is the car information updated?
                            {expandedIndex == 6 ? (
                                <Minus onClick={()=> toggleExpand(6)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(6)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 6 && (
                            <p className='text-sm mt-2'>We update the pricing, specifications and details of the vehicles at regular intervals to ensure users get the latest available information.</p>
                        )}
                    </div>
                    <div className='bg-white px-4 lg:py-4 py-1 lg:w-[650px] md:w-[350px]'>
                        <p className='flex justify-between items-center font-semibold'>
                            Can beginners use Caarzy easily?
                            {expandedIndex == 7 ? (
                                <Minus onClick={()=> toggleExpand(7)} className='main-text-color cursor-pointer' size={28}/>
                            )  : (
                                <Plus onClick={()=> toggleExpand(7)} className='main-text-color cursor-pointer' size={28}/>
                            )}
                        </p>
                        {expandedIndex === 7 && (
                            <p className='text-sm mt-2'>Definitely. Caarzy is designed with a clean and simple interface so anyone can compare and research cars without confusion.</p>
                        )}
                    </div>
                </div>
            </div>

            <img src='./popularQuestion.png' className='lg:w-[600px] mx-auto w-72 md:h-[300px] lg:h-[630px] mt-28'/>
        </div>
        <svg className='w-full hidden md:block' viewBox="0 0 1917 1110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C0 11.1929 11.1929 0 25 0H1139.01C1142.31 0 1145.56 0.649874 1148.6 1.91233L1393.4 103.588C1396.44 104.85 1399.69 105.5 1402.99 105.5H1895C1908.81 105.5 1920 116.693 1920 130.5V1085C1920 1098.81 1908.81 1110 1895 1110H943.628C941.222 1110 938.829 1109.65 936.522 1108.97L731.478 1048.18C729.171 1047.5 726.778 1047.15 724.372 1047.15H25C11.1929 1047.15 0 1035.96 0 1022.15V25Z" fill="#F6F6F6"/>
        </svg>

        <div className='w-full h-[1050px] bg-[#F6F6F6] md:hidden block'></div>
    </section>
  )
}

export default PopularQuestions
