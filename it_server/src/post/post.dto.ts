export class CreatePostDto {
	readonly id_user: string
	readonly title: string
	readonly message: string
	readonly author: string
	readonly description: string
	readonly tags: string[]
}
