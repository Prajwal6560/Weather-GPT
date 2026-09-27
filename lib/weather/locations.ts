import { LocationInfo } from '@/types/weather';

export const POPULAR_INDIAN_LOCATIONS: LocationInfo[] = [
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    elevation: 920,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.2958,
    longitude: 76.6394,
    elevation: 763,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    elevation: 6,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Delhi',
    state: 'National Capital Territory',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    elevation: 216,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
    elevation: 14,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    latitude: 17.3850,
    longitude: 78.4867,
    elevation: 542,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    latitude: 22.5726,
    longitude: 88.3639,
    elevation: 9,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Kochi',
    state: 'Kerala',
    country: 'India',
    latitude: 9.9312,
    longitude: 76.2673,
    elevation: 3,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    latitude: 18.5204,
    longitude: 73.8567,
    elevation: 560,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Mangaluru',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.9141,
    longitude: 74.8560,
    elevation: 22,
    timezone: 'Asia/Kolkata',
  },
  {
    name: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    latitude: 20.2961,
    longitude: 85.8245,
    elevation: 45,
    timezone: 'Asia/Kolkata',
  },
];

export function findMatchingLocation(query: string): LocationInfo | null {
  const normalized = query.toLowerCase().trim();
  
  // Exact match
  const match = POPULAR_INDIAN_LOCATIONS.find(
    loc => loc.name.toLowerCase() === normalized ||
           loc.state?.toLowerCase() === normalized
  );
  if (match) return match;

  // Partial match
  const partial = POPULAR_INDIAN_LOCATIONS.find(
    loc => normalized.includes(loc.name.toLowerCase()) ||
           (loc.state && normalized.includes(loc.state.toLowerCase()))
  );
  if (partial) return partial;

  return null;
}
