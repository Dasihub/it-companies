import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { typeRootState } from '../redux/store'

export const useTypeSelector: TypedUseSelectorHook<typeRootState> = useSelector
