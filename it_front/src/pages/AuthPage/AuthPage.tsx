import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Auth from '../../components/Auth/Auth'
import { IAuthForm } from './IAuthPage'
import { loginAction } from '../../redux/user/userAction'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { toast } from 'react-toastify'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const AuthPage: FC = () => {
	const dispatch = useTypeDispatch()
	const { loader } = useTypeSelector(state => state.userReducer)
	const [form, setForm] = useState<IAuthForm>({
		login: '',
		password: ''
	})

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setForm(pre => (pre = { ...pre, [e.target.name]: e.target.value }))
	}

	const handleLogin = (e: FormEvent) => {
		e.preventDefault()
		const { login, password } = form

		if (!(login.trim().length && password.trim().length)) {
			return toast.warn('Заполните все поля')
		}

		dispatch(loginAction({ login: login.trim(), password: password.trim() }))
	}

	return <Auth login={form.login} password={form.password} change={change} handleLogin={handleLogin} loader={loader} />
}

export default AuthPage
