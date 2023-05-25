import { useDispatch } from 'react-redux'
import { typeDispatch } from '../redux/store'

export const useTypeDispatch = () => useDispatch<typeDispatch>()
