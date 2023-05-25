import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import RouterApp from './pages/RouterApp'

const App: FC = () => {
	return (
		<>
			<ToastContainer />
			<RouterApp />
		</>
	)
}

export default App
