import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async findUser(login: string): Promise<UserDocument> {
		try {
			return await this.userModel.findOne({ login })
		} catch (e) {
			console.log(e)
		}
	}

	async createUser(login: string, password: string, name: string, surname: string): Promise<User> {
		try {
			console.log(password)
			const hashPassword = await bcrypt.hash(password, 8)
			return await this.userModel.create({ login, password: hashPassword, name, surname })
		} catch (e) {
			console.log(e)
		}
	}

	async isPassword(password: string, hashPassword: string): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hashPassword)
		} catch (e) {
			console.log(e)
		}
	}
}
