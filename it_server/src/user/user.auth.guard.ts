import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'

export class UserAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest()

		const { token } = req.cookies
		const { authorization }: { authorization: string } = req.headers

		if (!authorization?.length) {
			throw new UnauthorizedException({ message: 'Вы не авторизованы 1', type: 'warn', data: [] })
		}

		const bearer = authorization.split(' ')[0]
		const str = authorization.split(' ')[1]

		if (!(bearer == 'Bearer' && str.length)) {
			throw new UnauthorizedException({ message: 'Вы не авторизованы 2', type: 'warn', data: [] })
		}

		if (!token) {
			throw new UnauthorizedException({ message: 'Вы не авторизованы 3', type: 'warn', data: [] })
		}

		return true
	}
}
