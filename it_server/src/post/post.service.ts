import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
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
			return await this.postModel.findOne({ id_post })
		} catch (e) {
			console.log(e)
		}
	}

	async createPost() {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async updatePost() {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async deletePost() {
		try {
		} catch (e) {
			console.log(e)
		}
	}
}
