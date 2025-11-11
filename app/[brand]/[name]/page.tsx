'use client';
import { CarDetail } from '@/components/CarDetail'
import axios from 'axios';
import { Car } from '@/types/Car';
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";

const CarDetails = () => {
  const [car, setCar] = useState<Car>({} as Car);
  const { brand, name } = useParams();

    useEffect(()=> {
        const getCar = async() => {
            try{
              const response = await axios.get(`/api/getcarbybrandandname/${brand?.toString().replace(/-/g, ' ')}/${name?.toString().replace(/-/g, ' ')}`);
              if(response.status === 200){
                setCar(response.data.car);
              }
            }catch(error){
                console.error('Error fetching car details : ', error);
            }
        }
        getCar();
    },[])
  return (
    <div>
      <CarDetail car={car} />
    </div>
  )
}

export default CarDetails
