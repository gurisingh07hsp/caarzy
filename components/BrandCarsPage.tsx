'use client';
import { useEffect, useState } from 'react'
import { CarCard } from './CarCard'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Model } from '@/types/Car';
import CarLoadingComponent from './CarLoadingComponent';

const BrandCarsPage = () => {
    const [cars, setCars] = useState<Model[]>([]);
    const [UpcomingCars, setUpcomingCars] = useState<Model[]>([]);
    const {brand} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchcars = async() => {
            const response = await axios.get(`/api/managemodels`, {params: {brand: brand?.toString().replace('-', ' ')}});
            if(response.status == 200){
                setCars(response.data.models.filter((car: Model) => car.category !== 'Upcoming Cars'));
                setUpcomingCars(response.data.models.filter((car : Model)=> car.category === 'Upcoming Cars'));
            }
            setLoading(false);
        }
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
        <h2 className="text-3xl font-bold text-slate-900 font-sans">{brand?.toString().charAt(0).toUpperCase()}{brand?.toString().slice(1).replace('-', ' ')} Cars</h2>
        </div>
        {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                <CarCard key={car._id} car={car}/>
            ))}
            </div>
        ) : (
            <div>
                No Car Found
            </div>
        )}
        <div className='mt-14'>
            <h2 className="text-2xl font-bold text-slate-900 font-sans">Upcoming Cars</h2>
            {UpcomingCars.length > 0 ? (
            <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {UpcomingCars.map((car) => (
                    <CarCard key={car._id} car={car}/>
                ))}
            </div>
            ) : (
                <div>
                    No Upcoming Car Found
                </div>
            )}
        </div>
    </section>
  )
}

export default BrandCarsPage
