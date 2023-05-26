import { FC } from 'react'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IHeader } from './IHeader'
import styles from './styles.module.less'

const Header: FC<IHeader> = ({ logout }) => {
	const { name, surname } = useTypeSelector(state => state.userReducer)

	return (
		<div className={styles.header}>
			<h1>IT - companies</h1>
			<div>
				<div>
					{surname} {name}
				</div>
				<div onClick={logout} className={styles.header__logout}>
					Выйти
				</div>
			</div>
		</div>
	)
}

export default Header
