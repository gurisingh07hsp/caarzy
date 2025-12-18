'use client';
import { Model } from '@/types/Car'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
const HomeFilter = () => {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  return (
    <div className='max-w-7xl mx-2 lg:h-24 grid md:grid-cols-4 grid-cols-2 lg:mx-auto bg-[#F6F6F6] rounded-2xl'>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959]'>Select Brand</label>
        <select className='text-xl'
        value={brand}
        onChange={(e)=> setBrand(e.target.value)}>
            <option value='' disabled>Choose</option>
            <option value='hyundai'>Hyundai</option>
            <option value='tata'>Tata</option>
            <option value='mahindra'>Mahindra</option>
            <option value='maruti suzuki'>Maruti Suzuki</option>
            <option value='kia'>Kia</option>
            <option value='toyota'>Toyota</option>
            <option value='honda'>Honda</option>
            <option value='nissan'>Nissan</option>
            <option value='isuzu'>Isuzu</option>
            <option value='lexus'>Lexus</option>
            <option value='genesis'>Genesis</option>
            <option value='mercedes-benz'>Mercedes-Benz</option>
            <option value='bmw'>BMW</option>
            <option value='audi'>Audi</option>
            <option value='volkswagen'>Volkswagen</option>
            <option value='skoda'>Skoda</option>
            <option value='porsche'>Porsche</option>
            <option value='renault'>Renault</option>
            <option value='citroen'>Citroen</option>
            <option value='jeep'>Jeep</option>
            <option value='ford'>Ford</option>
            <option value='mg'>MG</option>
            <option value='jaguar'>Jaguar</option>
            <option value='land-rover'>Land Rover</option>
            <option value='fiat'>Fiat</option>
            <option value='byd'>BYD</option>
            <option value='volvo'>Volvo</option>
            <option value='tesla'>Tesla</option>
        </select>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959]'>Enter Model</label>
        <input type="text" className='px-2' value={modelName} onChange={(e)=> setModelName(e.target.value)}/>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959]'>Select Distance</label>
        <select className='text-xl'>
            <option value=''>Choose</option>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
        </select>
      </div>
      <div className='lg:ms-8 ms-4'>
        <button className='w-full h-full bg-[#FF3F25] rounded-r-2xl text-white'
        onClick={()=> router.push(`/${brand}/${modelName.toLowerCase().replace('-',' ')}`)}>Search Car</button>
      </div>
    </div>
  )
}

export default HomeFilter
