'use client';
import { CheckIcon, ChevronDown, ChevronUp, Image, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Car } from "@/types/Car";
import { useRouter } from "next/navigation";
import CarLoadingComponent from "./CarLoadingComponent";
import { PriceFormatter } from "@/hook/utils";
const ComparePageDetails = () => {
    const { slug } = useParams();
          type SectionId =
            | 'basic'
            | 'engine'
            | 'fuel'
            | 'suspension'
            | 'dimensions'
            | 'comfort'
            | 'interior'
            | 'exterior'
            | 'safety'
            | 'entertainment'
            | 'adas'
            | 'internet';
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [car1, setCar1] = useState<any>();
    const [car2, setCar2] = useState<any>();
    const [selectedVariant1, setSelectedVariant1] = useState<Car>(car1?.variant[0]);
    const [selectedVariant2, setSelectedVariant2] = useState<Car>(car2?.variant[0]);
    const [selectedTab, setSelectedTab] = useState<'pros' | 'cons'>('pros')
        
          const [expandedSections, setExpandedSections] = useState<{ [K in SectionId]: boolean }>({
            basic: true,
            engine: false,
            fuel: false,
            suspension: false,
            dimensions: false,
            comfort: false,
            interior: false,
            exterior: false,
            safety: false,
            entertainment: false,
            adas: false,
            internet: false,
          });

      const fetchVariant = async() => {
        try{
            const response = await axios.get(`/api/managecomparison/${slug?.toString().replace(/-/g, ' ')}`);
            if(response.status === 200){
                console.log(response.data);
                setCar1(response.data.car1);
                setCar2(response.data.car2);
                setSelectedVariant1(response.data.car1.variant[0]);
                setSelectedVariant2(response.data.car2.variant[0]);
            }
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(()=> {
        fetchVariant();
    },[]);



    const toggleSection = (section: SectionId) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


    if(loading){
      return (
        <CarLoadingComponent/>
      )
    }

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="max-w-4xl grid md:grid-cols-2 grid-cols-1 mx-4 gap-20 md:mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
          <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
            <img src={car1?.images[0]} alt={car1?.modelName} className="w-full h-full object-cover" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {car1.isFeatured && (
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-2xl">
                Featured
              </span>
              )}
              {/* {isSold && ( */}
              <span className="bg-[#B9B9B9] text-white text-xs font-semibold px-3 py-1 rounded-2xl flex items-center gap-1">
                <Image size={12} />
                {car1.images.length || 0}
              </span>
              {/* )} */}
            </div>

            <div className="absolute top-3 right-3 flex gap-2">
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-md">
                {"2024"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Category */}
            <p className="main-text-color text-sm font-medium mb-1">{car1.bodyType === 'suv' ? 'SUV' : car1.category.charAt(0).toUpperCase() + car1.category.slice(1)}</p>

            {/* Car Name */}
            <h3 className="text-lg font-medium text-gray-900 mb-1">{car1.brand.charAt(0).toUpperCase() + car1.brand.slice(1)} {car1.modelName.charAt(0).toUpperCase() + car1.modelName.slice(1)}</h3>

            {/* Specifications */}
            <div className="flex gap-4 items-center space-y-1 mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.14625 9.6463L13.1463 3.6463C13.1927 3.59985 13.2479 3.563 13.3086 3.53786C13.3693 3.51272 13.4343 3.49978 13.5 3.49978C13.5657 3.49978 13.6308 3.51272 13.6915 3.53786C13.7521 3.563 13.8073 3.59985 13.8538 3.6463C13.9002 3.69276 13.9371 3.74791 13.9622 3.8086C13.9873 3.8693 14.0003 3.93436 14.0003 4.00005C14.0003 4.06575 13.9873 4.1308 13.9622 4.1915C13.9371 4.2522 13.9002 4.30735 13.8538 4.3538L7.85375 10.3538C7.8073 10.4003 7.75215 10.4371 7.69145 10.4622C7.63076 10.4874 7.5657 10.5003 7.5 10.5003C7.43431 10.5003 7.36925 10.4874 7.30856 10.4622C7.24786 10.4371 7.19271 10.4003 7.14625 10.3538C7.0998 10.3073 7.06295 10.2522 7.03781 10.1915C7.01267 10.1308 6.99973 10.0658 6.99973 10.0001C6.99973 9.93436 7.01267 9.8693 7.03781 9.8086C7.06295 9.74791 7.0998 9.69276 7.14625 9.6463ZM8 5.50005C8.43432 5.4995 8.86582 5.5698 9.2775 5.70818C9.34001 5.73034 9.4063 5.73984 9.47251 5.73614C9.53873 5.73243 9.60354 5.7156 9.66319 5.6866C9.72283 5.65761 9.77611 5.61704 9.81992 5.56725C9.86374 5.51747 9.89721 5.45947 9.91839 5.39663C9.93957 5.33378 9.94804 5.26735 9.94331 5.20121C9.93857 5.13506 9.92072 5.07051 9.8908 5.01133C9.86088 4.95215 9.81948 4.89951 9.76902 4.85647C9.71856 4.81344 9.66005 4.78088 9.59688 4.76068C8.80008 4.49206 7.94841 4.42872 7.12064 4.57654C6.29287 4.72435 5.51575 5.07853 4.86117 5.60632C4.20659 6.13412 3.69568 6.81847 3.37572 7.59607C3.05575 8.37368 2.93706 9.21942 3.03063 10.0551C3.04416 10.1773 3.10224 10.2902 3.19379 10.3723C3.28533 10.4544 3.40392 10.4999 3.52688 10.5001C3.545 10.5001 3.56375 10.5001 3.5825 10.4969C3.71427 10.4823 3.83485 10.416 3.91771 10.3125C4.00057 10.209 4.03894 10.0768 4.02438 9.94505C4.00811 9.79728 3.99997 9.64872 4 9.50005C4.00116 8.43954 4.42296 7.4228 5.17286 6.6729C5.92275 5.92301 6.93949 5.50121 8 5.50005ZM14.2338 6.31255C14.2038 6.25411 14.1626 6.20215 14.1126 6.15962C14.0625 6.1171 14.0046 6.08485 13.9421 6.06471C13.8796 6.04457 13.8137 6.03694 13.7483 6.04225C13.6828 6.04757 13.6191 6.06572 13.5606 6.09568C13.5022 6.12564 13.4502 6.16681 13.4077 6.21685C13.3652 6.26689 13.3329 6.32482 13.3128 6.38732C13.2926 6.44983 13.285 6.51569 13.2903 6.58114C13.2956 6.6466 13.3138 6.71036 13.3438 6.7688C13.7137 7.49523 13.9321 8.28924 13.9858 9.10265C14.0396 9.91607 13.9274 10.7319 13.6563 11.5007L2.3375 11.4963C2.02171 10.5911 1.92687 9.62346 2.0609 8.67414C2.19493 7.72482 2.55394 6.82129 3.10801 6.03887C3.66208 5.25645 4.39515 4.61781 5.24611 4.17618C6.09707 3.73455 7.04127 3.50274 8 3.50005H8.05501C8.98621 3.50591 9.90298 3.73071 10.7313 4.1563C10.7899 4.18855 10.8543 4.20872 10.9209 4.2156C10.9874 4.22249 11.0546 4.21596 11.1186 4.19639C11.1825 4.17683 11.2419 4.14463 11.2932 4.1017C11.3445 4.05878 11.3867 4.006 11.4172 3.94648C11.4477 3.88697 11.466 3.82194 11.471 3.75523C11.4759 3.68853 11.4674 3.62151 11.446 3.55815C11.4246 3.49479 11.3907 3.43636 11.3463 3.38634C11.3019 3.33632 11.2479 3.29571 11.1875 3.26693C9.94061 2.62826 8.53075 2.37842 7.14031 2.54973C5.74988 2.72105 4.44283 3.30563 3.38825 4.22787C2.33367 5.15011 1.58008 6.36756 1.22495 7.72275C0.869816 9.07795 0.929492 10.5085 1.39625 11.8294C1.4652 12.0251 1.59307 12.1947 1.76229 12.3148C1.93151 12.4348 2.13376 12.4996 2.34125 12.5001H13.6581C13.8655 12.5002 14.0678 12.4358 14.237 12.3159C14.4062 12.196 14.5339 12.0264 14.6025 11.8307C14.9179 10.9337 15.0478 9.98211 14.9844 9.03347C14.921 8.08482 14.6656 7.15893 14.2338 6.31193V6.31255Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant1.fuelAndPerformance.petrolMileageARAI}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0625 4.35375L13.8538 3.14625C13.7599 3.05243 13.6327 2.99972 13.5 2.99972C13.3673 2.99972 13.2401 3.05243 13.1462 3.14625C13.0524 3.24007 12.9997 3.36732 12.9997 3.5C12.9997 3.63268 13.0524 3.75993 13.1462 3.85375L14.3538 5.0625C14.447 5.15589 14.4996 5.28238 14.5 5.41437V10.5C14.5 10.6326 14.4473 10.7598 14.3536 10.8536C14.2598 10.9473 14.1326 11 14 11C13.8674 11 13.7402 10.9473 13.6464 10.8536C13.5527 10.7598 13.5 10.6326 13.5 10.5V8C13.5 7.60218 13.342 7.22064 13.0607 6.93934C12.7794 6.65804 12.3978 6.5 12 6.5H11V3.5C11 3.10218 10.842 2.72064 10.5607 2.43934C10.2794 2.15804 9.89782 2 9.5 2H4.5C4.10218 2 3.72064 2.15804 3.43934 2.43934C3.15804 2.72064 3 3.10218 3 3.5V13H2C1.86739 13 1.74021 13.0527 1.64645 13.1464C1.55268 13.2402 1.5 13.3674 1.5 13.5C1.5 13.6326 1.55268 13.7598 1.64645 13.8536C1.74021 13.9473 1.86739 14 2 14H12C12.1326 14 12.2598 13.9473 12.3536 13.8536C12.4473 13.7598 12.5 13.6326 12.5 13.5C12.5 13.3674 12.4473 13.2402 12.3536 13.1464C12.2598 13.0527 12.1326 13 12 13H11V7.5H12C12.1326 7.5 12.2598 7.55268 12.3536 7.64645C12.4473 7.74021 12.5 7.86739 12.5 8V10.5C12.5 10.8978 12.658 11.2794 12.9393 11.5607C13.2206 11.842 13.6022 12 14 12C14.3978 12 14.7794 11.842 15.0607 11.5607C15.342 11.2794 15.5 10.8978 15.5 10.5V5.41437C15.5008 5.21745 15.4625 5.02233 15.3874 4.84028C15.3123 4.65824 15.2019 4.49288 15.0625 4.35375ZM4 13V3.5C4 3.36739 4.05268 3.24021 4.14645 3.14645C4.24021 3.05268 4.36739 3 4.5 3H9.5C9.63261 3 9.75979 3.05268 9.85355 3.14645C9.94732 3.24021 10 3.36739 10 3.5V13H4ZM9 7C9 7.13261 8.94732 7.25979 8.85355 7.35355C8.75979 7.44732 8.63261 7.5 8.5 7.5H5.5C5.36739 7.5 5.24021 7.44732 5.14645 7.35355C5.05268 7.25979 5 7.13261 5 7C5 6.86739 5.05268 6.74021 5.14645 6.64645C5.24021 6.55268 5.36739 6.5 5.5 6.5H8.5C8.63261 6.5 8.75979 6.55268 8.85355 6.64645C8.94732 6.74021 9 6.86739 9 7Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant1.fuelAndPerformance.fuelType}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 3.99997C14.4998 3.62594 14.3947 3.25947 14.1967 2.94216C13.9987 2.62485 13.7157 2.36942 13.3798 2.20489C13.0439 2.04035 12.6686 1.9733 12.2965 2.01135C11.9245 2.0494 11.5705 2.19103 11.2749 2.42015C10.9792 2.64926 10.7538 2.95669 10.6241 3.30751C10.4944 3.65833 10.4657 4.03849 10.5412 4.40481C10.6167 4.77113 10.7935 5.10894 11.0513 5.37986C11.3092 5.65078 11.6379 5.84396 12 5.93747V6.99997C12 7.13258 11.9473 7.25975 11.8536 7.35352C11.7598 7.44729 11.6326 7.49997 11.5 7.49997H6C5.82963 7.49992 5.66051 7.52909 5.5 7.58622V5.93747C5.97133 5.81577 6.3821 5.52635 6.65531 5.12347C6.92851 4.72058 7.0454 4.23188 6.98406 3.74897C6.92273 3.26606 6.68737 2.8221 6.32212 2.50031C5.95687 2.17851 5.48679 2.00098 5 2.00098C4.51322 2.00098 4.04314 2.17851 3.67789 2.50031C3.31264 2.8221 3.07728 3.26606 3.01595 3.74897C2.95461 4.23188 3.0715 4.72058 3.3447 5.12347C3.61791 5.52635 4.02868 5.81577 4.5 5.93747V10.0625C4.02868 10.1842 3.61791 10.4736 3.3447 10.8765C3.0715 11.2794 2.95461 11.7681 3.01595 12.251C3.07728 12.7339 3.31264 13.1778 3.67789 13.4996C4.04314 13.8214 4.51322 13.999 5 13.999C5.48679 13.999 5.95687 13.8214 6.32212 13.4996C6.68737 13.1778 6.92273 12.7339 6.98406 12.251C7.0454 11.7681 6.92851 11.2794 6.65531 10.8765C6.3821 10.4736 5.97133 10.1842 5.5 10.0625V8.99997C5.5 8.86736 5.55268 8.74018 5.64645 8.64642C5.74022 8.55265 5.8674 8.49997 6 8.49997H11.5C11.8978 8.49997 12.2794 8.34193 12.5607 8.06063C12.842 7.77933 13 7.39779 13 6.99997V5.93747C13.4292 5.826 13.8092 5.57532 14.0807 5.22472C14.3521 4.87411 14.4996 4.44337 14.5 3.99997ZM4 3.99997C4 3.80219 4.05865 3.60885 4.16854 3.4444C4.27842 3.27995 4.4346 3.15178 4.61732 3.07609C4.80005 3.0004 5.00111 2.9806 5.1951 3.01918C5.38908 3.05777 5.56726 3.15301 5.70711 3.29286C5.84696 3.43271 5.9422 3.6109 5.98079 3.80488C6.01938 3.99886 5.99957 4.19993 5.92388 4.38265C5.8482 4.56538 5.72002 4.72156 5.55557 4.83144C5.39113 4.94132 5.19779 4.99997 5 4.99997C4.73479 4.99997 4.48043 4.89461 4.2929 4.70708C4.10536 4.51954 4 4.26519 4 3.99997ZM6 12C6 12.1978 5.94136 12.3911 5.83147 12.5555C5.72159 12.72 5.56541 12.8482 5.38269 12.9238C5.19996 12.9995 4.9989 13.0193 4.80491 12.9808C4.61093 12.9422 4.43275 12.8469 4.2929 12.7071C4.15305 12.5672 4.0578 12.389 4.01922 12.1951C3.98063 12.0011 4.00044 11.8 4.07613 11.6173C4.15181 11.4346 4.27999 11.2784 4.44443 11.1685C4.60888 11.0586 4.80222 11 5 11C5.26522 11 5.51957 11.1053 5.70711 11.2929C5.89465 11.4804 6 11.7348 6 12ZM12.5 4.99997C12.3022 4.99997 12.1089 4.94132 11.9444 4.83144C11.78 4.72156 11.6518 4.56538 11.5761 4.38265C11.5004 4.19993 11.4806 3.99886 11.5192 3.80488C11.5578 3.6109 11.653 3.43271 11.7929 3.29286C11.9328 3.15301 12.1109 3.05777 12.3049 3.01918C12.4989 2.9806 12.7 3.0004 12.8827 3.07609C13.0654 3.15178 13.2216 3.27995 13.3315 3.4444C13.4414 3.60885 13.5 3.80219 13.5 3.99997C13.5 4.26519 13.3946 4.51954 13.2071 4.70708C13.0196 4.89461 12.7652 4.99997 12.5 4.99997Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant1.engineAndTransmission.transmissionType}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="main-text-color font-bold text-xl">₹{PriceFormatter(selectedVariant1?.price)}</span>
            <span className="text-gray-400 text-sm line-through">₹{PriceFormatter(selectedVariant1?.originalPrice)}</span>
              </div>
            </div>

            <hr />

            <select
              className="border border-gray-300 w-full py-2 px-2 mt-2 rounded-lg"
              value={selectedVariant1?._id || ""}
              onChange={(e) => {
                const selected = car1.variant.find(
                  (v: any) => v._id === e.target.value
                );
                setSelectedVariant1(selected);
              }}
            >
              <option value="" disabled>
                Select Variant
              </option>

              {car1.variant.map((v: any) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            {/* View Button - Full Width */}
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/${car1.brand.replace(/\s+/g, '-')}/${car1.modelName.replace(/\s+/g, '-')}`)}}
              className="mt-4 w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View car
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
          <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
            <img src={car2?.images[0]} alt={car2.modelName} className="w-full h-full object-cover" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {car1.isFeatured && (
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-2xl">
                Featured
              </span>
               )}
              {/* {isSold && ( */}
              <span className="bg-[#B9B9B9] text-white text-xs font-semibold px-3 py-1 rounded-2xl flex items-center gap-1">
                <Image size={12} />
                {car2.images.length || 0}
              </span>
              {/* )} */}
            </div>

            <div className="absolute top-3 right-3 flex gap-2">
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-md">
                {"2024"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Category */}
            <p className="main-text-color text-sm font-medium mb-1">{car2.bodyType === 'suv' ? 'SUV' : car2.category.charAt(0).toUpperCase() + car2.category.slice(1)}</p>

            {/* Car Name */}
            <h3 className="text-lg font-medium text-gray-900 mb-1">{car2.brand.charAt(0).toUpperCase() + car2.brand.slice(1)} {car2.modelName.charAt(0).toUpperCase() + car2.modelName.slice(1)}</h3>

            {/* Specifications */}
            <div className="flex gap-4 items-center space-y-1 mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.14625 9.6463L13.1463 3.6463C13.1927 3.59985 13.2479 3.563 13.3086 3.53786C13.3693 3.51272 13.4343 3.49978 13.5 3.49978C13.5657 3.49978 13.6308 3.51272 13.6915 3.53786C13.7521 3.563 13.8073 3.59985 13.8538 3.6463C13.9002 3.69276 13.9371 3.74791 13.9622 3.8086C13.9873 3.8693 14.0003 3.93436 14.0003 4.00005C14.0003 4.06575 13.9873 4.1308 13.9622 4.1915C13.9371 4.2522 13.9002 4.30735 13.8538 4.3538L7.85375 10.3538C7.8073 10.4003 7.75215 10.4371 7.69145 10.4622C7.63076 10.4874 7.5657 10.5003 7.5 10.5003C7.43431 10.5003 7.36925 10.4874 7.30856 10.4622C7.24786 10.4371 7.19271 10.4003 7.14625 10.3538C7.0998 10.3073 7.06295 10.2522 7.03781 10.1915C7.01267 10.1308 6.99973 10.0658 6.99973 10.0001C6.99973 9.93436 7.01267 9.8693 7.03781 9.8086C7.06295 9.74791 7.0998 9.69276 7.14625 9.6463ZM8 5.50005C8.43432 5.4995 8.86582 5.5698 9.2775 5.70818C9.34001 5.73034 9.4063 5.73984 9.47251 5.73614C9.53873 5.73243 9.60354 5.7156 9.66319 5.6866C9.72283 5.65761 9.77611 5.61704 9.81992 5.56725C9.86374 5.51747 9.89721 5.45947 9.91839 5.39663C9.93957 5.33378 9.94804 5.26735 9.94331 5.20121C9.93857 5.13506 9.92072 5.07051 9.8908 5.01133C9.86088 4.95215 9.81948 4.89951 9.76902 4.85647C9.71856 4.81344 9.66005 4.78088 9.59688 4.76068C8.80008 4.49206 7.94841 4.42872 7.12064 4.57654C6.29287 4.72435 5.51575 5.07853 4.86117 5.60632C4.20659 6.13412 3.69568 6.81847 3.37572 7.59607C3.05575 8.37368 2.93706 9.21942 3.03063 10.0551C3.04416 10.1773 3.10224 10.2902 3.19379 10.3723C3.28533 10.4544 3.40392 10.4999 3.52688 10.5001C3.545 10.5001 3.56375 10.5001 3.5825 10.4969C3.71427 10.4823 3.83485 10.416 3.91771 10.3125C4.00057 10.209 4.03894 10.0768 4.02438 9.94505C4.00811 9.79728 3.99997 9.64872 4 9.50005C4.00116 8.43954 4.42296 7.4228 5.17286 6.6729C5.92275 5.92301 6.93949 5.50121 8 5.50005ZM14.2338 6.31255C14.2038 6.25411 14.1626 6.20215 14.1126 6.15962C14.0625 6.1171 14.0046 6.08485 13.9421 6.06471C13.8796 6.04457 13.8137 6.03694 13.7483 6.04225C13.6828 6.04757 13.6191 6.06572 13.5606 6.09568C13.5022 6.12564 13.4502 6.16681 13.4077 6.21685C13.3652 6.26689 13.3329 6.32482 13.3128 6.38732C13.2926 6.44983 13.285 6.51569 13.2903 6.58114C13.2956 6.6466 13.3138 6.71036 13.3438 6.7688C13.7137 7.49523 13.9321 8.28924 13.9858 9.10265C14.0396 9.91607 13.9274 10.7319 13.6563 11.5007L2.3375 11.4963C2.02171 10.5911 1.92687 9.62346 2.0609 8.67414C2.19493 7.72482 2.55394 6.82129 3.10801 6.03887C3.66208 5.25645 4.39515 4.61781 5.24611 4.17618C6.09707 3.73455 7.04127 3.50274 8 3.50005H8.05501C8.98621 3.50591 9.90298 3.73071 10.7313 4.1563C10.7899 4.18855 10.8543 4.20872 10.9209 4.2156C10.9874 4.22249 11.0546 4.21596 11.1186 4.19639C11.1825 4.17683 11.2419 4.14463 11.2932 4.1017C11.3445 4.05878 11.3867 4.006 11.4172 3.94648C11.4477 3.88697 11.466 3.82194 11.471 3.75523C11.4759 3.68853 11.4674 3.62151 11.446 3.55815C11.4246 3.49479 11.3907 3.43636 11.3463 3.38634C11.3019 3.33632 11.2479 3.29571 11.1875 3.26693C9.94061 2.62826 8.53075 2.37842 7.14031 2.54973C5.74988 2.72105 4.44283 3.30563 3.38825 4.22787C2.33367 5.15011 1.58008 6.36756 1.22495 7.72275C0.869816 9.07795 0.929492 10.5085 1.39625 11.8294C1.4652 12.0251 1.59307 12.1947 1.76229 12.3148C1.93151 12.4348 2.13376 12.4996 2.34125 12.5001H13.6581C13.8655 12.5002 14.0678 12.4358 14.237 12.3159C14.4062 12.196 14.5339 12.0264 14.6025 11.8307C14.9179 10.9337 15.0478 9.98211 14.9844 9.03347C14.921 8.08482 14.6656 7.15893 14.2338 6.31193V6.31255Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant2.fuelAndPerformance.petrolMileageARAI}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0625 4.35375L13.8538 3.14625C13.7599 3.05243 13.6327 2.99972 13.5 2.99972C13.3673 2.99972 13.2401 3.05243 13.1462 3.14625C13.0524 3.24007 12.9997 3.36732 12.9997 3.5C12.9997 3.63268 13.0524 3.75993 13.1462 3.85375L14.3538 5.0625C14.447 5.15589 14.4996 5.28238 14.5 5.41437V10.5C14.5 10.6326 14.4473 10.7598 14.3536 10.8536C14.2598 10.9473 14.1326 11 14 11C13.8674 11 13.7402 10.9473 13.6464 10.8536C13.5527 10.7598 13.5 10.6326 13.5 10.5V8C13.5 7.60218 13.342 7.22064 13.0607 6.93934C12.7794 6.65804 12.3978 6.5 12 6.5H11V3.5C11 3.10218 10.842 2.72064 10.5607 2.43934C10.2794 2.15804 9.89782 2 9.5 2H4.5C4.10218 2 3.72064 2.15804 3.43934 2.43934C3.15804 2.72064 3 3.10218 3 3.5V13H2C1.86739 13 1.74021 13.0527 1.64645 13.1464C1.55268 13.2402 1.5 13.3674 1.5 13.5C1.5 13.6326 1.55268 13.7598 1.64645 13.8536C1.74021 13.9473 1.86739 14 2 14H12C12.1326 14 12.2598 13.9473 12.3536 13.8536C12.4473 13.7598 12.5 13.6326 12.5 13.5C12.5 13.3674 12.4473 13.2402 12.3536 13.1464C12.2598 13.0527 12.1326 13 12 13H11V7.5H12C12.1326 7.5 12.2598 7.55268 12.3536 7.64645C12.4473 7.74021 12.5 7.86739 12.5 8V10.5C12.5 10.8978 12.658 11.2794 12.9393 11.5607C13.2206 11.842 13.6022 12 14 12C14.3978 12 14.7794 11.842 15.0607 11.5607C15.342 11.2794 15.5 10.8978 15.5 10.5V5.41437C15.5008 5.21745 15.4625 5.02233 15.3874 4.84028C15.3123 4.65824 15.2019 4.49288 15.0625 4.35375ZM4 13V3.5C4 3.36739 4.05268 3.24021 4.14645 3.14645C4.24021 3.05268 4.36739 3 4.5 3H9.5C9.63261 3 9.75979 3.05268 9.85355 3.14645C9.94732 3.24021 10 3.36739 10 3.5V13H4ZM9 7C9 7.13261 8.94732 7.25979 8.85355 7.35355C8.75979 7.44732 8.63261 7.5 8.5 7.5H5.5C5.36739 7.5 5.24021 7.44732 5.14645 7.35355C5.05268 7.25979 5 7.13261 5 7C5 6.86739 5.05268 6.74021 5.14645 6.64645C5.24021 6.55268 5.36739 6.5 5.5 6.5H8.5C8.63261 6.5 8.75979 6.55268 8.85355 6.64645C8.94732 6.74021 9 6.86739 9 7Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant2.fuelAndPerformance.fuelType}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 3.99997C14.4998 3.62594 14.3947 3.25947 14.1967 2.94216C13.9987 2.62485 13.7157 2.36942 13.3798 2.20489C13.0439 2.04035 12.6686 1.9733 12.2965 2.01135C11.9245 2.0494 11.5705 2.19103 11.2749 2.42015C10.9792 2.64926 10.7538 2.95669 10.6241 3.30751C10.4944 3.65833 10.4657 4.03849 10.5412 4.40481C10.6167 4.77113 10.7935 5.10894 11.0513 5.37986C11.3092 5.65078 11.6379 5.84396 12 5.93747V6.99997C12 7.13258 11.9473 7.25975 11.8536 7.35352C11.7598 7.44729 11.6326 7.49997 11.5 7.49997H6C5.82963 7.49992 5.66051 7.52909 5.5 7.58622V5.93747C5.97133 5.81577 6.3821 5.52635 6.65531 5.12347C6.92851 4.72058 7.0454 4.23188 6.98406 3.74897C6.92273 3.26606 6.68737 2.8221 6.32212 2.50031C5.95687 2.17851 5.48679 2.00098 5 2.00098C4.51322 2.00098 4.04314 2.17851 3.67789 2.50031C3.31264 2.8221 3.07728 3.26606 3.01595 3.74897C2.95461 4.23188 3.0715 4.72058 3.3447 5.12347C3.61791 5.52635 4.02868 5.81577 4.5 5.93747V10.0625C4.02868 10.1842 3.61791 10.4736 3.3447 10.8765C3.0715 11.2794 2.95461 11.7681 3.01595 12.251C3.07728 12.7339 3.31264 13.1778 3.67789 13.4996C4.04314 13.8214 4.51322 13.999 5 13.999C5.48679 13.999 5.95687 13.8214 6.32212 13.4996C6.68737 13.1778 6.92273 12.7339 6.98406 12.251C7.0454 11.7681 6.92851 11.2794 6.65531 10.8765C6.3821 10.4736 5.97133 10.1842 5.5 10.0625V8.99997C5.5 8.86736 5.55268 8.74018 5.64645 8.64642C5.74022 8.55265 5.8674 8.49997 6 8.49997H11.5C11.8978 8.49997 12.2794 8.34193 12.5607 8.06063C12.842 7.77933 13 7.39779 13 6.99997V5.93747C13.4292 5.826 13.8092 5.57532 14.0807 5.22472C14.3521 4.87411 14.4996 4.44337 14.5 3.99997ZM4 3.99997C4 3.80219 4.05865 3.60885 4.16854 3.4444C4.27842 3.27995 4.4346 3.15178 4.61732 3.07609C4.80005 3.0004 5.00111 2.9806 5.1951 3.01918C5.38908 3.05777 5.56726 3.15301 5.70711 3.29286C5.84696 3.43271 5.9422 3.6109 5.98079 3.80488C6.01938 3.99886 5.99957 4.19993 5.92388 4.38265C5.8482 4.56538 5.72002 4.72156 5.55557 4.83144C5.39113 4.94132 5.19779 4.99997 5 4.99997C4.73479 4.99997 4.48043 4.89461 4.2929 4.70708C4.10536 4.51954 4 4.26519 4 3.99997ZM6 12C6 12.1978 5.94136 12.3911 5.83147 12.5555C5.72159 12.72 5.56541 12.8482 5.38269 12.9238C5.19996 12.9995 4.9989 13.0193 4.80491 12.9808C4.61093 12.9422 4.43275 12.8469 4.2929 12.7071C4.15305 12.5672 4.0578 12.389 4.01922 12.1951C3.98063 12.0011 4.00044 11.8 4.07613 11.6173C4.15181 11.4346 4.27999 11.2784 4.44443 11.1685C4.60888 11.0586 4.80222 11 5 11C5.26522 11 5.51957 11.1053 5.70711 11.2929C5.89465 11.4804 6 11.7348 6 12ZM12.5 4.99997C12.3022 4.99997 12.1089 4.94132 11.9444 4.83144C11.78 4.72156 11.6518 4.56538 11.5761 4.38265C11.5004 4.19993 11.4806 3.99886 11.5192 3.80488C11.5578 3.6109 11.653 3.43271 11.7929 3.29286C11.9328 3.15301 12.1109 3.05777 12.3049 3.01918C12.4989 2.9806 12.7 3.0004 12.8827 3.07609C13.0654 3.15178 13.2216 3.27995 13.3315 3.4444C13.4414 3.60885 13.5 3.80219 13.5 3.99997C13.5 4.26519 13.3946 4.51954 13.2071 4.70708C13.0196 4.89461 12.7652 4.99997 12.5 4.99997Z"
                    fill="#696665"
                  />
                </svg>
                <span>{selectedVariant2.engineAndTransmission.transmissionType}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="main-text-color font-bold text-xl">₹{PriceFormatter(selectedVariant2?.price)}L</span>
            <span className="text-gray-400 text-sm line-through">₹{PriceFormatter(selectedVariant2?.originalPrice)}</span>
              </div>
            </div>

            <hr />


             <select
              className="border border-gray-300 w-full py-2 px-2 mt-2 rounded-lg"
              value={selectedVariant2?._id || ""}
              onChange={(e) => {
                const selected = car2.variant.find(
                  (v: any) => v._id === e.target.value
                );
                setSelectedVariant2(selected);
              }}
            >
              <option value="" disabled>
                Select Variant
              </option>

              {car2.variant.map((v: any) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            {/* View Button - Full Width */}
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/${car2.brand.replace(/\s+/g, '-')}/${car2.modelName.replace(/\s+/g, '-')}`)}}
              className="mt-4 w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View car
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-4xl border mx-auto mt-8 rounded-2xl px-4">
        <div className="">
                    <Section title="Engine & Transmission" id="Engine & Transmission" 
              expandedSections={expandedSections}
              toggleSection={toggleSection}>
              <div className=''>
                    {[
                      ["Engine Type", selectedVariant1?.engineAndTransmission?.engineType, selectedVariant2.engineAndTransmission?.engineType],
                      ["Displacement", selectedVariant1?.engineAndTransmission?.displacement, selectedVariant2.engineAndTransmission.displacement],
                      ["Max Power", selectedVariant1?.engineAndTransmission?.maxPower, selectedVariant2?.engineAndTransmission?.maxPower],
                      ["Max Torque", selectedVariant1?.engineAndTransmission?.maxTorque, selectedVariant2?.engineAndTransmission?.maxTorque],
                      ["No. of Cylinders", selectedVariant1?.engineAndTransmission?.NumOfCylinders, selectedVariant2?.engineAndTransmission?.NumOfCylinders],
                      ["Valves Per Cylinder", selectedVariant1.engineAndTransmission.valvesPerCylinder, selectedVariant2.engineAndTransmission.valvesPerCylinder],
                      ["Fuel Supply System", selectedVariant1.engineAndTransmission.fuelSupplySystem, selectedVariant2.engineAndTransmission.fuelSupplySystem],
                      ["Turbo Charger", selectedVariant1.engineAndTransmission.turboCharger, selectedVariant2.engineAndTransmission.turboCharger],
                      ["Transmission Type", selectedVariant1.engineAndTransmission.transmissionType, selectedVariant2.engineAndTransmission.transmissionType],
                      ["Gearbox", selectedVariant1.engineAndTransmission.gearbox, selectedVariant2.engineAndTransmission.gearbox],
                      ["Drive Type", selectedVariant1.engineAndTransmission.driveType, selectedVariant2.engineAndTransmission.driveType],
                    ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                        <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                        <div className="px-4 py-2 border flex justify-around rounded-lg">
                            <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                            <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                        </div>
                      </div>
                    ))}
                    </div>
              </Section>
        </div>

        <div>
          <Section title="Fuel & Performance" id="Fuel & Performance" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    ["Fuel Type", selectedVariant1.fuelAndPerformance.fuelType, selectedVariant2.fuelAndPerformance.fuelType],
                    ["Petrol Mileage ARAI", selectedVariant1.fuelAndPerformance.petrolMileageARAI, selectedVariant2.fuelAndPerformance.petrolMileageARAI],
                    ["Petrol Fuel Tank Capacity", selectedVariant1.fuelAndPerformance.petrolFuelTankCapacity, selectedVariant2.fuelAndPerformance.petrolFuelTankCapacity],
                    ["Emission Norm Compliance", selectedVariant1.fuelAndPerformance.emissionNormCompliance, selectedVariant2.fuelAndPerformance.emissionNormCompliance],
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

        <div>
          <Section title="Suspension, Steering & Brakes" id="Suspension, Steering & Brakes" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Front Suspension",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.frontSuspension,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.frontSuspension
                    ],
                    [
                      "Rear Suspension",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.rearSuspension,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.rearSuspension
                    ],
                    [
                      "Steering Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.steeringType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.steeringType
                    ],
                    [
                      "Steering Column",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.steeringColumn,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.steeringColumn
                    ],
                    ["Turning Radius",
                      selectedVariant1?.suspensionAndSteeringAndBrakes.turningRadius,
                      selectedVariant2?.suspensionAndSteeringAndBrakes.turningRadius
                    ],
                    [
                      "Front Brake Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.frontBrakeType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.frontBrakeType
                    ],
                    [
                      "Rear Brake Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.rearBrakeType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.rearBrakeType
                    ],
                     [
                      "Boot Space Rear Seat Folding", 
                      selectedVariant1?.suspensionAndSteeringAndBrakes.bootSpaceRearSeatFolding,
                      selectedVariant2?.suspensionAndSteeringAndBrakes.bootSpaceRearSeatFolding
                    ],
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>


         <div>
          <Section title="Dimensions & Capacity" id="Dimensions & Capacity" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Length",
                      selectedVariant1?.dimensionsAndCapacity?.length,
                      selectedVariant2?.dimensionsAndCapacity?.length
                    ],
                    [
                      "Width",
                      selectedVariant1?.dimensionsAndCapacity?.Width,
                      selectedVariant2?.dimensionsAndCapacity?.Width
                    ],
                    [
                      "Height",
                      selectedVariant1?.dimensionsAndCapacity?.height,
                      selectedVariant2?.dimensionsAndCapacity?.height
                    ],
                    [
                      "Boot Space",
                      selectedVariant1?.dimensionsAndCapacity?.bootSpace,
                      selectedVariant2?.dimensionsAndCapacity?.bootSpace
                    ],
                    [
                      "Seating Capacity",
                      selectedVariant1?.dimensionsAndCapacity?.seatingCapacity,
                      selectedVariant2?.dimensionsAndCapacity?.seatingCapacity
                    ],
                    [
                      "Ground Clearance Unladen", 
                      selectedVariant1?.dimensionsAndCapacity.groundClearanceUnladen,
                      selectedVariant2?.dimensionsAndCapacity.groundClearanceUnladen
                    ],
                    [
                      "Wheel Base",
                      selectedVariant1?.dimensionsAndCapacity?.wheelBase,
                      selectedVariant2?.dimensionsAndCapacity?.wheelBase
                    ],
                    [
                      "No. of Doors",
                      selectedVariant1?.dimensionsAndCapacity?.numOfDoors,
                      selectedVariant2?.dimensionsAndCapacity?.numOfDoors
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Comfort & Convenience" id="Comfort & Convenience" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Power Steering",
                      selectedVariant1?.comfortAndConvenience?.powerSteering,
                      selectedVariant2?.comfortAndConvenience?.powerSteering
                    ],
                    [
                      "Air Conditioner",
                      selectedVariant1?.comfortAndConvenience?.airConditioner,
                      selectedVariant2?.comfortAndConvenience?.airConditioner
                    ],
                    [
                      "Heater",
                      selectedVariant1?.comfortAndConvenience?.heater,
                      selectedVariant2?.comfortAndConvenience?.heater
                    ],
                    [
                      "Adjustable Steering",
                      selectedVariant1?.comfortAndConvenience?.adjustableSteering,
                      selectedVariant2?.comfortAndConvenience?.adjustableSteering
                    ],
                    [
                      "Height Adjustable Driver Seat",
                      selectedVariant1?.comfortAndConvenience?.heightAdjustableDriverSeat,
                      selectedVariant2?.comfortAndConvenience?.heightAdjustableDriverSeat
                    ],
                    [
                      "Ventilated Seats",
                      selectedVariant1?.comfortAndConvenience?.ventilatedSeats,
                      selectedVariant2?.comfortAndConvenience?.ventilatedSeats
                    ],
                    [
                      "Electric Adjustable Seats",
                      selectedVariant1?.comfortAndConvenience?.electricAdjustableSeats,
                      selectedVariant2?.comfortAndConvenience?.electricAdjustableSeats
                    ],
                    [
                      "Automatic Climate Control",
                      selectedVariant1?.comfortAndConvenience?.automaticClimateControl,
                      selectedVariant2?.comfortAndConvenience?.automaticClimateControl
                    ],
                    [
                      "Air Quality Control", 
                      selectedVariant1?.comfortAndConvenience.airQualityControl,
                      selectedVariant2?.comfortAndConvenience.airQualityControl
                    ],
                    [
                      "Accessory Power Outlet",
                      selectedVariant1?.comfortAndConvenience?.accessoryPowerOutlet,
                      selectedVariant2?.comfortAndConvenience?.accessoryPowerOutlet
                    ],
                    [
                      "Trunk Light",
                      selectedVariant1?.comfortAndConvenience?.trunkLight,
                      selectedVariant2?.comfortAndConvenience?.trunkLight
                    ],
                    [
                      "Vanity Mirror",
                      selectedVariant1?.comfortAndConvenience?.vanityMirror,
                      selectedVariant2?.comfortAndConvenience?.vanityMirror
                    ],
                    ["Rear Reading Lamp", 
                      selectedVariant1?.comfortAndConvenience?.rearReadingLamp,
                      selectedVariant2?.comfortAndConvenience?.rearReadingLamp
                    ],
                    [
                      "Rear Seat Headrest",
                      selectedVariant1?.comfortAndConvenience?.rearSeatHeadrest,
                      selectedVariant2?.comfortAndConvenience?.rearSeatHeadrest
                    ],
                    [
                      "Adjustable Headrest",
                      selectedVariant1?.comfortAndConvenience?.adjustableHeadrest,
                      selectedVariant2?.comfortAndConvenience?.adjustableHeadrest
                    ],
                    [
                      "Rear Seat Centre Arm Rest",
                      selectedVariant1?.comfortAndConvenience?.rearSeatCentreArmRest,
                      selectedVariant2?.comfortAndConvenience?.rearSeatCentreArmRest
                    ],
                     [
                      "Height Adjustable Front Seat Belts", 
                      selectedVariant1?.comfortAndConvenience.heightAdjustableFrontSeatBelts,
                      selectedVariant2?.comfortAndConvenience.heightAdjustableFrontSeatBelts
                    ],
                    [
                      "Rear AC Vents",
                      selectedVariant1?.comfortAndConvenience?.rearACVents,
                      selectedVariant2?.comfortAndConvenience?.rearACVents
                    ],
                    [
                      "Cruise Control",
                      selectedVariant1?.comfortAndConvenience?.cruiseControl,
                      selectedVariant2?.comfortAndConvenience?.cruiseControl
                    ],
                    [
                      "Parking Sensors",
                      selectedVariant1?.comfortAndConvenience?.parkingSensors,
                      selectedVariant2?.comfortAndConvenience?.parkingSensors
                    ],
                    [
                      "Foldable Rear Seat",
                      selectedVariant1?.comfortAndConvenience?.foldableRearSeat,
                      selectedVariant2?.comfortAndConvenience?.foldableRearSeat
                    ],
                    [
                      "Smart Access Card Entry",
                      selectedVariant1?.comfortAndConvenience?.smartAccessCardEntry,
                      selectedVariant2?.comfortAndConvenience?.smartAccessCardEntry
                    ],
                    [
                      "KeyLess Entry",
                      selectedVariant1?.comfortAndConvenience?.keyLessEntry,
                      selectedVariant2?.comfortAndConvenience?.keyLessEntry
                    ],
                    [
                      "Engine Start/Stop Button",
                      selectedVariant1?.comfortAndConvenience?.engineStartStopButton,
                      selectedVariant2?.comfortAndConvenience?.engineStartStopButton
                    ],
                    [
                      "Cooled Glovebox",
                      selectedVariant1?.comfortAndConvenience?.cooledGlovebox,
                      selectedVariant2?.comfortAndConvenience?.cooledGlovebox
                    ],
                    [
                      "Voice Commands",
                      selectedVariant1?.comfortAndConvenience?.voiceCommands,
                      selectedVariant2?.comfortAndConvenience?.voiceCommands
                    ],
                    [
                      "Paddle Shifters",
                      selectedVariant1?.comfortAndConvenience?.paddleShifters,
                      selectedVariant2?.comfortAndConvenience?.paddleShifters
                    ],
                    [
                      "USB Charger",
                      selectedVariant1?.comfortAndConvenience?.usbCharger,
                      selectedVariant2?.comfortAndConvenience?.usbCharger
                    ],
                    [
                      "Central Console Armrest",
                      selectedVariant1?.comfortAndConvenience?.centralConsoleArmrest,
                      selectedVariant2?.comfortAndConvenience?.centralConsoleArmrest
                    ],
                    [
                      "Tailgate Ajar Warning", 
                      selectedVariant1?.comfortAndConvenience.tailgateAjarWarning,
                      selectedVariant2?.comfortAndConvenience.tailgateAjarWarning
                    ],
                    [
                      "Hands-Free Tailgate", 
                      selectedVariant1?.comfortAndConvenience.handsFreeTailgate,
                      selectedVariant2?.comfortAndConvenience.handsFreeTailgate
                    ],
                    [
                      "Drive Modes",
                      selectedVariant1?.comfortAndConvenience?.driveModes,
                      selectedVariant2?.comfortAndConvenience?.driveModes
                    ],
                    [
                      "Idle Start-Stop System",
                      selectedVariant1?.comfortAndConvenience?.idleStartStopSystem,
                      selectedVariant2?.comfortAndConvenience?.idleStartStopSystem
                    ],
                    [
                      "Rear Window Sunblind",
                      selectedVariant1?.comfortAndConvenience?.rearWindowSunblind,
                      selectedVariant2?.comfortAndConvenience?.rearWindowSunblind
                    ],
                    [
                      "Automatic Headlamps",
                      selectedVariant1?.comfortAndConvenience?.automaticHeadlamps,
                      selectedVariant2?.comfortAndConvenience?.automaticHeadlamps
                    ],
                    [
                      "Follow Me Home Headlamps",
                      selectedVariant1?.comfortAndConvenience?.followMeHomeHeadlamps,
                      selectedVariant2?.comfortAndConvenience?.followMeHomeHeadlamps
                    ],
                    [
                      "Voice assisted sunroof",
                      selectedVariant1?.comfortAndConvenience?.voiceassistedsunroof,
                      selectedVariant2?.comfortAndConvenience?.voiceassistedsunroof
                    ],
                    [
                      "Drive Mode Types",
                      selectedVariant1?.comfortAndConvenience?.driveModeTypes,
                      selectedVariant2?.comfortAndConvenience?.driveModeTypes
                    ],
                    [
                      "Power Windows",
                      selectedVariant1?.comfortAndConvenience?.powerWindows,
                      selectedVariant2?.comfortAndConvenience?.powerWindows
                    ],
                    [
                      "Cup Holders",
                      selectedVariant1?.comfortAndConvenience?.cupholders,
                      selectedVariant2?.comfortAndConvenience?.cupholders
                    ]
                  ]
                  .map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Interior" id="Interior" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Tachometer",
                      selectedVariant1?.interior?.tachometer,
                      selectedVariant2?.interior?.tachometer
                    ],
                    [
                      "Leather Wrapped Steering Wheel", 
                      selectedVariant1?.interior.leatherWrappedSteeringWheel,
                      selectedVariant2?.interior.leatherWrappedSteeringWheel
                    ],
                    [
                      "Leather wrap gear-shift selector", 
                      selectedVariant1.interior.leatherwrapgearshiftselector,
                      selectedVariant2.interior.leatherwrapgearshiftselector
                    ],
                    [
                      "Glove Box",
                      selectedVariant1?.interior?.gloveBox,
                      selectedVariant2?.interior?.gloveBox
                    ],
                    [
                      "Digital Cluster",
                      selectedVariant1?.interior?.digitalCluster,
                      selectedVariant2?.interior?.digitalCluster
                    ],
                    [
                      "Digital Cluster Size",
                      selectedVariant1?.interior?.digitalClusterSize,
                      selectedVariant2?.interior?.digitalClusterSize
                    ],
                    [
                      "Upholstery",
                      selectedVariant1?.interior?.upholstery,
                      selectedVariant2?.interior?.upholstery
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
                  <div className="flex justify-around">
                    <div className="space-y-4">
                      {car1.interiorImages.map((src: string,index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {car2.interiorImages.map((src: string, index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Exterior" id="Exterior" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Rain Sensing Wiper", 
                      selectedVariant1?.exterior.rainSensingWiper,
                      selectedVariant2?.exterior.rainSensingWiper
                    ],
                    [
                      "Rear Window Wiper",
                      selectedVariant1?.exterior?.rearWindowWiper,
                      selectedVariant2?.exterior?.rearWindowWiper
                    ],
                    [
                      "Rear Window Washer",
                      selectedVariant1?.exterior?.rearWindowWasher,
                      selectedVariant2?.exterior?.rearWindowWasher
                    ],
                    [
                      "Rear Window Defogger",
                      selectedVariant1?.exterior?.rearWindowDefogger,
                      selectedVariant2?.exterior?.rearWindowDefogger
                    ],
                    [
                      "Wheel Covers",
                      selectedVariant1?.exterior?.wheelCovers,
                      selectedVariant2?.exterior?.wheelCovers
                    ],
                    [
                      "Alloy Wheels",
                      selectedVariant1?.exterior?.alloyWheels,
                      selectedVariant2?.exterior?.alloyWheels
                    ],
                    [
                      "Power Antenna",
                      selectedVariant1?.exterior?.powerAntenna,
                      selectedVariant2?.exterior?.powerAntenna
                    ],
                    [
                      "Rear Spoiler",
                      selectedVariant1?.exterior?.rearSpoiler,
                      selectedVariant2?.exterior?.rearSpoiler
                    ],
                    [
                      "Outside Rear View Mirror Turn Indicators",
                      selectedVariant1?.exterior?.outsideRearViewMirrorTurnIndicators,
                      selectedVariant2?.exterior?.outsideRearViewMirrorTurnIndicators
                    ],
                    [
                      "Integrated Antenna", 
                      selectedVariant1.exterior.integratedAntenna,
                      selectedVariant2.exterior.integratedAntenna
                    ],
                    [
                      "Chrome Grille",
                      selectedVariant1?.exterior?.chromeGrille,
                      selectedVariant2?.exterior?.chromeGrille
                    ],
                    [
                      "Projector Headlamps",
                      selectedVariant1?.exterior?.projectorHeadlamps,
                      selectedVariant2?.exterior?.projectorHeadlamps
                    ],
                    [
                      "Cornering Foglamps", 
                      selectedVariant1.exterior.corneringFoglamps,
                      selectedVariant2.exterior.corneringFoglamps
                    ],
                    [
                      "Roof Rails",
                      selectedVariant1?.exterior?.roofRails,
                      selectedVariant2?.exterior?.roofRails
                    ],
                    [
                      "Automatic Headlamps",
                      selectedVariant1?.exterior?.automaticHeadlamps,
                      selectedVariant2?.exterior?.automaticHeadlamps
                    ],
                    [
                      "Fog Lights", 
                      selectedVariant1.exterior.fogLights,
                      selectedVariant2.exterior.fogLights
                    ],
                    [
                      "Antenna",
                      selectedVariant1?.exterior?.antenna,
                      selectedVariant2?.exterior?.antenna
                    ],
                    [
                      "Sunroof",
                      selectedVariant1?.exterior?.sunroof,
                      selectedVariant2?.exterior?.sunroof
                    ],
                    ["Boot Opening", 
                      selectedVariant1?.exterior.bootOpening,
                      selectedVariant2?.exterior.bootOpening
                    ],
                    [
                      "Puddle Lamps",
                      selectedVariant1?.exterior?.puddleLamps,
                      selectedVariant2?.exterior?.puddleLamps
                    ],
                    [
                      "Outside Rear View Mirror (ORVM)",
                      selectedVariant1?.exterior?.outsideRearViewMirror,
                      selectedVariant2?.exterior?.outsideRearViewMirror
                    ],
                    [
                      "Tyre Size",
                      selectedVariant1?.exterior?.tyreSize,
                      selectedVariant2?.exterior?.tyreSize
                    ],
                    [
                      "Tyre Type",
                      selectedVariant1?.exterior?.tyreType,
                      selectedVariant2?.exterior?.tyreType
                    ],
                    [
                      "Wheel Size",
                      selectedVariant1?.exterior?.wheelSize,
                      selectedVariant2?.exterior?.wheelSize
                    ],
                    [
                      "LED DRLs",
                      selectedVariant1?.exterior?.ledDRLs,
                      selectedVariant2?.exterior?.ledDRLs
                    ],
                    [
                      "LED Headlamps", 
                      selectedVariant1?.exterior.ledHeadlamps,
                      selectedVariant2?.exterior.ledHeadlamps
                    ],
                    [
                      "LED Taillights",
                      selectedVariant1?.exterior?.ledTaillights,
                      selectedVariant2?.exterior?.ledTaillights
                    ],
                    [
                      "LED Fog Lamps", 
                      selectedVariant1?.exterior.ledFogLamps,
                      selectedVariant2?.exterior.ledFogLamps
                    ],
                    [
                      "Additional Features", 
                      selectedVariant1?.exterior.additionalFeatures,
                      selectedVariant2?.exterior.additionalFeatures
                    ],
                  ]
                  .map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
                  <div className="flex gap-2 justify-around">
                    <div className="space-y-4">
                      {car1.exteriorImages.map((src: string,index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {car2.exteriorImages.map((src: string, index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                  </div>
            </Section>
        </div>


         <div>
          <Section title="Safety" id="Safety" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Anti-lock Braking System (ABS)",
                      selectedVariant1?.safety?.antilockBrakingSystem,
                      selectedVariant2?.safety?.antilockBrakingSystem
                    ],
                    [
                      "Brake Assist", 
                      selectedVariant1?.safety.brakeAssist,
                      selectedVariant2?.safety.brakeAssist
                    ],
                    [
                      "Central Locking",
                      selectedVariant1?.safety?.centralLocking,
                      selectedVariant2?.safety?.centralLocking
                    ],
                    [
                      "Child Safety Locks",
                      selectedVariant1?.safety?.childSafetyLocks,
                      selectedVariant2?.safety?.childSafetyLocks
                    ],
                    [
                      "Anti-Theft Alarm",
                      selectedVariant1?.safety?.antiTheftAlarm,
                      selectedVariant2?.safety?.antiTheftAlarm
                    ],
                    [
                      "No. of Airbags",
                      selectedVariant1?.safety?.numOfAirbags,
                      selectedVariant2?.safety?.numOfAirbags
                    ],
                    [
                      "Driver Airbag",
                      selectedVariant1?.safety?.driverAirbag,
                      selectedVariant2?.safety?.driverAirbag
                    ],
                    [
                      "Passenger Airbag",
                      selectedVariant1?.safety?.passengerAirbag,
                      selectedVariant2?.safety?.passengerAirbag
                    ],
                    [
                      "Side Airbag",
                      selectedVariant1?.safety?.sideAirbag,
                      selectedVariant2?.safety?.sideAirbag
                    ],
                    [
                      "Side Airbag-Rear",
                      selectedVariant1?.safety?.sideAirbagRear,
                      selectedVariant2?.safety?.sideAirbagRear
                    ],
                    [
                      "Day & Night Rear View Mirror",
                      selectedVariant1?.safety?.dayandNightRearViewMirror,
                      selectedVariant2?.safety?.dayandNightRearViewMirror
                    ],
                    [
                      "Curtain Airbag",
                      selectedVariant1?.safety?.curtainAirbag,
                      selectedVariant2?.safety?.curtainAirbag
                    ],
                    [
                      "Electronic Brakeforce Distribution (EBD)",
                      selectedVariant1?.safety?.electronicBrakeforceDistribution,
                      selectedVariant2?.safety?.electronicBrakeforceDistribution
                    ],
                    [
                      "Seat Belt Warning",
                      selectedVariant1?.safety?.seatBeltWarning,
                      selectedVariant2?.safety?.seatBeltWarning
                    ],
                    [
                      "Door Ajar Warning",
                      selectedVariant1?.safety?.doorAjarWarning,
                      selectedVariant2?.safety?.doorAjarWarning
                    ],
                    [
                      "Traction Control",
                      selectedVariant1?.safety?.tractionControl,
                      selectedVariant2?.safety?.tractionControl
                    ],
                    [
                      "Tyre Pressure Monitoring System (TPMS)",
                      selectedVariant1?.safety?.tyrePressureMonitoringSystem,
                      selectedVariant2?.safety?.tyrePressureMonitoringSystem
                    ],
                    [
                      "Engine Immobilizer",
                      selectedVariant1?.safety?.engineImmobilizer,
                      selectedVariant2?.safety?.engineImmobilizer
                    ],
                    [
                      "Electronic Stability Control (ESC)",
                      selectedVariant1?.safety?.electronicStabilityControl,
                      selectedVariant2?.safety?.electronicStabilityControl
                    ],
                    [
                      "Rear Camera",
                      selectedVariant1?.safety?.rearCamera,
                      selectedVariant2?.safety?.rearCamera
                    ],
                    [
                      "Speed Alert",
                      selectedVariant1?.safety?.speedAlert,
                      selectedVariant2?.safety?.speedAlert
                    ],
                    [
                      "Speed Sensing Auto Door Lock",
                      selectedVariant1?.safety?.speedSensingAutoDoorLock,
                      selectedVariant2?.safety?.speedSensingAutoDoorLock
                    ],
                    [
                      "ISOFIX Child Seat Mounts",
                      selectedVariant1?.safety?.iSOFIXChildSeatMounts,
                      selectedVariant2?.safety?.iSOFIXChildSeatMounts
                    ],
                    [
                      "Heads-Up Display (HUD)", 
                      selectedVariant1?.safety.headsUpDisplay,
                      selectedVariant2?.safety.headsUpDisplay
                    ],
                    [
                      "Pretensioners & Force Limiter Seatbelts",
                      selectedVariant1?.safety?.pretensionersandForceLimiterSeatbelts,
                      selectedVariant2?.safety?.pretensionersandForceLimiterSeatbelts
                    ],
                    [
                      "Blind Spot Camera",
                      selectedVariant1?.safety?.blindSpotCamera,
                      selectedVariant2?.safety?.blindSpotCamera
                    ],
                    [
                      "Hill Descent Control", 
                      selectedVariant1?.safety.hillDescentControl,
                      selectedVariant2?.safety.hillDescentControl
                    ],
                    [
                      "Hill Assist",
                      selectedVariant1?.safety?.hillAssist,
                      selectedVariant2?.safety?.hillAssist
                    ],
                    [
                      "Impact Sensing Auto Door Unlock",
                      selectedVariant1?.safety?.impactSensingAutoDoorUnlock,
                      selectedVariant2?.safety?.impactSensingAutoDoorUnlock
                    ],
                    [
                      "360 View Camera",
                      selectedVariant1?.safety?._360ViewCamera,
                      selectedVariant2?.safety?._360ViewCamera
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Entertainment & Communication" id="Entertainment & Communication" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Radio",
                      selectedVariant1?.entertainmentAndCommunication?.radio,
                      selectedVariant2?.entertainmentAndCommunication?.radio
                    ],
                    [
                      "Wireless Phone Charging",
                      selectedVariant1?.entertainmentAndCommunication?.wirelessPhoneCharging,
                      selectedVariant2?.entertainmentAndCommunication?.wirelessPhoneCharging
                    ],
                    [
                      "Bluetooth Connectivity",
                      selectedVariant1?.entertainmentAndCommunication?.bluetoothConnectivity,
                      selectedVariant2?.entertainmentAndCommunication?.bluetoothConnectivity
                    ],
                    [
                      "Touchscreen",
                      selectedVariant1?.entertainmentAndCommunication?.touchscreen,
                      selectedVariant2?.entertainmentAndCommunication?.touchscreen
                    ],
                    [
                      "Touchscreen Size",
                      selectedVariant1?.entertainmentAndCommunication?.touchscreenSize,
                      selectedVariant2?.entertainmentAndCommunication?.touchscreenSize
                    ],
                    [
                      "Android Auto",
                      selectedVariant1?.entertainmentAndCommunication?.androidAuto,
                      selectedVariant2?.entertainmentAndCommunication?.androidAuto
                    ],
                    [
                      "Apple CarPlay",
                      selectedVariant1?.entertainmentAndCommunication?.appleCarPlay,
                      selectedVariant2?.entertainmentAndCommunication?.appleCarPlay
                    ],
                    [
                      "No. of Speakers",
                      selectedVariant1?.entertainmentAndCommunication?.numOfSpeakers,
                      selectedVariant2?.entertainmentAndCommunication?.numOfSpeakers
                    ],
                    [
                      "Usb Ports",
                      selectedVariant1?.entertainmentAndCommunication?.usbPorts,
                      selectedVariant2?.entertainmentAndCommunication?.usbPorts
                    ],
                    [
                      "Additional Features",
                      selectedVariant1?.entertainmentAndCommunication?.additionalFeatures,
                      selectedVariant2?.entertainmentAndCommunication?.additionalFeatures
                    ],
                    [
                      "Tweeters", 
                      selectedVariant1?.entertainmentAndCommunication.tweeters,
                      selectedVariant2?.entertainmentAndCommunication.tweeters,
                    ],
                    [
                      "Speakers",
                      selectedVariant1?.entertainmentAndCommunication?.speakers,
                      selectedVariant2?.entertainmentAndCommunication?.speakers
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="ADAS Feature" id="ADAS Feature" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    ["Blind Spot Monitor",
                      selectedVariant1?.ADASFeature?.blindSpotMonitor,
                      selectedVariant2?.ADASFeature?.blindSpotMonitor
                    ],
                    ["Forward Collision Warning",
                      selectedVariant1?.ADASFeature?.forwardCollisionWarning,
                      selectedVariant2?.ADASFeature?.forwardCollisionWarning
                    ],
                    ["Automatic Emergency Braking",
                      selectedVariant1?.ADASFeature?.automaticEmergencyBraking,
                      selectedVariant2?.ADASFeature?.automaticEmergencyBraking
                    ],
                    ["Speed Assist System",
                      selectedVariant1?.ADASFeature?.speedAssistSystem,
                      selectedVariant2?.ADASFeature?.speedAssistSystem
                    ],
                    ["Traffic Sign Recognition",
                      selectedVariant1?.ADASFeature?.trafficSignRecognition,
                      selectedVariant2?.ADASFeature?.trafficSignRecognition
                    ],
                    ["Blind Spot Collision Avoidance Assist",
                      selectedVariant1?.ADASFeature?.blindSpotCollisionAvoidanceAssist,
                      selectedVariant2?.ADASFeature?.blindSpotCollisionAvoidanceAssist
                    ],
                    ["Lane Departure Warning",
                      selectedVariant1?.ADASFeature?.laneDepartureWarning,
                      selectedVariant2?.ADASFeature?.laneDepartureWarning
                    ],
                    ["Lane Keep Assist",
                      selectedVariant1?.ADASFeature?.laneKeepAssist,
                      selectedVariant2?.ADASFeature?.laneKeepAssist
                    ],
                    ["Lane Departure Prevention Assist",
                      selectedVariant1?.ADASFeature?.laneDeparturePreventionAssist,
                      selectedVariant2?.ADASFeature?.laneDeparturePreventionAssist
                    ],
                    ["Driver Attention Warning",
                      selectedVariant1?.ADASFeature?.driverAttentionWarning,
                      selectedVariant2?.ADASFeature?.driverAttentionWarning
                    ],
                    ["Adaptive Cruise Control",
                      selectedVariant1?.ADASFeature?.adaptiveCruiseControl,
                      selectedVariant2?.ADASFeature?.adaptiveCruiseControl
                    ],
                    ["Adaptive High Beam Assist",
                      selectedVariant1?.ADASFeature?.adaptiveHighBeamAssist,
                      selectedVariant2?.ADASFeature?.adaptiveHighBeamAssist
                    ],
                    ["Rear Cross Traffic Alert",
                      selectedVariant1?.ADASFeature?.rearCrossTrafficAlert,
                      selectedVariant2?.ADASFeature?.rearCrossTrafficAlert
                    ],
                    ["Rear Cross Traffic Collision-Avoidance Assist",
                      selectedVariant1?.ADASFeature?.rearCrossTrafficCollisionAvoidanceAssist,
                      selectedVariant2?.ADASFeature?.rearCrossTrafficCollisionAvoidanceAssist
                    ],
                  ].map(([label, value1, value2], idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                    <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                    <div className="px-4 py-2 border flex justify-around rounded-lg">
                        <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                        <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                    </div>
                    </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Advance Internet Feature" id="Advance Internet Feature" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Over the Air (OTA) Updates",
                      selectedVariant1?.advanceInternetFeature?.overAirUpdates,
                      selectedVariant2?.advanceInternetFeature?.overAirUpdates
                    ],
                    [
                      "Remote Vehicle Ignition Start/Stop",
                      selectedVariant1?.advanceInternetFeature?.remoteVehicleIgnitionStartStop,
                      selectedVariant2?.advanceInternetFeature?.remoteVehicleIgnitionStartStop
                    ],
                    [
                      "Inbuilt APPs",
                      selectedVariant1?.advanceInternetFeature?.inbuiltApps,
                      selectedVariant2?.advanceInternetFeature?.inbuiltApps
                    ],
                    [
                      "Navigation with Live Traffic", 
                      selectedVariant1?.advanceInternetFeature.navigationwithLiveTraffic,
                      selectedVariant2?.advanceInternetFeature.navigationwithLiveTraffic
                    ],
                    [
                      "E-Call & I-Call", 
                      selectedVariant1?.advanceInternetFeature.ecallAndIcall,
                      selectedVariant2?.advanceInternetFeature.ecallAndIcall
                    ],
                    [
                      "Google / Alexa Connectivity ", 
                      selectedVariant1?.advanceInternetFeature.googleAlexaConnectivity,
                      selectedVariant2?.advanceInternetFeature.googleAlexaConnectivity
                    ],
                    [
                      "SOS Button", 
                      selectedVariant1?.advanceInternetFeature.SOSButton,
                      selectedVariant2?.advanceInternetFeature.SOSButton
                    ],
                  ].map(([label, value1, value2], idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                    <p className="text-center py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                    <div className="px-4 py-2 border flex justify-around rounded-lg">
                        <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                        <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                    </div>
                    </div>
                  ))}
                  </div>
            </Section>
        </div>
                      
      </div>

    <div className="mt-6 border border-gray-200 p-5 rounded-2xl mx-auto max-w-4xl">
    <h2 className="text-xl font-medium mb-2">
      Pros & Cons
    </h2>
    <div className="flex gap-4 mb-2">
      <button className={selectedTab == 'pros' ? 'border-b border-orange-600' : ''} onClick={()=> setSelectedTab('pros')}>Pros</button>
      <button className={selectedTab == 'cons' ? 'border-b border-orange-600' : ''} onClick={()=> setSelectedTab('cons')}>Cons</button>
    </div>

    {selectedTab == 'pros' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#f5fbf8] p-4 rounded-xl border border-emerald-100">
          <h3 className="font-medium text-emerald-600 mb-2">{car1.brand.charAt(0).toUpperCase() + car1.brand.slice(1)} {car1.modelName.charAt(0).toUpperCase() + car1.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car1.pros?.map((p: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-gray-700m w-[90%]">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#f5fbf8] p-4 rounded-xl border border-emerald-100">
        <h3 className="font-medium text-emerald-600 mb-2">{car2.brand.charAt(0).toUpperCase() + car2.brand.slice(1)} {car2.modelName.charAt(0).toUpperCase() + car2.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car2.pros?.map((p: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-gray-700m w-[90%]">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#fff5f5] p-4 rounded-xl border border-red-100">
        <h3 className="font-medium text-red-600 mb-2">{car1.brand.charAt(0).toUpperCase() + car1.brand.slice(1)} {car1.modelName.charAt(0).toUpperCase() + car1.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car1.cons?.map((c: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-600"></span>
              <span className="text-gray-700 w-[90%]">{c}</span>
            </li>
          ))}
        </ul>
      </div>

        <div className="bg-[#fff5f5] p-4 rounded-xl border border-red-100">
        <h3 className="font-medium text-red-600 mb-2">{car2.brand.charAt(0).toUpperCase() + car2.brand.slice(1)} {car2.modelName.charAt(0).toUpperCase() + car2.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car2.cons?.map((c: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-600"></span>
              <span className="text-gray-700 w-[90%]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )}
  
</div>

    </div>
  );
};

export default ComparePageDetails;


  type SectionId =
    | 'Engine & Transmission'
    | 'Fuel & Performance'
    | 'Suspension, Steering & Brakes'
    | 'suspension'
    | 'Dimensions & Capacity'
    | 'Comfort & Convenience'
    | 'Interior'
    | 'Exterior'
    | 'Safety'
    | 'Entertainment & Communication'
    | 'ADAS Feature'
    | 'Advance Internet Feature';

  type SectionProps = {
    title: string;
    id: SectionId;
    expandedSections: any;
    toggleSection: any;
    children?: React.ReactNode;
  };

const Section: React.FC<SectionProps> = ({ title, id, children, expandedSections, toggleSection }) => (
  <div className="overflow-hidden">
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full border-b px-4 py-3 flex justify-between items-center"
    >
      <h3 className="font-semibold text-left">{title}</h3>
      {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expandedSections[id] && <div className="p-4">{children}</div>}
  </div>
);
