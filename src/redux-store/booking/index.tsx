import { Reducer } from 'redux'
import { useDispatch } from '@app/helpers'

const initialState: IBookingState = {
  business_id: null,
  server_id: null,
  check_in: '',
  check_out: '',
  adults: null,
  children: null,
  month: 1,
  nameTh: '',
  nameEn: '',
  tel: '',
  email: ''
}

export type IBookingState = {
  nameTh: string
  nameEn: string
  tel: string
  email: string
  business_id: number | null
  server_id: number | null
  check_in: string
  check_out: string
  adults: number | null
  children: number | null
  month: number
}

export enum BookingActionType {
  UPDATE_BOOKING = 'BOOKING/CONFIRM/UPDATE',
  RESET_BOOKING = 'BOOKING/CONFIRM/RESET'
}

export const bookingConfirmReducer: Reducer<IBookingState> = (
  state = initialState,
  action
): IBookingState => {
  switch (action.type) {
    case BookingActionType.UPDATE_BOOKING:
      return Object.assign({}, state, action.payload)
    case BookingActionType.RESET_BOOKING:
      return initialState
    default:
      return state
  }
}

export const useBookingConfirm = () => {
  const dispatch = useDispatch()

  return {
    update: (value: IBookingState) => {
      return dispatch({
        type: BookingActionType.UPDATE_BOOKING,
        payload: value
      })
    },

    reset: () => {
      return dispatch({
        type: BookingActionType.RESET_BOOKING,
        payload: undefined
      })
    }
  }
}
