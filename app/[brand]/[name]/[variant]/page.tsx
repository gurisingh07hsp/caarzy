import VariantDetails from '@/components/VariantDetails'
import {capitalizeString} from '@/hook/utils'
interface BrandPageProps {
  params: {
    brand: string;
    variant: string;
  };
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand, variant } = await params;

  const formattedBrand = decodeURIComponent(
    brand.replace(/-/g, " ")
  );

  return {
    title: `${capitalizeString(formattedBrand)} ${variant} on-road Price, Mileage & Features`,
    description: `View ${formattedBrand} ${variant} price, mileage, engine specs, features and on-road price. Check images and compare variants easily.`,
  };
}
const variantPage = () => {
  return (
    <div>
      <VariantDetails/>
    </div>
  )
}

export default variantPage
