export interface Snowmobile {
  id: string;
  title: string;
  price: number;
  make: string;
  model: string;
  year: number;
  condition: 'New' | 'Used' | 'Parts';
  mileage: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    suspension: string;
    track: string;
  };
  seller: {
    id: string;
    name: string;
    rating: number;
    avatar: string;
  };
  createdAt: string;
}