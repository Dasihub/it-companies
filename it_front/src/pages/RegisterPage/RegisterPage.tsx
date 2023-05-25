import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Register from '../../components/Register/Register'
import { IRegisterForm } from './IRegisterPage'
import RegisterService from '../../services/RegisterService'

const RegisterPage: FC = () => {
	const navigate = useNavigate()
	const [loader, setLoader] = useState<boolean>(false)
	const [form, setForm] = useState<IRegisterForm>({
		surname: '',
		name: '',
		login: '',
		password: ''
	})

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setForm(pre => (pre = { ...pre, [e.target.name]: e.target.value }))
	}

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault()
		const { name, login, surname, password } = form

		if (!(name.trim().length && login.trim().length && surname.trim().length && password.trim().length)) {
			return toast.warn('Заполните все поля')
		}
		setLoader(true)
		const { register, message, type } = await RegisterService.register(
			name.trim(),
			surname.trim(),
			login.trim(),
			password.trim()
		)
		setLoader(false)
		toast[type](message)

		if (register) {
			navigate('/login')
		}
	}

	return (
		<Register
			change={change}
			loader={loader}
			name={form.name}
			login={form.login}
			surname={form.surname}
			password={form.password}
			handleRegister={handleRegister}
		/>
	)
}

export default RegisterPage
