import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../../services/PostService'
import { Loader } from '../../ui'
import { IPost } from '../PostPage/IPostPage'

const PostIdPage: FC = () => {
	const [post, setPost] = useState<IPost>()
	const [loader, setLoader] = useState<boolean>(true)
	const { id_post } = useParams<{ id_post: string }>()

	const getPost = async () => {
		const { data } = await PostService.getPost(id_post)
		setPost(data)
		setLoader(false)
	}

	useEffect(() => {
		getPost()
	}, [])

	if (loader) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
				<Loader />
			</div>
		)
	}

	return (
		<div
			style={{
				backgroundColor: 'white',
				borderRadius: 16,
				width: 500,
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'column',
				padding: 16,
				margin: '16px auto 0 auto',
				gap: 16
			}}
		>
			<h1 style={{textAlign: 'center'}}>{post?.title}</h1>
			<h2>Автор: {post?.author}</h2>
			<p>Описание: {post?.description}</p>
			<div>Дата: {post?.createdAt}</div>
		</div>
	)
}

export default PostIdPage
