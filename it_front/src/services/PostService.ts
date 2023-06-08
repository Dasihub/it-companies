import { toast } from 'react-toastify'
import { request } from '../hooks/request'
import { IMessage } from '../model/IMessage'
import { IPost } from '../pages/PostPage/IPostPage'

interface IAPICreatePost extends IMessage {
	data: IPost
}

class PostService {
	async getAllPost(id_user: string) {
		return await request(`/post/${id_user}`)
	}

	async getPost(id_post?: string) {
		return await request(`/post/find-one/${id_post}`)
	}

	async deletePost(id_post: string): Promise<IMessage> {
		return await request(`/post/${id_post}`, 'DELETE')
	}

	async createPost(id_user: string, description: string, title: string, message: string, author: string, fileImg?: File) {
		const formData: FormData = new FormData()
		formData.append('img', fileImg || '')
		formData.append('id_user', String(id_user))
		formData.append('description', description)
		formData.append('title', title)
		formData.append('message', message)
		formData.append('message', message)
		const {
			data,
			message: m,
			type
		}: IAPICreatePost = await request('/post', 'POST', { description, id_user, title, message, author })
		toast[type](m)
		return data
	}

	async updatePost(id_post: string, description: string, title: string, message: string, author: string, fileImg?: File) {
		const {
			data,
			message: m,
			type
		}: IAPICreatePost = await request('/post', 'PUT', { description, id_post, title, message, author })
		toast[type](m)
		return data
	}
}

export default new PostService()
