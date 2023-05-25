import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { PostModule } from './post/post.module';

@Module({
	providers: [],
	controllers: [],
	imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_URL), UserModule, PostModule]
})
export class AppModule {}
