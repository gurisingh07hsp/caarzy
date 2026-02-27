import PricePage from '@/components/PricePage';
import VariantDetails from '@/components/VariantDetails'
import {capitalizeString} from '@/hook/utils'
import { districtArray } from '@/hook/utils';
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
const variantPage = async({ params }: BrandPageProps) => {
  const {variant} = await params;
  return (
    <div>
      {variant.toString().includes('price-in-') ? (
        <>
        {districtArray.includes(variant.toString().split('price-in-')[1]?.replace(/([A-Z])/g, ' $1').trim()) ? (
          <PricePage/>
        ) : (
          <div>Page not available in this location</div>
        )}
        </>
      ) : (
      <VariantDetails/>
      )}
    </div>
  )
}

export default variantPage
