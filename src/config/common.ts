const BASE_URL = process.env.REACT_APP_API_ENDPOINT
const APP_NAME = ''
const APP_DESCRIPTION = ''
const FIREBASE_KEY = process.env.FIREBASE_API_KEY
const BUSINESS_API = BASE_URL + '/public/business'
const BOOKING_API = BASE_URL + '/public/booking'
const SIGN_API = BASE_URL + '/public/sign'
const OMISE_API = 'https://api.omise.co/charges'
const PAYMENT_API = BASE_URL + '/public/payment'
const SEARCH_BUSINESS_API = BASE_URL + '/public/search/business'
const IMAGES_PROXY_API = BASE_URL + '/images-proxy'
export {
  APP_NAME,
  APP_DESCRIPTION,
  FIREBASE_KEY,
  BUSINESS_API,
  BOOKING_API,
  OMISE_API,
  SEARCH_BUSINESS_API,
  IMAGES_PROXY_API,
  PAYMENT_API,
  SIGN_API
}
