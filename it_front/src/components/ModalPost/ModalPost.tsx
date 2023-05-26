import { FC, useEffect } from 'react'
import { Button, Input } from '../../ui'
import { IModalProps } from './IModalPost'
import styles from './styles.module.less'

const ModalPost: FC<IModalProps> = ({ change, description, author, title, message, hideModal, handlePost, idPost }) => {
	useEffect(() => {
		document.body.style.overflowY = 'hidden'

		return () => {
			document.body.style.overflowY = 'visible'
		}
	}, [])

	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<div className={styles.modal__header}>
					<h1>{idPost.length ? 'Изменить' : 'Добавить'}</h1>
					<div onClick={hideModal}>Закрыть</div>
				</div>

				<form className={styles.modal__form}>
					<div style={{ position: 'relative' }}>
						<Input name='title' label='Название компании' onChange={change} value={title} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='message' label='Message' onChange={change} value={message} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='author' label='Автор' onChange={change} value={author} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='description' label='Описание' onChange={change} value={description} />
					</div>

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button onClick={handlePost} style={{ width: 120 }} value='Сохранить' />
					</div>
				</form>
			</div>
		</div>
	)
}

export default ModalPost
