import { FC, useEffect, ChangeEvent, useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import ModalPost from '../../components/ModalPost/ModalPost'
import Post from '../../components/Post/Post'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import PostService from '../../services/PostService'
import { Button, Input, Loader } from '../../ui'
import { IPost, IPostForm } from './IPostPage'

const PostPage: FC = () => {
	const { _id: id_user, isAuth } = useTypeSelector(state => state.userReducer)

	const [postForm, setPostForm] = useState<IPostForm>({ author: '', description: '', title: '', message: '' })
	const [idPost, setIdPost] = useState<string>('')
	const [isModal, setIsModal] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)
	const [posts, setPosts] = useState<IPost[]>([])
	const [valueFilter, setValueFilter] = useState<string>('')

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setPostForm(pre => (pre = { ...pre, [e.target.name]: e.target.value }))
	}

	const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setValueFilter(e.target.value)
	}

	const getPosts = async () => {
		setLoader(true)

		const { data } = await PostService.getAllPost(id_user)

		setPosts(data)
		setLoader(false)
	}

	const deletePost = async (id_post: string) => {
		setPosts(posts.filter(item => item._id != id_post))
		const { message, type } = await PostService.deletePost(id_post)
		toast[type](message)
	}

	const hideShowModal = () => {
		setIsModal(pre => (pre = !pre))
		setPostForm({ description: '', author: '', title: '', message: '' })
	}

	const handlePost = async (e: FormEvent) => {
		e.preventDefault()
		hideShowModal()
		const { description, author, title, message } = postForm

		if (!(description.trim().length && author.trim().length && title.trim().length && message.trim().length)) {
			return toast.warn('Заполните все поля')
		}

		setPosts(
			posts.map(item => {
				if (item._id == idPost) {
					return {
						...item,
						...postForm
					}
				}
				return item
			})
		)

		if (idPost.length) {
			await PostService.updatePost(idPost, description.trim(), title.trim(), message.trim(), author.trim())
			return
		}

		const data = await PostService.createPost(
			id_user,
			description.trim(),
			title.trim(),
			message.trim(),
			author.trim()
		)
		setPosts(pre => (pre = [...pre, data]))
	}

	const changePost = (post: IPost) => {
		hideShowModal()
		const { description, _id, message, author, title } = post
		setIdPost(_id)
		setPostForm({ description, message, author, title })
	}

	const postFilter = posts.filter(item => item.title.toLowerCase().includes(valueFilter.toLowerCase().trim()))

	useEffect(() => {
		if (isAuth) {
			getPosts()
		}
	}, [isAuth])

	return (
		<>
			{isModal && (
				<ModalPost
					idPost={idPost}
					change={change}
					hideModal={hideShowModal}
					handlePost={handlePost}
					description={postForm.description}
					author={postForm.author}
					title={postForm.title}
					message={postForm.message}
				/>
			)}
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
				<Input placeholder='Поиск' value={valueFilter} style={{ width: 500 }} onChange={changeFilter} />
			</div>
			{loader ? (
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
					<Loader />
				</div>
			) : postFilter.length ? (
				<Post changePost={changePost} deletePost={deletePost} posts={postFilter} />
			) : (
				<h2 style={{ textAlign: 'center', marginTop: 20 }}>Нет данных</h2>
			)}
			<Button
				onClick={hideShowModal}
				style={{ position: 'fixed', left: '50%', transform: 'translate(-50%)', width: 120, bottom: 30 }}
				value='Добавить'
			/>
		</>
	)
}

export default PostPage
