import { BusinessGetRes } from '@app/apis'
import { Reducer } from 'redux'
import { useDispatch } from '@app/helpers'

const initialState: BusinessGetRes = {
  id: 0,
  is_active: false,
  name: '',
  type: '',
  stars: 0,
  description: '',
  longitude: 0,
  latitude: 0,
  follow_summary: 0,
  car_park: 0,
  language: [],
  breakfast: 0,
  contact: undefined,
  city: '',
  zipcode: '',
  province: '',
  address: '',
  address_more: '',
  create_at: '',
  updated_at: '',
  nearby: [],
  service: [],
  facility: [],
  images: []
}

export enum HotelActionType {
  UPDATE = 'HOTEL/DETAIL/UPDATE',
  RESET = 'HOTEL/DETAIL/RESET'
}

export const hotelReducer: Reducer<BusinessGetRes> = (
  state = initialState,
  action
): BusinessGetRes => {
  switch (action.type) {
    case HotelActionType.UPDATE:
      return Object.assign({}, state, action.payload)
    case HotelActionType.RESET:
      return initialState
    default:
      return state
  }
}

export const HotelDispatcher = () => {
  const dispatch = useDispatch()

  return {
    update: (value: BusinessGetRes) => {
      return dispatch({
        type: HotelActionType.UPDATE,
        payload: value
      })
    },

    reset: () => {
      return dispatch({
        type: HotelActionType.RESET,
        payload: undefined
      })
    }
  }
}
