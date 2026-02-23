import BrandCarsPage from '@/components/BrandCarsPage'
import {capitalizeString} from '@/hook/utils'
interface BrandPageProps {
  params: {
    brand: string;
  };
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand } = await params;

  const formattedBrand = decodeURIComponent(
    brand.replace(/-/g, " ")
  );

  return {
    title: `${capitalizeString(formattedBrand)} Cars Price in India ${new Date().getFullYear()} – Models, Mileage, Specs`,
    description: `Check all ${formattedBrand} cars in India with latest price, mileage, specifications and images. Compare top ${formattedBrand} models and choose the best car.`,
  };
}

const page = () => {
  return (
    <div>
      <BrandCarsPage/>
    </div>
  )
}

export default page
