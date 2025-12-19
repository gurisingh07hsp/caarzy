import { Brand } from '@/types/Brand';

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Hyundai',
    logo: '/brands-logo/hyundai-logo.png',
    description: 'South Korean automotive manufacturer known for reliability and innovation',
    carCount: 12,
    popularModels: ['Creta', 'i20', 'Verna', 'Tucson']
  },
  {
    id: '2',
    name: 'Maruti Suzuki',
    logo: '/brands-logo/suzuki-logo.jpg',
    description: 'India\'s largest car manufacturer with fuel-efficient vehicles',
    carCount: 15,
    popularModels: ['Swift', 'Baleno', 'Dzire', 'Vitara Brezza']
  },
  {
    id: '3',
    name: 'Honda',
    logo: '/brands-logo/honda-logo.jpg',
    description: 'Japanese automaker renowned for engineering excellence',
    carCount: 8,
    popularModels: ['City', 'Amaze', 'WR-V', 'CR-V']
  },
  {
    id: '4',
    name: 'Toyota',
    logo: '/brands-logo/toyota-logo.webp',
    description: 'World\'s leading automotive manufacturer with hybrid technology',
    carCount: 10,
    popularModels: ['Fortuner', 'Innova', 'Camry', 'Glanza']
  },
  {
    id: '5',
    name: 'Tata',
    logo: '/brands-logo/tata-logo.jpg',
    description: 'Indian automotive giant with innovative and safe vehicles',
    carCount: 9,
    popularModels: ['Nexon', 'Harrier', 'Safari', 'Altroz']
  },
  {
    id: '6',
    name: 'Mahindra',
    logo: '/brands-logo/mahindra-logo.png',
    description: 'Indian SUV specialist with rugged and reliable vehicles',
    carCount: 7,
    popularModels: ['XUV700', 'Scorpio', 'Thar', 'Bolero']
  }
];