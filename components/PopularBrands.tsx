import { useRouter } from 'next/navigation'
import { Model } from '@/types/Car';

interface PageProps {
  cars: Model[]
}

const PopularBrands = ({cars}: PageProps) => {
  const router = useRouter();
  return (
    <section className="py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="md:text-3xl text-2xl text-center font-bold text-gray-900">Body Types</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Coupe', count: `${cars.filter((car)=>car.bodyType == 'coupe').length} cars`, image: '/coupelogo.webp' },
              { name: 'MUV', count: `${cars.filter((car)=>car.bodyType == 'muv').length} cars`, image: '/mvplogo.webp' },
              { name: 'Sedan', count: `${cars.filter((car)=>car.bodyType == 'sedan').length} cars`, image: '/sedanlogo.webp' },
              { name: 'Hatchback', count: `${cars.filter((car)=>car.bodyType == 'hatchback').length} cars`, image: '/hatchbacklogo.webp' },
              { name: 'SUV', count: `${cars.filter((car)=>car.bodyType == 'suv').length} cars`, image: '/suvlogo.webp' },
              { name: 'Pickup Truck', count: `${cars.filter((car)=>car.bodyType == 'pickup truck').length} cars`, image: '/pickup-trucklogo.webp' }
            ].map((type, index) => (
              <div key={index} onClick={()=> router.push(`/cars/${type.name.toLowerCase().replace(/\s+/, '-')}`)} className="rounded-xl bg-white border p-2 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full mx-auto mb-2 bg-[#fff7f0] rounded-lg overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-16 object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.count}</p>
              </div>
            ))}
          </div>

         
          {/* <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div> */}
        </div>
      </section>
  )
}

export default PopularBrands
