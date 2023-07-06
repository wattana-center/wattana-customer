interface OmiseResponse {
  object: string
  id: string
  location: string
  amount: number
  funding_amount: number
  refunded: number
  authorized: boolean
  capturable: boolean
  capture: boolean
  disputable: boolean
  livemode: boolean
  refundable: boolean
  reversed: boolean
  reversible: boolean
  voided: boolean
  paid: boolean
  expired: boolean
  currency: string
  funding_currency: string
  ip?: any
  refunds: Refunds
  link?: any
  description?: any
  metadata: any
  card: Card
  source?: any
  schedule?: any
  customer?: any
  dispute?: any
  transaction: string
  failure_code?: any
  failure_message?: any
  status: string
  reference?: any
  authorize_uri?: any
  return_uri?: any
  created: string
  paid_at: string
  expires_at: string
  expired_at?: any
  reversed_at?: any
  zero_interest_installments: boolean
  branch?: any
  terminal?: any
  device?: any
}

interface Card {
  object: string
  id: string
  livemode: boolean
  security_code_check: boolean
  expiration_month: number
  expiration_year: number
  bank: string
  brand: string
  city?: any
  country: string
  financing: string
  fingerprint: string
  first_digits?: any
  last_digits: string
  name: string
  phone_number?: any
  postal_code?: any
  state?: any
  street1?: any
  street2?: any
  created: string
}

interface Refunds {
  object: string
  data: any[]
  limit: number
  offset: number
  total: number
  location: string
  order: string
  from: string
  to: string
}

export type { OmiseResponse }
