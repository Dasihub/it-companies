import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
	@Prop({ type: String, required: true })
	surname: string

	@Prop({ type: String, required: true })
	name: string

	@Prop({ type: String, required: true })
	password: string

	@Prop({ type: String, required: true, unique: true })
	login: string
}

export const UserSchema = SchemaFactory.createForClass(User)
