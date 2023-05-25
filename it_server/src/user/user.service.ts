import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async findUser(email: string): Promise<UserDocument> {
		try {
			return await this.userModel.findOne({ email })
		} catch (e) {
			console.log(e)
		}
	}

	async createUser(email: string, password: string, name: string): Promise<User> {
		try {
			const hashPassword = await bcrypt.hash(password, 8)
			return await this.userModel.create({ email, password: hashPassword, name })
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
