import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const bootstrap = async () => {
	try {
		const app = await NestFactory.create(AppModule)
		const PORT = process.env.PORT

		app.setGlobalPrefix('api')
		app.use(cookieParser())

		await app.listen(PORT, () => console.log(`Server is working in port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

bootstrap()
