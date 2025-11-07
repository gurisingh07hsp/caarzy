"use client";
import { TestimonialsColumn, testimonials } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

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
  },
  {
    text: "As a first-time car buyer, AutoDeal guided me through the entire process. The detailed specifications and expert reviews were invaluable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "New Driver",
  },
  {
    text: "The financing options and EMI calculator helped me plan my budget perfectly. I got my car with the best possible deal!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Business Owner",
  },
  {
    text: "AutoDeal's customer service is outstanding! They helped me find the perfect family SUV with all the features I needed.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Thompson",
    role: "Mother of Three",
  },
  {
    text: "The platform's search filters are so precise! I found my ideal luxury sedan within minutes of browsing. Highly recommended!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "Executive",
  },
  {
    text: "AutoDeal's blog section provided excellent insights about car maintenance and buying tips. It's more than just a marketplace!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Maria Garcia",
    role: "Car Owner",
  },
  {
    text: "The virtual car tours and high-quality images gave me confidence in my purchase decision. I felt like I was there in person!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Robert Taylor",
    role: "Tech Professional",
  },
  {
    text: "AutoDeal's warranty and after-sales support is exceptional. They truly care about customer satisfaction beyond the sale.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    name: "Jennifer Lee",
    role: "Car Dealer",
  },
];

const firstColumn = carTestimonials.slice(0, 3);
const secondColumn = carTestimonials.slice(3, 6);
const thirdColumn = carTestimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-gray-50 my-20 relative">
      <div className="container z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default Testimonials;
