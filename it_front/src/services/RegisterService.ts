import { request } from '../hooks/request'
import { IMessage } from '../model/IMessage'

interface IAPiRegister extends IMessage {
	register: boolean
}

class RegisterService {
	async register(name: string, surname: string, login: string, password: string): Promise<IAPiRegister> {
		return await request('/user/register', 'POST', { name, login, surname, password })
	}
}

export default new RegisterService()
