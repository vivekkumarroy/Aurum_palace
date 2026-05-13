export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; image?: string }[];
}

export interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  image: string;
  imageNight?: string;
  description: string;
  amenities: string[];
  badge?: string;
  featured?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  location: string;
  priceRange: string;
  tag: string;
  chef: string;
  chefImage: string;
}

export interface Destination {
  name: string;
  country: string;
  tagline: string;
  image: string;
  properties: number;
  tag: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  stay: string;
}

export interface GalleryItem {
  src: string;
  category: string;
  title: string;
  tall?: boolean;
}
