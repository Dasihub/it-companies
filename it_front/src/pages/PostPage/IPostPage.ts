export interface IPost {
    _id: string
	id_user: string
	title: string
	message: string
	author: string
	description: string
	fileName: string
	likeCount: number
	createdAt: string
}

export interface IPostForm {
	title: string
	description: string
	message: string
	author: string
}