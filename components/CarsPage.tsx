'use client'
import React, { useEffect, useState } from 'react'
import { Model } from '@/types/Car'
import axios from 'axios';
import { CarCard } from './CarCard';
import { useParams } from 'next/navigation';
import CarLoadingComponent from './CarLoadingComponent';
const CarsPage = () => {
    const [cars, setCars] = useState<Model[]>([]);
    const {bodyType} = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        const fetchcars = async() => {
            const response = await axios.get(`/api/managemodels`, {params: {bodyType: bodyType?.toString().replace('-', ' ')}});
            if(response.status == 200){
                setCars(response.data.models);
            }
        }
        setLoading(false);
        fetchcars();
    },[])

    if(loading){
        return(
            <CarLoadingComponent/>
        )
    }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-sans">{bodyType?.toString().charAt(0).toUpperCase()}{bodyType?.toString().slice(1).replace('-', ' ')} Cars</h2>
        </div>
        {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
            <CarCard key={car._id} car={car}/>
        ))}
        </div>
        ) : (
            <div>No Car Found</div>
        )}

    </section>
  )
}

export default CarsPage
