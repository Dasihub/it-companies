import { toast } from 'react-toastify'
import { store } from '../redux/store'
import { logoutAction } from '../redux/user/userSlice'

export const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : '/api'

type tMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

const token = localStorage.getItem('token')

export const request = async (
	url: string,
	method: tMethod = 'GET',
	body: any = null,
	headers: any = { Authorization: token }
) => {
	try {
		if (body) {
			body = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}

		const res: Response = await fetch(baseURL + url, { method, body, headers, credentials: 'include' })

		// if (res.status == 401) {
		// 	return store.dispatch(logoutAction())
		// }

		return await res.json()
	} catch (e) {
		toast.error('Ошибка в сервере')
		console.log(e)
	}
}
