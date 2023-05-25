import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return { secret: configService.get('SECRET') }
			},
			inject: [ConfigService]
		})
	]
})
export class UserModule {}
