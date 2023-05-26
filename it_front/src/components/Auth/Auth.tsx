import { ChangeEvent, FC, useState } from 'react'
import styles from './styles.module.less'
import { Button, Input } from '../../ui'
import { NavLink } from 'react-router-dom'
import { IAuthProps } from './IAuth'

const Auth: FC<IAuthProps> = ({ login, password, change, handleLogin, loader }) => {
	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<h1>Авторизация</h1>
				<form className={styles.auth__form}>
					<div style={{ position: 'relative' }}>
						<Input value={login} label='Логин' name='login' onChange={change} />
					</div>
					<div style={{ position: 'relative' }}>
						<Input value={password} label='Пароль' name='password' onChange={change} type='password' />
					</div>
					<div>
						<Button loader={loader} value='Войти' onClick={handleLogin} />
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
