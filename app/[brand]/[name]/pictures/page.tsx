import PicturesPage from '@/components/PicturesPage'
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
    title: `${capitalizeString(formattedBrand)} ${capitalizeString(formattedName)} Images – Interior, Exterior & Gallery`,
    description: `View ${formattedBrand} ${formattedName} images including interior, exterior and dashboard photos. Explore full HD gallery of all variants and design details.`,
      alternates:{
      canonical: `/${formattedBrand}/${formattedName}/pictures`
    } 
  };
}

const page = () => {
  return (
    <div>
      <PicturesPage/>
    </div>
  )
}

export default page
