import React from 'react'

const HomeFilter = () => {
  return (
    <div className='max-w-7xl h-24 grid lg:grid-cols-4 mx-auto bg-[#F6F6F6] rounded-2xl'>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959]'>Select Brand</label>
        <select className='text-xl'>
            <option value=''>Choose</option>
            <option value=''></option>
            <option value=''></option>
        </select>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959]'>Select Model</label>
        <select className='text-xl'>
            <option value=''>Choose</option>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
        </select>
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
      <div className='ms-8'>
        <button className='w-full h-full bg-[#FF3F25] rounded-r-2xl text-white'>Search Car</button>
      </div>
    </div>
  )
}

export default HomeFilter
