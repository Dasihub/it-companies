import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../../ui'
import { IPostProps } from './IPost'
import styles from './styles.module.less'

const Post: FC<IPostProps> = ({ posts, deletePost, changePost }) => {
	return (
		<div className={styles.container}>
			{posts.map(item => (
				<div key={item._id} className={styles.post}>
					<div className={styles.post__img}>
						{item.fileName?.length ? <img src={`http://localhost:5000/posts/${item.fileName}`} /> : null}
					</div>
					<div className={styles.post__body}>
						<h1>{item.title}</h1>
						<p>{item.author}</p>
						<NavLink to={`/post/${item._id}`}>Описание</NavLink>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button onClick={deletePost.bind(null, item._id)} value='Удалить' style={{ width: 120 }} />
							<Button onClick={changePost.bind(null, item)} value='Изменить' style={{ width: 120 }} />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default memo(Post)
