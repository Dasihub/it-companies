import { Document } from 'mongoose'
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'

export type PostDocument = Post & Document

@Schema()
export class Post {
	@Prop({ type: String, required: true})
	id_user: string

	@Prop({ type: String, required: true})
	title: string

	@Prop({ type: String, required: true})
	message: string

	@Prop({ type: String, required: true})
	author: string

	@Prop({ type: String, required: true})
	description: string

	@Prop({ type: String})
	fileName: string

	@Prop({ type: Number, default: 0 })
	likeCount: number

	@Prop({ type: Date, default: new Date() })
	createdAt: string
}

export const PostSchema = SchemaFactory.createForClass(Post)
