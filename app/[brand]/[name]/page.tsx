import { CarDetail } from '@/components/CarDetail'
import {capitalizeString} from '@/hook/utils'
interface BrandPageProps {
  params: {
    brand: string;
    name: string;
  };
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand, name } = await params;

  const formattedBrand = decodeURIComponent(
    brand.replace(/-/g, " ")
  );

  const formattedName = decodeURIComponent(
    name.replace(/-/g, " ")
  );

  return {
    title: `${capitalizeString(formattedBrand)} ${capitalizeString(formattedName)} Price, Mileage, Images, Specs & Reviews`,
    description: `Explore ${formattedBrand} ${formattedName} price in India, mileage, specifications, features, variants and images. Compare with similar cars and find best deals.`,
    alternates:{
      canonical: `/${formattedBrand}/${formattedName}`
    } 
  };
}
const CarDetails = () => {
  return (
    <div>
      <CarDetail/>
    </div>
  )
}
export default CarDetails
