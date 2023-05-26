import { ChangeEvent, FormEvent } from "react";

export interface IModalProps {
    description: string
    author: string
    title: string
    message: string
    hideModal: () => void
    handlePost: (e: FormEvent) => void
    change: (e: ChangeEvent<HTMLInputElement>) => void
}