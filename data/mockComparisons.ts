import { Car } from '@/types/Car';

export interface ComparisonPair {
  leftCar: Car;
  rightCar: Car;
}

export const mockComparisons: any[] = [
  {
    leftCar: {
      _id: 'compare-1-left',
      name: 'Range Rover Evoque',
      brand: 'Land Rover',
      category: 'SUV',
      price: 9987000,
      mileage: 12.5,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seatingCapacity: 5,
      engineCapacity: '2.0L',
      images: [
        'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Luxury compact SUV with premium features and elegant design.',
      keyFeatures: ['Premium Interior', 'Advanced Safety', 'All-Wheel Drive', 'Touchscreen Infotainment'],
      specifications: {
        length: '4371mm',
        width: '1900mm',
        height: '1635mm',
        wheelbase: '2681mm',
        groundClearance: '212mm',
        bootSpace: '550L'
      },
      colors: ['White', 'Silver', 'Black', 'Blue'],
      isLatest: true,
      isFeatured: true,
      isSold: false,
      year: 2023,
      imageCount: 8,
      seller: {
        name: 'Luxury Motors',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2023-06-15'
    },
    rightCar: {
      _id: 'compare-1-right',
      name: 'D-Max',
      brand: 'Isuzu',
      category: 'SUV',
      price: 3520000,
      mileage: 15.2,
      fuelType: 'Diesel',
      transmission: 'Manual',
      seatingCapacity: 5,
      engineCapacity: '3.0L',
      images: [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Rugged pickup truck with excellent towing capacity and durability.',
      keyFeatures: ['High Towing Capacity', '4WD System', 'Durable Build', 'Spacious Cabin'],
      specifications: {
        length: '5295mm',
        width: '1860mm',
        height: '1795mm',
        wheelbase: '3095mm',
        groundClearance: '235mm',
        bootSpace: '1200L'
      },
      colors: ['White', 'Silver', 'Red', 'Blue'],
      isLatest: false,
      isFeatured: false,
      isSold: false,
      year: 2022,
      imageCount: 6,
      seller: {
        name: 'Commercial Vehicles',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2022-03-10'
    }
  },
  {
    leftCar: {
      _id: 'compare-2-left',
      name: 'Aeolus',
      brand: 'Dongfeng',
      category: 'Sedan',
      price: 2233900,
      mileage: 18.5,
      fuelType: 'Petrol',
      transmission: 'Manual',
      seatingCapacity: 5,
      engineCapacity: '1.5L',
      images: [
        'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Affordable sedan with good fuel efficiency and modern features.',
      keyFeatures: ['Fuel Efficient', 'Modern Design', 'Comfortable Interior', 'Value for Money'],
      specifications: {
        length: '4650mm',
        width: '1820mm',
        height: '1480mm',
        wheelbase: '2700mm',
        groundClearance: '150mm',
        bootSpace: '480L'
      },
      colors: ['White', 'Silver', 'Black'],
      isLatest: false,
      isFeatured: false,
      isSold: false,
      year: 2022,
      imageCount: 5,
      seller: {
        name: 'Budget Cars',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2022-08-20'
    },
    rightCar: {
      _id: 'compare-2-right',
      name: 'Camry 2025',
      brand: 'Toyota',
      category: 'Sedan',
      price: 3321300,
      mileage: 16.8,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seatingCapacity: 5,
      engineCapacity: '2.5L',
      images: [
        'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Reliable mid-size sedan with excellent build quality and resale value.',
      keyFeatures: ['Reliable Engine', 'Premium Interior', 'Advanced Safety', 'Good Resale Value'],
      specifications: {
        length: '4885mm',
        width: '1840mm',
        height: '1455mm',
        wheelbase: '2825mm',
        groundClearance: '160mm',
        bootSpace: '524L'
      },
      colors: ['White', 'Silver', 'Black', 'Red'],
      isLatest: true,
      isFeatured: true,
      isSold: false,
      year: 2025,
      imageCount: 7,
      seller: {
        name: 'Toyota Premium',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2024-12-01'
    }
  },
  {
    leftCar: {
      _id: 'compare-3-left',
      name: 'Carnival MPV',
      brand: 'Kia',
      category: 'SUV',
      price: 4875000,
      mileage: 14.2,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seatingCapacity: 7,
      engineCapacity: '2.2L',
      images: [
        'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Spacious MPV perfect for large families with premium comfort features.',
      keyFeatures: ['7-Seater', 'Spacious Interior', 'Premium Comfort', 'Advanced Technology'],
      specifications: {
        length: '5115mm',
        width: '1985mm',
        height: '1790mm',
        wheelbase: '3060mm',
        groundClearance: '185mm',
        bootSpace: '627L'
      },
      colors: ['White', 'Silver', 'Black', 'Blue'],
      isLatest: true,
      isFeatured: true,
      isSold: false,
      year: 2022,
      imageCount: 6,
      seller: {
        name: 'Family Cars',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2022-11-15'
    },
    rightCar: {
      _id: 'compare-3-right',
      name: 'Kicks 2022',
      brand: 'Nissan',
      category: 'SUV',
      price: 1799000,
      mileage: 20.1,
      fuelType: 'Petrol',
      transmission: 'Manual',
      seatingCapacity: 5,
      engineCapacity: '1.6L',
      images: [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Compact SUV with excellent fuel efficiency and urban-friendly design.',
      keyFeatures: ['Fuel Efficient', 'Compact Design', 'Easy to Drive', 'Affordable Maintenance'],
      specifications: {
        length: '4295mm',
        width: '1760mm',
        height: '1628mm',
        wheelbase: '2620mm',
        groundClearance: '200mm',
        bootSpace: '400L'
      },
      colors: ['White', 'Silver', 'Red', 'Blue'],
      isLatest: false,
      isFeatured: false,
      isSold: false,
      year: 2022,
      imageCount: 5,
      seller: {
        name: 'Nissan Direct',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      launchDate: '2022-05-10'
    }
  }
];
