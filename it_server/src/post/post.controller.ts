import { Controller, HttpCode, Post, Get, Put, Delete, HttpStatus, HttpException, Param, Body } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './post.dto'

@Controller('post')
export class PostController {
	constructor(private postService: PostService) {}

	@HttpCode(HttpStatus.OK)
	@Get(':id_user')
	async findPosts(@Param() { id_user }: { id_user: string }) {
		try {
			const data = await this.postService.findPosts(id_user)

			return {
				message: 'Данные успешно получены',
				type: 'success',
				data
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id_post')
	async findOnePost(@Param() { id_post }: { id_post: string }) {
		try {
			const data = await this.postService.findOnePost(id_post)

			return {
				message: 'Данные успешно получены',
				type: 'success',
				data
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async createPost(@Body() body: CreatePostDto) {
		try {
			const { description, id_user, title, message, tags, author } = body
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async updatePost() {
		try {
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deletePost() {
		try {
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
