import { FC } from 'react'
import styles from './styles.module.less'
import { Button, Input } from '../../ui'
import { NavLink } from 'react-router-dom'
import { IRegisterProps } from './IRegister'

const Register: FC<IRegisterProps> = ({ change, name, login, surname, password, handleRegister, loader }) => {
	return (
		<div className={styles.container}>
			<div className={styles.register}>
				<h1>Регистрация</h1>
				<form className={styles.register__form}>
					<div style={{ position: 'relative' }}>
						<Input name='surname' value={surname} label='Фамилия' onChange={change} />
					</div>
					<div style={{ position: 'relative' }}>
						<Input name='name' value={name} label='Имя' onChange={change} />
					</div>
					<div style={{ position: 'relative' }}>
						<Input name='login' value={login} label='Логин' onChange={change} />
					</div>
					<div style={{ position: 'relative' }}>
						<Input name='password' value={password} label='Пароль' onChange={change} type='password' />
					</div>
					<div>
						<Button value='Зарегистрироваться' onClick={handleRegister} loader={loader} />
					</div>
				</form>

				<div style={{ textAlign: 'center' }}>
					<NavLink to='/login'>Авторизация</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Register
