import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../hooks/request'
import { IMessage } from '../../model/IMessage'
import { IUser } from './IUser'
import { toast } from 'react-toastify'

interface IAPILogin extends IMessage {
	data: IUser
	token: string
}

export const loginAction = createAsyncThunk<IUser, { login: string; password: string }>(
	'user/api',
	async ({ login, password }, thunkAPI) => {
		try {
			const { token, data, type, message }: IAPILogin = await request('/user/login', 'POST', { login, password })
			toast[type](message)

			if (token.length) {
				return data
			}

			return data
		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка')
		}
	}
)
