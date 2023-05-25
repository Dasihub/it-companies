import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({})

const setupStore = () => {
	return configureStore({ reducer: rootReducer, devTools: process.env.NODE_ENV == 'development' })
}

export const store = setupStore()
