import { ChangeEvent, FormEvent } from 'react'

export interface IRegisterProps {
	name: string
	surname: string
	login: string
	password: string
	loader: boolean
	change: (e: ChangeEvent<HTMLInputElement>) => void
	handleRegister: (e: FormEvent) => void
}
