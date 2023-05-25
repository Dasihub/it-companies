import { Document } from 'mongoose'
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'

export type PostDocument = Post & Document

export class Post {
	@Prop({ type: String })
	id_user: string

	@Prop({ type: String })
	title: string

	@Prop({ type: String })
	message: string

	@Prop({ type: String })
	author: string

	@Prop({ type: String })
	description: string

	@Prop({ type: [String] })
	tags: string[]

	@Prop({ type: String })
	fileName: string

	@Prop({ type: Number, default: 0 })
	likeCount: string

	@Prop({ type: Date, default: new Date() })
	createdAt: string
}

export const PostSchema = SchemaFactory.createForClass(Post)
