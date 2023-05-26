import { FC } from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage/AuthPage'
import RegisterPage from './RegisterPage/RegisterPage'
import PostPage from './PostPage/PostPage'
import PostIdPage from './PostIdPage/PostIdPage'
import Error404 from './Error404/Error404'

const RouterApp: FC = () => {
	const { isAuth } = useTypeSelector(state => state.userReducer)

	if (isAuth) {
		return (
			<Routes>
				<Route path='/post/:id_post' element={<PostIdPage />} />
				<Route path='/post' element={<PostPage />} />
				<Route path='/login' element={<Navigate replace to='/post' />} />
				<Route path='/' element={<Navigate replace to='/post' />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<AuthPage />} />
			<Route path='/post/:id_post' element={<Navigate replace to='/login' />} />
			<Route path='/post' element={<Navigate replace to='/login' />} />
			<Route path='/' element={<Navigate replace to='/login' />} />
			<Route path='*' element={<Error404 />} />
		</Routes>
	)
}

export default RouterApp
