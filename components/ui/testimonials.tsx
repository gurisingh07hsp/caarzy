// "use client";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// const carTestimonials = [
//   {
//     text: "AutoDeal made finding my dream car so easy! The platform's intuitive interface and detailed car information helped me make the perfect choice.",
//     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//     name: "Sarah Johnson",
//     role: "Car Buyer",
//   },
//   {
//     text: "The car comparison feature is incredible! I could easily compare different models side by side and found exactly what I was looking for.",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//     name: "Michael Chen",
//     role: "Car Enthusiast",
//   },
//   {
//     text: "AutoDeal made finding my dream car so easy! The platform's intuitive interface and detailed car information helped me make the perfect choice.",
//     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//     name: "Sarah Johnson",
//     role: "Car Buyer",
//   },
//   {
//     text: "The car comparison feature is incredible! I could easily compare different models side by side and found exactly what I was looking for.",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//     name: "Michael Chen",
//     role: "Car Enthusiast",
//   }
// ];

// const Testimonials = () => {
//   return (
//     <section className="my-20 max-w-7xl lg:px-0 px-4 lg:mx-auto">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tighter">
//           People Love It from Us
//         </h2>
//         <div className="flex gap-2">
//           <button className="w-8 h-8 flex justify-center items-center text-[#D9D9D9] rounded-full border">
//             <ArrowLeft/>
//           </button>
//           <button className="w-8 h-8 flex justify-center items-center text-white rounded-full border bg-[#FF3F25]">
//             <ArrowRight/>
//           </button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-4">
//         {carTestimonials.map((test,index) => (
//           <div key={index} className="relative">
//             <div className="absolute flex flex-col justify-between lg:h-52 md:h-48 h-40 lg:top-32 top-[16%] lg:mx-12 mx-4 pr-6">
//               <p className="max-sm:text-xs">{test.text}</p>
//               <div className="flex gap-4">
//                 <img src="#" alt="" className="w-14 h-14 rounded-lg border" />
//                 <div>
//                   <h4 className="lg:text-xl font-semibold">{test.name}</h4>
//                   <div className="flex gap-1">
//                     <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
//                     </svg>
//                     <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
//                     </svg>
//                     <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
//                     </svg>
//                     <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
//                     </svg>
//                     <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <svg className="lg:w-600 lg:h-400 w-full" viewBox="0 0 829 479" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M0 102C0 82.67 15.67 67 35 67H438.096C448.201 67 457.814 62.6321 464.46 55.0198L502.04 11.9802C508.686 4.36792 518.299 0 528.404 0H794C813.33 0 829 15.67 829 35V444C829 463.33 813.33 479 794 479H35C15.67 479 0 463.33 0 444V102Z" fill="#F6F6F6"/>
//             </svg>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;


"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const carTestimonials = [
  {
    text: "AutoDeal made finding my dream car so easy! The platform's intuitive interface and detailed car information helped me make the perfect choice.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Johnson",
    role: "Car Buyer",
  },
  {
    text: "The car comparison feature is incredible! I could easily compare different models side by side and found exactly what I was looking for.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Chen",
    role: "Car Enthusiast",
  },
  {
    text: "AutoDeal made finding my dream car so easy! The platform's intuitive interface and detailed car information helped me make the perfect choice.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Johnson",
    role: "Car Buyer",
  },
  {
    text: "The car comparison feature is incredible! I could easily compare different models side by side and found exactly what I was looking for.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Chen",
    role: "Car Enthusiast",
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = Math.ceil(carTestimonials.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleTestimonials = carTestimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="my-20 max-w-7xl lg:px-0 px-4 lg:mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter">
          People Love It from Us
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-8 h-8 flex justify-center items-center text-[#D9D9D9] rounded-full border hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonials"
          >
            <ArrowLeft/>
          </button>
          <button 
            onClick={handleNext}
            className="w-8 h-8 flex justify-center items-center text-white rounded-full border main-bg-color hover:bg-[#E63620] transition-colors"
            aria-label="Next testimonials"
          >
            <ArrowRight/>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-4 transition-all duration-300">
        {visibleTestimonials.map((test, index) => (
          <div key={`${currentIndex}-${index}`} className="relative animate-fadeIn">
            <div className="absolute flex flex-col justify-between lg:h-52 md:h-48 h-40 lg:top-32 top-[16%] lg:mx-12 mx-4 pr-6">
              <p className="max-sm:text-xs">{test.text}</p>
              <div className="flex gap-4">
                <img 
                  src={test.image} 
                  alt={test.name} 
                  className="w-14 h-14 rounded-lg border object-cover" 
                />
                <div>
                  <h4 className="lg:text-xl font-semibold">{test.name}</h4>
                  <p className="text-sm text-gray-600">{test.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <svg className="lg:w-600 lg:h-400 w-full" viewBox="0 0 829 479" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 102C0 82.67 15.67 67 35 67H438.096C448.201 67 457.814 62.6321 464.46 55.0198L502.04 11.9802C508.686 4.36792 518.299 0 528.404 0H794C813.33 0 829 15.67 829 35V444C829 463.33 813.33 479 794 479H35C15.67 479 0 463.33 0 444V102Z" fill="#F6F6F6"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex 
                ? 'main-bg-color w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;