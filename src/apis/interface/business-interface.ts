// Get All
interface Business {
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
  min_cost: number
  max_cost: number
  facility: Facility[]
  images?: Image[]
}

interface BusinessGetAllRes {
  page: number
  page_size: number
  data: Business[]
  total_records: number
}

interface Facility {
  type: number
  detail: Detail
}

interface Detail {
  id: number
  name: string
  icon_type: string
  icon_name: string
}

// interface Service {
//   id: number
//   business_id: number
//   service_type_id: number
//   booking_online: boolean
//   name: string
//   max_pax: number
//   max_adults: number
//   max_children: number
//   stays: number
//   smoking: string
//   type: string
//   size: number
//   number: number
//   default_cost: number
//   discount: number
//   discount_min_stays: number
//   beds: Bed[]
//   service_type: Servicetype
// }

interface Servicetype {
  name: string
}

interface Bed {
  type: string
  number: number
}

interface Image {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
  facility: boolean
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

// Get One
interface BusinessGetRes {
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
  contact?: Contact
  city: string
  zipcode: string
  province: string
  address: string
  address_more: string
  create_at: string
  updated_at: string
  deleted_at?: any
  nearby: BusinessNearby[]
  service: BusinessService[]
  facility: BusinessFacility[]
  // group?: any
  images: Image[]
  tags?: any
}

interface BusinessFacility {
  id: number
  type: number
  detail: Detail
}

interface Detail {
  id: number
  name: string
  icon_type: string
  icon_name: string
}

interface BusinessService {
  id: number
  business_id: number
  service_type_id: number
  booking_online: boolean
  name: string
  max_pax: number
  max_adults: number
  max_children: number
  stays: number
  smoking: string
  type: string
  size: number
  number: number
  default_cost: number
  discount: number
  discount_min_stays: number
  beds: Bed[]
  service_type: Servicetype
  tags: Tag[]
  images: Image[]
}

interface Image {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
}

interface Tag {
  id: number
  name: string
  business_id: number
}

interface Servicetype {
  name: string
}

interface Bed {
  type: string
  number: number
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

interface BusinessNearby {
  name: string
  distance: number
  unit: string
}

export type {
  BusinessGetAllRes,
  BusinessGetRes,
  Business,
  BusinessService,
  BusinessFacility,
  BusinessNearby
}
