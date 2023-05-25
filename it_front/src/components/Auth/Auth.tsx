import { FC } from 'react'
import styles from './styles.module.less'
import { Button, Input } from '../../ui'
import { NavLink } from 'react-router-dom'

const Auth: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<h1>Авторизация</h1>
				<form className={styles.auth__form}>
					<div style={{ position: 'relative' }}>
						<Input value={''} label='Логин' onChange={() => {}} />
					</div>
					<div style={{ position: 'relative' }}>
						<Input value={''} label='Пароль' onChange={() => {}} type='password' />
					</div>
					<div>
						<Button value='Войти' onClick={() => {}} />
					</div>
				</form>

				<div style={{ textAlign: 'center' }}>
					<NavLink to='/register'>Регистрация</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Auth
