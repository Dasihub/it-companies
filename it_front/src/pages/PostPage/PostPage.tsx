import { FC, useEffect, ChangeEvent, useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import ModalPost from '../../components/ModalPost/ModalPost'
import Post from '../../components/Post/Post'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import PostService from '../../services/PostService'
import { Button, Input, Loader } from '../../ui'
import { IPost, IPostForm } from './IPostPage'
import Compressor from 'compressorjs'

const PostPage: FC = () => {
	const { _id: id_user, isAuth } = useTypeSelector(state => state.userReducer)

	const [postForm, setPostForm] = useState<IPostForm>({ author: '', description: '', title: '', message: '' })
	const [idPost, setIdPost] = useState<string>('')
	const [isModal, setIsModal] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)
	const [posts, setPosts] = useState<IPost[]>([])
	const [valueFilter, setValueFilter] = useState<string>('')
	const postFilter = posts.filter(item => item.title?.toLowerCase()?.includes(valueFilter?.toLowerCase()?.trim()))
	const [img, setImg] = useState<string>('')
	const [valueFile, setValueFile] = useState<string>('')
	const [fileImg, setFileImg] = useState<File>()

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
		setFileImg(undefined)
		setImg('')
		setValueFile('')
		setPostForm({ description: '', author: '', title: '', message: '' })
	}

	const handlePost = async (e: FormEvent) => {
		e.preventDefault()
		const { description, author, title, message } = postForm

		if (!(description.trim().length && author.trim().length && title.trim().length && message.trim().length)) {
			return toast.warn('Заполните все поля')
		}
		hideShowModal()

		valueFilter.length ? setValueFilter('') : null

		if (idPost.length) {
			await PostService.updatePost(
				idPost,
				description.trim(),
				title.trim(),
				message.trim(),
				author.trim(),
				fileImg
			)
		} else {
			await PostService.createPost(
				id_user,
				description.trim(),
				title.trim(),
				message.trim(),
				author.trim(),
				fileImg
			)
		}
		getPosts()
	}

	const changePost = (post: IPost) => {
		hideShowModal()
		const { description, _id, message, author, title, fileName } = post
		setIdPost(_id)
		setImg(fileName?.length ? `http://localhost:5000/posts/${fileName}` : '')
		setPostForm({ description, message, author, title })
	}

	const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e.target.files as FileList)[0]
		setValueFile(e.target.value)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			// @ts-ignore
			setImg(reader.result || '')
		}

		console.log(file)

		new Compressor(file, {
			quality: 0.8,
			height: 500,
			width: 500,
			strict: true,
			checkOrientation: false,
			convertTypes: ['image/png', 'image/jpeg', 'image/jpg'],
			success(file_: File) {
				const compressFile = new File([file_], file_.name)
				setFileImg(compressFile)
			}
		})
	}

	const deleteImg = () => {
		setImg('')
		setValueFile('')
		setFileImg(undefined)
	}

	useEffect(() => {
		if (id_user) {
			getPosts()
		}
	}, [id_user])

	return (
		<>
			{isModal && (
				<ModalPost
					idPost={idPost}
					img={img}
					valueFile={valueFile}
					change={change}
					hideModal={hideShowModal}
					handlePost={handlePost}
					description={postForm.description}
					author={postForm.author}
					title={postForm.title}
					message={postForm.message}
					changeFile={changeFile}
					deleteImg={deleteImg}
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
