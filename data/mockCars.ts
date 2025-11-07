import { Car } from '@/types/Car';

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'Creta',
    brand: 'Hyundai',
    category: 'SUV',
    price: 1200000,
    originalPrice: 1300000,
    mileage: 17.4,
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    engineCapacity: '1.5L',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Hyundai Creta is a premium compact SUV that combines style, comfort, and performance. With its bold design and advanced features, it offers an exceptional driving experience.',
    keyFeatures: ['Panoramic Sunroof', 'Wireless Charging', 'Digital Cluster', 'Ventilated Seats'],
    specifications: {
      length: '4300mm',
      width: '1790mm',
      height: '1635mm',
      wheelbase: '2610mm',
      groundClearance: '190mm',
      bootSpace: '433L'
    },
    colors: ['White', 'Silver', 'Red', 'Blue', 'Black'],
    isLatest: true,
    isFeatured: true,
    isSold: false,
    year: 2022,
    imageCount: 7,
    seller: {
      name: 'Ley Alex',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    launchDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Swift',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    price: 600000,
    originalPrice: 650000,
    mileage: 23.2,
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    engineCapacity: '1.2L',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Maruti Suzuki Swift is a popular hatchback known for its peppy performance, excellent fuel efficiency, and affordable maintenance.',
    keyFeatures: ['SmartPlay Infotainment', 'Keyless Entry', 'Dual Airbags', 'Central Locking'],
    specifications: {
      length: '3845mm',
      width: '1735mm',
      height: '1530mm',
      wheelbase: '2450mm',
      groundClearance: '163mm',
      bootSpace: '268L'
    },
    colors: ['White', 'Silver', 'Red', 'Blue'],
    isLatest: false,
    isFeatured: true,
    isSold: true,
    year: 2022,
    imageCount: 6,
    seller: {
      name: 'Ronal Rich',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    launchDate: '2023-08-10'
  },
  {
    id: '3',
    name: 'City',
    brand: 'Honda',
    category: 'Sedan',
    price: 1200000,
    mileage: 17.8,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    engineCapacity: '1.5L',
    images: [
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Honda City is a premium sedan that offers a perfect blend of comfort, technology, and performance for the modern urban driver.',
    keyFeatures: ['Honda Sensing', 'Sunroof', 'Cruise Control', 'LED Headlamps'],
    specifications: {
      length: '4549mm',
      width: '1748mm',
      height: '1489mm',
      wheelbase: '2600mm',
      groundClearance: '165mm',
      bootSpace: '506L'
    },
    colors: ['White', 'Silver', 'Grey', 'Black'],
    isLatest: true,
    isFeatured: true,
    isSold: false,
    year: 2022,
    imageCount: 7,
    seller: {
      name: 'Arlene McCoy',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    launchDate: '2024-02-20'
  },
  {
    id: '4',
    name: 'Fortuner',
    brand: 'Toyota',
    category: 'SUV',
    price: 3200000,
    mileage: 10.0,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seatingCapacity: 7,
    engineCapacity: '2.8L',
    images: [
      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Toyota Fortuner is a full-size SUV that delivers exceptional off-road capability, premium comfort, and robust build quality.',
    keyFeatures: ['4WD System', '9-inch Touchscreen', 'Premium Audio', 'Multi-terrain Select'],
    specifications: {
      length: '4795mm',
      width: '1855mm',
      height: '1835mm',
      wheelbase: '2745mm',
      groundClearance: '225mm',
      bootSpace: '296L'
    },
    colors: ['White', 'Silver', 'Grey', 'Black', 'Brown'],
    isLatest: true,
    isFeatured: true,
    isSold: false,
    year: 2024,
    imageCount: 6,
    seller: {
      name: 'Ronal Rich',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    launchDate: '2024-03-01'
  }
];