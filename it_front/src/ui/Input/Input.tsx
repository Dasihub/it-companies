import { FC, useRef } from 'react'
import styles from './styles.module.less'
import { IInputProps } from './IInput'

const Input: FC<IInputProps> = ({
	value,
	label,
	name,
	id,
	onChange,
	style,
	title,
	type,
	placeholder,
	isVisiblePassword,
	required,
	maxLength,
	max,
	min,
	error,
	autoComplete,
	readOnly
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	return (
		<>
			{label?.length ? (
				<label htmlFor={id} className={value.length ? styles.label : `${styles.label} ${styles.label_on}`}>
					{label}
				</label>
			) : null}
			<input
				value={value}
				onChange={onChange}
				ref={inputRef}
				id={id}
				name={name}
				className={error?.length ? `${styles.input} ${styles.input_error}` : styles.input}
				type={type === 'password' ? (isVisiblePassword ? 'text' : type) : type}
				placeholder={placeholder}
				style={style}
				title={title}
				autoComplete={autoComplete}
				required={required}
				readOnly={readOnly}
				maxLength={maxLength}
				max={max}
				min={min}
			/>
		</>
	)
}

export default Input
