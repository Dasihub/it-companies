export class RegisterUserDto {
	readonly surname: string
	readonly name: string
	readonly login: string
	readonly password: string
}

export class LoginUserDto {
	readonly login: string
	readonly password: string
}
