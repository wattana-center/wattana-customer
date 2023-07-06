import {
  InitializeSearchBookingState,
  SearchState
} from '@app/components/common/Utils'

import { Reducer } from 'redux'
import { useDispatch } from '@app/helpers'

export enum SearchActionType {
  UPDATE = 'SEARCH/BOOKING/UPDATE',
  RESET = 'SEARCH/BOOKING/RESET'
}

export const searchReducer: Reducer<SearchState> = (
  state = InitializeSearchBookingState,
  action
): SearchState => {
  switch (action.type) {
    case SearchActionType.UPDATE:
      return Object.assign({}, state, action.payload)
    case SearchActionType.RESET:
      return InitializeSearchBookingState
    default:
      return state
  }
}

export const useSearch = () => {
  const dispatch = useDispatch()

  return {
    update: (value: SearchState) => {
      return dispatch({
        type: SearchActionType.UPDATE,
        payload: value
      })
    },

    reset: () => {
      return dispatch({
        type: SearchActionType.RESET,
        payload: undefined
      })
    }
  }
}
