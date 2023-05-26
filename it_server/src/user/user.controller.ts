import { Controller, HttpCode, HttpException, HttpStatus, Post, Body, Res, Req, Get } from '@nestjs/common'
import { LoginUserDto, RegisterUserDto } from './user.dto'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

@Controller('user')
export class UserController {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() body: RegisterUserDto) {
		try {
			const { login, name, password, surname } = body

			const isCandidate = await this.userService.findUser(login)

			if (isCandidate) {
				return {
					message: `Пользователь с таким ${login} эл.почтой уже существует`,
					type: 'warn',
					data: [],
					register: false
				}
			}

			const result = await this.userService.createUser(login, password, name, surname)

			if (result.name.length) {
				return {
					message: 'Регистрация прошла успешно',
					type: 'success',
					data: [],
					register: true
				}
			}

			return {
				message: 'Ошибка не удалось зарегистрироваться',
				type: 'success',
				data: [],
				register: true
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере!', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.ACCEPTED)
	@Post('login')
	async login(@Body() body: LoginUserDto, @Res() res) {
		try {
			const { login: loginBody, password: passwordBody } = body

			const user = await this.userService.findUser(loginBody)

			if (!user) {
				return res.status(303).json({
					message: 'Неправильный логин или пароль',
					type: 'success',
					data: [],
					token: ''
				})
			}

			const { password, name, login, _id, surname } = user

			const isPassword = await this.userService.isPassword(passwordBody, password)

			if (!isPassword) {
				return res.status(303).json({
					message: 'Неправильный логин или пароль',
					type: 'success',
					data: [],
					token: ''
				})
			}

			const token = this.jwtService.sign({ _id, name, login, surname })

			res.status(202)
				.cookie('token', token, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true
				})
				.json({
					message: 'Авторизация прошла успешно',
					type: 'success',
					data: { name, login, _id, surname },
					token
				})
		} catch (e) {
			throw new HttpException('Ошибка в сервере!', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get('check-token')
	async checkToken(@Req() req) {
		try {
			const { token } = req.cookies
			const { authorization }: { authorization: string } = req.headers

			if (!authorization?.length) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: '',
					token: ''
				}
			}

			const bearer = authorization.split(' ')[0]
			const str = authorization.split(' ')[1]

			if (!(bearer == 'Bearer' && str.length)) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: '',
					token: ''
				}
			}

			if (!token) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					token: ''
				}
			}

			const data = this.jwtService.verify(token)

			const user = await this.userService.findUser(data.login)
			if (!user) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					token: ''
				}
			}

			const { login, name, _id, surname } = user

			return {
				message: 'Авторизация прошла успешно',
				type: 'success',
				data: { login, name, _id, surname },
				token
			}
		} catch (e) {
			console.log(e)
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get('logout')
	async logout(@Res() res) {
		try {
			res.status(200).clearCookie('token').json({
				message: 'Вы вышли',
				type: 'success',
				data: [],
				logout: true
			})
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
