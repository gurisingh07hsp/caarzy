'use client';
import React, { useEffect, useState } from 'react'
import { CarDetail } from '@/components/CarDetail'
import axios from 'axios';
import { Model } from '@/types/Car';

const CarDetails = () => {
  // const [car, setCar] = useState<Model | null>(null);
  //   const getCars = async()=> {
  //   console.log('run');
  //     const response = await axios.get(`/api/managemodels/${'hyundai'?.toString().replace(/-/g, ' ')}/${'creta'?.toString().replace(/-/g, ' ')}`);
  //     if(response.status === 200){
  //       setCar(response.data.car);
  //       console.log(response.data.car);
  //     }
  // }
  // useEffect(() => {
  //   getCars();
  //   console.log(car);
  // },[]);
  return (
    <div>
      <CarDetail/>
    </div>
  )
}

export default CarDetails
