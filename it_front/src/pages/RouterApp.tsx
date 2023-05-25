import { FC } from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage/AuthPage'
import RegisterPage from './RegisterPage/RegisterPage'
import PostPage from './PostPage/PostPage'
import PostIdPage from './PostIdPage/PostIdPage'

const RouterApp: FC = () => {
	const { isAuth } = useTypeSelector(state => state.userReducer)

	if (isAuth) {
		return (
			<Routes>
				<Route path='/post/:id_post' element={<PostIdPage />} />
				<Route path='/post' element={<PostPage />} />
				<Route path='/login' element={<Navigate replace to='/post' />} />
				<Route path='/' element={<Navigate replace to='/post' />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<AuthPage />} />
			<Route path='/' element={<Navigate replace to='/login' />} />
		</Routes>
	)
}

export default RouterApp
