import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

const rootReducer = combineReducers({ userReducer })

const setupStore = () => {
	return configureStore({ reducer: rootReducer, devTools: process.env.NODE_ENV == 'development' })
}

export const store = setupStore()

export type typeRootState = ReturnType<typeof rootReducer>
export type typeStore = ReturnType<typeof setupStore>
export type typeDispatch = typeStore['dispatch']
