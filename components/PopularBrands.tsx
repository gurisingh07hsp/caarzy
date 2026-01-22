import { useRouter } from 'next/navigation'

interface PageProps {
  bodyTypeCounts: any;
}

const PopularBrands = ({bodyTypeCounts}: PageProps) => {
  const router = useRouter();

  const bodyTypeMap = bodyTypeCounts.reduce((acc: any, item: any) => {
  acc[item._id.toLowerCase()] = item.count;
  return acc;
  }, {});
  return (
    <section className="py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="md:text-2xl text-lg text-center font-bold text-gray-900">Body Types</h2>
          </div>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        {[
          { name: 'Coupe', key: 'coupe', image: '/coupelogo.webp' },
          { name: 'MUV', key: 'muv', image: '/mvplogo.webp' },
          { name: 'Sedan', key: 'sedan', image: '/sedanlogo.webp' },
          { name: 'Hatchback', key: 'hatchback', image: '/hatchbacklogo.webp' },
          { name: 'SUV', key: 'suv', image: '/suvlogo.webp' },
          { name: 'Pickup Truck', key: 'pickup truck', image: '/pickup-trucklogo.webp' }
        ].map((type, index) => (
          <div
            key={index}
            onClick={() =>
              router.push(`/cars/${type.key.replace(/\s+/g, '-')}`)
            }
            className="rounded-xl bg-white border p-2 text-center hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="w-full mx-auto mb-2 bg-[#fff7f0] rounded-lg overflow-hidden">
              <img
                src={type.image}
                alt={type.name}
                className="w-full h-16 object-cover"
              />
            </div>

      <h3 className="font-semibold text-gray-900">{type.name}</h3>
      <p className="text-sm text-gray-500">
        {(bodyTypeMap[type.key] || 0)} cars
      </p>
    </div>
  ))}
</div>
        </div>
      </section>
  )
}

export default PopularBrands
