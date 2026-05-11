'use client'
import { CarCard } from '@/components/CarCard';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { mockBrands } from '@/data/mockBrands';
const CarsCategoryPage = () => {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [Category, setCategory] = useState<string>('');
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {category} = useParams();

  useEffect(()=> {
    if(category == 'popular-cars'){
        setCategory('Popular Cars');
    }
    else if(category == 'upcoming-cars'){
        setCategory('Upcoming Cars');
    }
    else{
        setCategory('Electric Cars');
    }
  })

    const getCars = async() => {
    try{
      const response = await axios.get('/api/managemodels',{
      params: {
        category: Category,
      }
    });
      if(response.status === 200){
        setCars(response.data.models);
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  };

  useEffect(()=> {
    getCars();
  },[Category]);
    const filteredCars = cars.filter((c: any) => {
    const brandMatch = activeBrand === "All" || c.brand === activeBrand.toLowerCase();
    const searchMatch = c.modelName.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && searchMatch;
  });
  return (
    <div>
       <div className={`relative overflow-hidden ${Category == 'Electric Cars' ? 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900' : 'bg-gradient-to-br from-red-900 via-red-950 to-red-900'} `}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400 opacity-5"
              style={{
                width: (i + 1) * 80 + "px",
                height: (i + 1) * 80 + "px",
                left: (i * 13) % 100 + "%",
                top: (i * 17) % 100 + "%",
                filter: "blur(60px)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
                {Category === 'Electric Cars' && (
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-emerald-500/30">
                        🌿 GREEN INITIATIVE 2026
                    </div>
                )}
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
                {Category}
                <br />
                <span className={`${Category === 'Electric Cars' ? 'text-emerald-400' : 'text-red-400'}`}>in India</span>
              </h1>
              <p className="text-slate-300 text-sm md:text-base mb-6 max-w-lg">
                Explore {Category.toLowerCase()}. Compare prices, range, and features to find your perfect car.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder={`Search ${Category.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-8">
      
        <div className="mb-6">
          <h2 className="text-lg font-black text-slate-800 mb-3">Browse by Brand</h2>
          <div className="flex flex-wrap gap-2">
            {mockBrands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => activeBrand == brand.name ? setActiveBrand("All") : setActiveBrand(brand.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeBrand === brand.name
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
        </div>



      <h1 className='max-w-6xl mx-auto text-3xl font-bold mt-2'>{Category}</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 max-w-6xl mx-auto my-4'>
        {filteredCars.map((car, index)=> (
            <CarCard key={index} car={car}/>
        ))}
      </div>
{/* 
  {blogs.length > 0 && (
    <div className='border mt-8 max-w-7xl mb-4 mx-auto rounded-2xl p-4'>
      <h2 className='lg:text-xl text-lg font-medium'>Latest Articles & Reviews</h2>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {blogs.map((blog: any, index: number) => (
          <div key={index} className='lg:w-[330px] h-[400px]'>
            <div className='w-full md:h-[200px] h-[200px] relative rounded-2xl overflow-hidden'>
              <div className='main-bg-color text-white absolute top-2 left-2 rounded-full px-2 py-1'>{new Date(blog.publishDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}</div>
              <img src={blog.featuredImage} alt={blog.title} className='rounded-2xl w-full h-full' />
            </div>
            <div className='space-y-2 mt-4'>
              <div className='flex gap-1 text-sm'>
                <p className='font-semibold'>{blog.author}</p>
                <p className='text-gray-300'> | </p>
                <p className='main-text-color font-semibold'>{blog.category}</p>
              </div>
              <p onClick={()=> router.push(`/blog/${blog.slug}`)} className='text-xl font-bold hover:text-[#e8151f] transition-colors duration-300 cursor-pointer'>{blog.title.length > 100 ? blog.title.slice(0,100) + '...' : blog.title}</p>
              <div className=' text-sm'>{blog.excerpt.slice(0,110)}</div>
              <div>
                <Link href={`/blog/${blog.slug}`} className='font-semibold hover:text-[#e8151f] transition-colors duration-300'>Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )} */}




    </div>
  )
}

export default CarsCategoryPage
