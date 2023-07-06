import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { DialogReducer } from './dialog'
import { bookingConfirmReducer } from './booking'
import { hotelReducer } from './hotel'
import { loadingReducer } from './loading'
import logger from 'redux-logger'
import { searchReducer } from './search'

export const store = configureStore({
  reducer: {
    bookingConfirm: bookingConfirmReducer,
    hotel: hotelReducer,
    loading: loadingReducer,
    dialog: DialogReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
