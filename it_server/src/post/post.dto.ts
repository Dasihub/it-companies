export class CreatePostDto {
	readonly id_user: string
	readonly title: string
	readonly message: string
	readonly author: string
	readonly description: string
}

export class UpdatePostDto {
	readonly id_post: string
	readonly title: string
	readonly message: string
	readonly author: string
	readonly description: string
}
