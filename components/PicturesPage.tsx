'use client';
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import axios from 'axios';
import { CarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
const PicturesPage = () => {
    const { brand, name } = useParams();
    const router = useRouter();
    const [car, setCar] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedtab, setSelectedTab] = useState<'description' | 'overview' | 'images' | 'pros&cons' | 'reviews'>('description');
    const getCars = async()=> {
    try{
      const response = await axios.get(`/api/managemodels/${brand?.toString().replace(/-/g, ' ')}/${name?.toString().replace(/-/g, ' ')}`);
      if(response.status === 200){
        setCar(response.data.car);
        console.log(response.data.car);
      }
    }catch(error){
      console.error(error);
    }
      setLoading(false);
  }
  useEffect(() => {
    getCars();
  }, []);

  if(loading){
    return (
        <div>Loading...</div>
    )
  }
  return (
    <div className='mb-4'>
      <div>
        <div className="mb-6 flex lg:flex-row flex-col gap-2 bg-gray-100 p-4">
            <div>
            <div className="relative lg:w-96 lg:h-60 rounded-xl overflow-hidde">
              <>
              {car?.images?.length > 0 ? (
                <img
                  src={(car?.images[activeIndex] || car?.images[0])}
                  alt={`${car.modelName} image ${activeIndex + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className='w-full h-[360px] md:h-[460px] flex items-center justify-center '>
                  <CarIcon className='w-20 h-20'/>
                </div>
              )}
              </>
          </div>
        </div>

        <div>
        <p className="text-slate-600 mb-2 px-4">{car?.brand?.charAt(0).toUpperCase() + car?.brand?.slice(1)} • {car.bodyType == 'suv' ? 'SUV' : car?.bodyType?.charAt(0).toUpperCase() + car?.bodyType?.slice(1)}</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 px-4">{car?.modelName?.charAt(0).toUpperCase() + car?.modelName?.slice(1)}</h1>

        <div className='flex items-center gap-4 px-4'>
          <div className='flex items-center gap-1'>
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.14629 9.64624L13.1463 3.64624C13.1927 3.59979 13.2479 3.56294 13.3086 3.5378C13.3693 3.51265 13.4343 3.49971 13.5 3.49971C13.5657 3.49971 13.6308 3.51265 13.6915 3.5378C13.7522 3.56294 13.8073 3.59979 13.8538 3.64624C13.9002 3.6927 13.9371 3.74785 13.9622 3.80854C13.9874 3.86924 14.0003 3.93429 14.0003 3.99999C14.0003 4.06569 13.9874 4.13074 13.9622 4.19144C13.9371 4.25214 13.9002 4.30729 13.8538 4.35374L7.85379 10.3537C7.80733 10.4002 7.75218 10.437 7.69148 10.4622C7.63079 10.4873 7.56573 10.5003 7.50004 10.5003C7.43434 10.5003 7.36928 10.4873 7.30859 10.4622C7.24789 10.437 7.19274 10.4002 7.14629 10.3537C7.09983 10.3073 7.06298 10.2521 7.03784 10.1914C7.0127 10.1307 6.99976 10.0657 6.99976 9.99999C6.99976 9.93429 7.0127 9.86924 7.03784 9.80854C7.06298 9.74785 7.09983 9.6927 7.14629 9.64624ZM8.00004 5.49999C8.43435 5.49944 8.86585 5.56974 9.27754 5.70812C9.34004 5.73028 9.40633 5.73978 9.47254 5.73608C9.53876 5.73237 9.60357 5.71553 9.66322 5.68654C9.72286 5.65755 9.77614 5.61698 9.81995 5.56719C9.86377 5.51741 9.89724 5.45941 9.91842 5.39657C9.9396 5.33372 9.94807 5.26729 9.94334 5.20114C9.9386 5.135 9.92075 5.07045 9.89083 5.01127C9.86091 4.95208 9.81951 4.89944 9.76905 4.85641C9.71859 4.81338 9.66008 4.78082 9.59691 4.76062C8.80011 4.492 7.94844 4.42866 7.12067 4.57647C6.2929 4.72429 5.51579 5.07847 4.8612 5.60626C4.20662 6.13406 3.69571 6.81841 3.37575 7.59601C3.05578 8.37361 2.93709 9.21935 3.03066 10.055C3.04419 10.1772 3.10227 10.2902 3.19382 10.3722C3.28536 10.4543 3.40395 10.4998 3.52691 10.5C3.54504 10.5 3.56379 10.5 3.58254 10.4969C3.7143 10.4823 3.83488 10.4159 3.91774 10.3124C4.0006 10.2089 4.03897 10.0768 4.02441 9.94499C4.00814 9.79722 4 9.64866 4.00004 9.49999C4.00119 8.43948 4.42299 7.42274 5.17289 6.67284C5.92278 5.92295 6.93952 5.50115 8.00004 5.49999ZM14.2338 6.31249C14.2038 6.25405 14.1627 6.20209 14.1126 6.15956C14.0626 6.11704 14.0046 6.08478 13.9421 6.06465C13.8796 6.04451 13.8138 6.03688 13.7483 6.04219C13.6829 6.04751 13.6191 6.06566 13.5607 6.09562C13.5022 6.12557 13.4503 6.16675 13.4077 6.21679C13.3652 6.26683 13.333 6.32476 13.3128 6.38726C13.2927 6.44977 13.285 6.51563 13.2904 6.58108C13.2957 6.64654 13.3138 6.7103 13.3438 6.76874C13.7137 7.49516 13.9321 8.28918 13.9859 9.10259C14.0396 9.91601 13.9275 10.7319 13.6563 11.5006L2.33754 11.4962C2.02174 10.591 1.9269 9.6234 2.06093 8.67408C2.19496 7.72476 2.55397 6.82123 3.10804 6.03881C3.66211 5.25639 4.39518 4.61775 5.24614 4.17612C6.0971 3.73449 7.0413 3.50267 8.00004 3.49999H8.05504C8.98624 3.50585 9.90301 3.73065 10.7313 4.15624C10.7899 4.18849 10.8544 4.20866 10.9209 4.21554C10.9874 4.22243 11.0547 4.2159 11.1186 4.19633C11.1826 4.17677 11.242 4.14457 11.2933 4.10164C11.3446 4.05872 11.3867 4.00593 11.4172 3.94642C11.4478 3.88691 11.4661 3.82188 11.471 3.75517C11.4759 3.68847 11.4675 3.62145 11.446 3.55809C11.4246 3.49472 11.3907 3.4363 11.3463 3.38628C11.3019 3.33626 11.2479 3.29565 11.1875 3.26687C9.94064 2.62819 8.53078 2.37836 7.14035 2.54967C5.74991 2.72099 4.44286 3.30557 3.38828 4.22781C2.3337 5.15005 1.58011 6.3675 1.22498 7.72269C0.869846 9.07788 0.929523 10.5085 1.39629 11.8294C1.46523 12.0251 1.5931 12.1946 1.76232 12.3147C1.93154 12.4348 2.13379 12.4995 2.34129 12.5H13.6582C13.8655 12.5001 14.0678 12.4358 14.237 12.3158C14.4062 12.1959 14.534 12.0263 14.6025 11.8306C14.9179 10.9337 15.0478 9.98205 14.9844 9.03341C14.921 8.08476 14.6657 7.15887 14.2338 6.31187V6.31249Z" fill="#696665"/>
            </svg>
            <div>{(() => {
                  const min = Math.min(...car.variant.map((v: any) => v?.fuelAndPerformance.petrolMileageARAI));
                  const max = Math.max(...car.variant.map((v: any) => v?.fuelAndPerformance.petrolMileageARAI));
                  return <p>{min} - {max}km</p>;
            })()}</div>
          </div>

          <div className='flex items-center gap-1'>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.125 10C7.93958 10 7.75833 9.94502 7.60416 9.842C7.44999 9.73899 7.32982 9.59257 7.25887 9.42126C7.18791 9.24996 7.16934 9.06146 7.20552 8.8796C7.24169 8.69775 7.33098 8.5307 7.46209 8.39959C7.5932 8.26848 7.76025 8.17919 7.94211 8.14301C8.12396 8.10684 8.31246 8.12541 8.48377 8.19636C8.65507 8.26732 8.80149 8.38748 8.90451 8.54165C9.00752 8.69582 9.0625 8.87708 9.0625 9.0625C9.0625 9.31114 8.96373 9.5496 8.78792 9.72541C8.6121 9.90123 8.37364 10 8.125 10ZM16.25 8.125C16.25 9.73197 15.7735 11.3029 14.8807 12.639C13.9879 13.9752 12.719 15.0166 11.2343 15.6315C9.74966 16.2465 8.11599 16.4074 6.5399 16.0939C4.9638 15.7804 3.51606 15.0065 2.37976 13.8702C1.24346 12.7339 0.469628 11.2862 0.156123 9.71011C-0.157382 8.13401 0.00352044 6.50035 0.618482 5.0157C1.23344 3.53105 2.27485 2.2621 3.611 1.36931C4.94714 0.476523 6.51803 0 8.125 0C10.2792 0.00227486 12.3445 0.85903 13.8677 2.38227C15.391 3.90551 16.2477 5.97081 16.25 8.125ZM1.25 8.125V8.15078C3.16963 6.52021 5.60632 5.625 8.125 5.625C10.6437 5.625 13.0804 6.52021 15 8.15078V8.125C15 6.30164 14.2757 4.55295 12.9864 3.26364C11.6971 1.97433 9.94837 1.25 8.125 1.25C6.30164 1.25 4.55296 1.97433 3.26364 3.26364C1.97433 4.55295 1.25 6.30164 1.25 8.125ZM6.52344 14.8109L5.19141 11.25H2.00235C2.45537 12.1339 3.09381 12.9096 3.87406 13.5241C4.65432 14.1387 5.55802 14.5776 6.52344 14.8109ZM8.125 15C8.18985 15 8.25469 15 8.31954 15L9.8875 10.8148C9.97749 10.5767 10.1378 10.3715 10.3471 10.2265C10.5564 10.0816 10.8048 10.0036 11.0594 10.0031H14.7406C14.7703 9.90078 14.7969 9.79687 14.8188 9.69062C13.9459 8.80008 12.9042 8.09261 11.7545 7.60964C10.6049 7.12667 9.37042 6.8779 8.12344 6.8779C6.87647 6.8779 5.64202 7.12667 4.49237 7.60964C3.34273 8.09261 2.30098 8.80008 1.42813 9.69062C1.45235 9.79531 1.47891 9.89922 1.50625 10.0031H5.19141C5.44608 10.0038 5.69452 10.0819 5.9038 10.227C6.11309 10.3721 6.27333 10.5774 6.36328 10.8156L7.92578 15C7.99297 15 8.0586 15 8.125 15ZM14.2477 11.25H11.0586L9.72344 14.8117C10.6895 14.5788 11.5939 14.1399 12.3747 13.5252C13.1556 12.9105 13.7944 12.1344 14.2477 11.25Z" fill="#B6B6B6"/>
            </svg>
            <div>
              {car?.variant[0]?.engineAndTransmission.driveType}
            </div>
          </div>
        </div>

        {/* Quick actions panel after description */}
        {car?.variant?.length > 0 && (
          <div className="rounded-2xl overflow-hidden">
            <div className="grid gap-0">
              <div className="p-4">
                {(() => {
                  const min = Math.min(...car?.variant.map((v: any) => v.price));
                  const max = Math.max(...car?.variant.map((v: any) => v.price));
                  return <p className="text-2xl font-bold text-[#FF7101]">₹{(min/100000).toFixed(2)} - {(max/100000).toFixed(2)} Lakh</p>;
                })()}
                <p className="text-xs text-gray-600 mb-1">On-Road Price</p>
                <div id='overview' className="mt-3 flex items-center gap-3">
                  {/* <button onClick={() => setEmiOpen(true)} className="text-blue-600 hover:underline">EMI Calculator</button> */}
                  <button className="px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">Get Offers</button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        </div>
        {/* <div className='flex justify-center gap-2 lg:gap-10 my-4 overflow-x-auto'>
          <button onClick={()=> {setSelectedTab('description'); router.push('#description')}} className={`px-4 w-36 lg:w-40 py-3 ${selectedtab == 'description' ? 'bg-[#FF7101] text-white border-none' : 'border'} rounded-4xl hover:bg-[#FF7101] hover:text-white hover:border-none`}>Description</button>
          <button onClick={()=> {setSelectedTab('overview'); router.push('#overview')}} className={`px-4 w-36 py-3 lg:w-40 ${selectedtab == 'overview' ? 'bg-[#FF7101] text-white border-none' : 'border'} rounded-4xl hover:bg-[#FF7101] hover:text-white hover:border-none`}>Overview</button>
          <button onClick={()=> {setSelectedTab('images'); router.push(`${car.modelName}/pictures`)}} className={`px-4 w-36 py-3 lg:w-40 ${selectedtab == 'images' ? 'bg-[#FF7101] text-white border-none' : 'border'} rounded-4xl hover:bg-[#FF7101] hover:text-white hover:border-none`}>Images</button>
          <button onClick={()=> {setSelectedTab('pros&cons'); router.push('#pros&cons')}} className={`px-4 w-36 py-3 lg:w-40 ${selectedtab == 'pros&cons' ? 'bg-[#FF7101] text-white border-none' : 'border'} rounded-4xl hover:bg-[#FF7101] hover:text-white hover:border-none`}>Pros & Cons</button>
          <button onClick={()=> {setSelectedTab('reviews'); router.push('#reviews')}} className={`px-4 w-36 py-3 lg:w-40 ${selectedtab == 'reviews' ? 'bg-[#FF7101] text-white border-none' : 'border'} rounded-4xl hover:bg-[#FF7101] hover:text-white hover:border-none`}>Reviews</button>
        </div> */}

        <div className='lg:p-4 p-2 border lg:mx-10 rounded-2xl'>
            <h2 className='text-2xl font-medium'>Exterior Images</h2>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-4'>
                {car.exteriorImages.map((src: string, index: number)=> (
                    <img key={index} src={src} alt={car.modelName} className='h-52' />
                ))}
            </div>
        </div>

        <div className='lg:p-4 p-2 border lg:mx-10 rounded-2xl mt-4'>
            <h2 className='text-2xl font-medium'>Interior Images</h2>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-4'>
                {car.interiorImages.map((src: string, index: number)=> (
                    <img key={index} src={src} alt={car.modelName} className='h-52' />
                ))}
            </div>
        </div>


      </div>
    </div>
  )
}

export default PicturesPage
