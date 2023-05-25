import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './IUser'
import { loginAction } from './userAction'

interface IState extends IUser {
	isAuth: boolean
	loader: boolean
}

const initialState: IState = {
	_id: '',
	name: '',
	login: '',
	surname: '',
	isAuth: false,
	loader: false
}

const userSlice = createSlice({
	initialState,
	name: 'user',
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginAction.pending, state => {
			state.loader = true
		})
		builder.addCase(loginAction.fulfilled, (state, { payload }) => {
			if (payload._id?.length) {
				const { name, surname, _id, login } = payload
				state._id = _id
				state.name = name
				state.surname = surname
				state.login = login
				state.isAuth = true
				state.loader = false
			}
		})

		builder.addCase(loginAction.rejected, state => {
			state.loader = false
		})
	}
})

const {} = userSlice.actions

export { userSlice }
export default userSlice.reducer
