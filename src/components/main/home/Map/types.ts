export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: Location;
  address: string;
  phone?: string;
  hours?: string;
  distance?: number;
  logo?: string;
  isPartner?: boolean; // true if pharmacy comes from database (partner pharmacy)
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
