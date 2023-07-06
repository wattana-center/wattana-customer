import { OmiseResponse } from './omise-interface'

interface BookingRequest {
  status: string
  payment_status: string
  check_in: string
  check_out: string
  total_net_cost: number
  commission_amount: number
  commission_rate: number
  fullname_th: string
  fullname_en: string
  holder_email: string
  holder_telphone: string
  business_id: number
  services?: Services
  requirement: Requirement
  payment_refernces?: OmiseResponse
}

interface Requirement {
  message: string
}

interface Services {
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
}

interface Servicetype {
  name: string
}

interface Bed {
  type: string
  number: number
}

interface BookingResponse {
  id: number
  status: string
  payment_status: string
  payment_type: 'BT' | 'CC'
  reference: string
  check_in: string
  check_out: string
  total_net_cost: number
  commission_amount: number
  commission_rate: number
  fullname_th: string
  fullname_en: string
  holder_email: string
  holder_telphone: string
  create_at: string
  updated_at: string
  deleted_at?: any
  business_id: number
  services: Services
  requirement: Requirement
  business: Business
  payment_refernces: any
}

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
  commission: number
  create_at: string
  updated_at: string
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

export type { BookingRequest, BookingResponse }
