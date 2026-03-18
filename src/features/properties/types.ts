export type PropertyType = 'apartment' | 'house' | 'self-contained' | 'hostel' | 'lodge' | 'hotel';

export interface Property {
  id: number;
  title: string;
  location: string;
  locationId: string;
  price: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: number;
  tag?: string | null;
  image: string;
  description: string;
  virtualTour?: boolean;
}
