import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../../ui'

const Error404: FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100vh',
				gap: 10
			}}
		>
			<h1>404</h1>
			<div>Страница не найдено</div>
			<div>
				<NavLink to='/'>
					<Button style={{ width: 120 }} value='На главный' />
				</NavLink>
			</div>
		</div>
	)
}

export default Error404
