import { Injectable } from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post, PostDocument } from './post.schema'

@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

	async findPosts(id_user: string) {
		try {
			return await this.postModel.find({ id_user })
		} catch (e) {
			console.log(e)
		}
	}

	async findOnePost(id_post: string) {
		try {
			return await this.postModel.findOne({_id: id_post })
		} catch (e) {
			console.log(e)
		}
	}

	async createPost(description: string, id_user: string, title: string, message: string, author: string, fileName: string) {
		try {
			console.log(description, id_user, title, message, author, fileName)
			return await this.postModel.create({id_user, title, message, author, fileName, description})
		} catch (e) {
			console.log(e)
		}
	}

	async updatePost(description: string, id_post: string, message: string, author: string, title: string) {
		try {
			return await this.postModel.updateOne({_id: id_post}, {description,message, author, title})
		} catch (e) {
			console.log(e)
		}
	}

	async deletePost(id_post: string) {
		try {
			return await this.postModel.deleteOne({_id: id_post})
		} catch (e) {
			console.log(e)
		}
	}
}
