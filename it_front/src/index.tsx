import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import 'react-toastify/dist/ReactToastify.css'
import './style/index.less'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
