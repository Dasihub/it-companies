import { toast } from 'react-toastify'
import { useCallback } from 'react'

export const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : '/api'

type tMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

export const request = async (url: string, method: tMethod = 'GET', body: any = null, headers: any = {}) => {
	try {
		if (body) {
			body = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}

		const res: Response = await fetch(baseURL + url, { method, body, headers })
		return await res.json()
	} catch (e) {
		toast.error('Ошибка в сервере')
		console.log(e)
	}
}

export const useHttp = () => {
	const http = useCallback(request, [])

	return { http }
}
