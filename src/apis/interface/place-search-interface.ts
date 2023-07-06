interface PlaceSearchRes {
  html_attributions: any[]
  results: Result[]
  status: string
}

interface Result {
  formatted_address: string
  geometry: Geometry
  icon: string
  name: string
  photos: Photo[]
  place_id: string
  reference: string
  types: string[]
}

interface Photo {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

interface Geometry {
  location: Location
  viewport: Viewport
}

interface Viewport {
  northeast: Location
  southwest: Location
}

interface Location {
  lat: number
  lng: number
}

interface SearchRes {
  name: string
  total_records: number
}

interface SearchRes {
  data: SearchResData[]
  total_records: number
}

interface SearchResData {
  id: number
  is_active: boolean
  name: string
  type: string
  stars: number
  description: string
  longitude: number
  latitude: number
  follow_summary: number
  car_park: number
  language: string[]
  breakfast: number
  contact: Contact
  city: string
  zipcode: string
  province: string
  address: string
  address_more: string
  create_at: string
  updated_at: string
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

export type { PlaceSearchRes, SearchRes }
