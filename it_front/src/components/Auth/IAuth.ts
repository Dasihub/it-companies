import { ChangeEvent, FormEvent } from 'react'

export interface IAuthProps {
	loader: boolean
	login: string
	password: string
	change: (e: ChangeEvent<HTMLInputElement>) => void
	handleLogin: (e: FormEvent) => void
}
