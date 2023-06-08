import { FC, useEffect } from 'react'
import { Button, FileInput, Input } from '../../ui'
import { IModalProps } from './IModalPost'
import styles from './styles.module.less'

const ModalPost: FC<IModalProps> = props => {
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
					<h1>{props.idPost.length ? 'Изменить' : 'Добавить'}</h1>
					<div onClick={props.hideModal}>Закрыть</div>
				</div>
				<div className={styles.box}>
					{
						props.img ?
							<img className={styles.avatar} src={props.img} alt='avatar' /> : <div className={styles.default_avatar}/>
					}
				<div style={{ width: '100%' }}>
					<FileInput
						value={props.valueFile}
						id='file'
						label='Загрузить фото'
						accept='image/png, image/jpg, image/jpeg'
						isLabel={!!props.img}
						deleteImg={props.deleteImg}
						onChange={props.changeFile}
					/>
				</div>
				{/*<Button value='Далее' onClick={props.handleImg} />*/}
			</div>

				<form className={styles.modal__form}>
					<div style={{ position: 'relative' }}>
						<Input name='title' label='Название компании' onChange={props.change} value={props.title} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='message' label='Message' onChange={props.change} value={props.message} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='author' label='Автор' onChange={props.change} value={props.author} />
					</div>

					<div style={{ position: 'relative' }}>
						<Input name='description' label='Описание' onChange={props.change} value={props.description} />
					</div>

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button onClick={props.handlePost} style={{ width: 120 }} value='Сохранить' />
					</div>
				</form>
			</div>
		</div>
	)
}

export default ModalPost
