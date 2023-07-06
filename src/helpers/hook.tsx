import { AppDispatch, RootState } from '@app/redux-store'
import {
  TypedUseSelectorHook,
  useDispatch as useDis,
  useSelector as useSel
} from 'react-redux'

export const useDispatch = () => useDis<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSel
