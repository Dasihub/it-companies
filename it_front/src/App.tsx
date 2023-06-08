import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header/Header'
import { useTypeDispatch } from './hooks/useTypeDispatch'
import { useTypeSelector } from './hooks/useTypeSelector'
import RouterApp from './pages/RouterApp'
import { checkTokenAction } from './redux/user/userAction'
import { logoutAction } from './redux/user/userSlice'
import AppService from './services/AppService'
import { Loader } from './ui'

const App: FC = () => {
	const navigate = useNavigate()
	const dispatch = useTypeDispatch()
	const { isAuth, mainLoader } = useTypeSelector(state => state.userReducer)

	const logout = async () => {
		await AppService.logout()

		dispatch(logoutAction())
		navigate('/login')
	}

	useEffect(() => {
		dispatch(checkTokenAction())
	}, [])

	if (mainLoader) {
		return (
			<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Loader />
			</div>
		)
	}

	return (
		<>
			<ToastContainer />
			{isAuth && <Header logout={logout} />}
			<RouterApp />
		</>
	)
}

export default App
