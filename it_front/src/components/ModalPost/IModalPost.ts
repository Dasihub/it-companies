import { ChangeEvent, FormEvent } from 'react'

export interface IModalProps {
	description: string
	author: string
	title: string
	message: string
	idPost: string
	img: string
	valueFile: string
	hideModal: () => void
	deleteImg: () => void
	changeFile: (e: ChangeEvent<HTMLInputElement>) => void
	handlePost: (e: FormEvent) => void
	change: (e: ChangeEvent<HTMLInputElement>) => void
}
