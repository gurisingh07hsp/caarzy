"use client";
import { TestimonialsColumn, testimonials } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Car-related testimonials data
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
  }
];

const firstColumn = carTestimonials.slice(0, 3);
const secondColumn = carTestimonials.slice(3, 6);
const thirdColumn = carTestimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="my-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tighter">
          People Love It from Us
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex justify-center items-center text-[#D9D9D9] rounded-full border">
            <ArrowLeft/>
          </button>
          <button className="w-8 h-8 flex justify-center items-center text-white rounded-full border bg-[#FF3F25]">
            <ArrowRight/>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4">
        {carTestimonials.map((test,index) => (
          <div key={index} className="relative">
            <div className="absolute flex flex-col justify-between h-52 top-32 mx-12 pr-6">
              <p>{test.text}</p>
              <div className="flex gap-4 mt-">
                <img src="#" alt="" className="w-14 h-14 rounded-lg border" />
                <div>
                  <h4 className="text-xl font-semibold">{test.name}</h4>
                  <div className="flex gap-1">
                    <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                    </svg>
                    <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                    </svg>
                    <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                    </svg>
                    <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                    </svg>
                    <svg width="20" height="30" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9232 0L25.8626 15.2016H41.8465L28.9152 24.5967L33.8545 39.7984L20.9232 30.4033L7.99197 39.7984L12.9313 24.5967L5.72205e-06 15.2016H15.9839L20.9232 0Z" fill="#FFDB4B"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <svg width="600" height="400" viewBox="0 0 829 479" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 102C0 82.67 15.67 67 35 67H438.096C448.201 67 457.814 62.6321 464.46 55.0198L502.04 11.9802C508.686 4.36792 518.299 0 528.404 0H794C813.33 0 829 15.67 829 35V444C829 463.33 813.33 479 794 479H35C15.67 479 0 463.33 0 444V102Z" fill="#F6F6F6"/>
            </svg>
          </div>
        ))}
      </div>
      {/* <div className="container z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-orange-200 bg-orange-50 text-orange-600 py-1 px-4 rounded-lg text-sm font-medium">
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-gray-900">
            What our customers say
          </h2>
          <p className="text-center mt-5 text-gray-600 opacity-75">
            See what our customers have to say about their AutoDeal experience.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div> */}
    </section>
  );
};

export default Testimonials;
