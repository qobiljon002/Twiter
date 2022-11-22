/* eslint-disable no-unused-vars */
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconLookup, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';



import styles from './AccountModal.module.scss';


library.add(fas)

export interface IAccountModalProps {
	IsOpenAccountModal: boolean
	setIsOpenAccountModal: Function
}

export const AccountModal: React.FC<IAccountModalProps> = ({
	setIsOpenAccountModal,
	IsOpenAccountModal,
}: IAccountModalProps) => {
	const [modalState, setModalState] = useState<number>(1)
	const [emailPhone, setEmailPhone] = useState<string | boolean>('Phone')
	const [counter, setCounter] = useState<number>(0)
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [date, setDate] = useState('')
	const [month, setMonth] = useState('')
	const [isYear, setIsYear] = useState('')
	const [eye, seteye] = useState(true)
	const [password, setpassword] = useState('password')
	const [type, settype] = useState(false)

	const nameRef = useRef<HTMLInputElement>(null)
	const nextButtonRef = useRef<HTMLButtonElement>(null)
	const phoneEmailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const dateRef = useRef<HTMLSelectElement>(null)
	const monthRef = useRef<HTMLSelectElement>(null)
	const yearRef = useRef<HTMLSelectElement>(null)

	const coffeeLookup: IconLookup = { prefix: 'fas', iconName: 'arrow-left' }
	const xMark: IconLookup = { prefix: 'fas', iconName: 'xmark' }
	const eyeIcon: IconLookup = { prefix: 'fas', iconName: 'eye' }
	const eyeIconOf: IconLookup = { prefix: 'fas', iconName: 'eye-slash' }
	const circleCheak: IconLookup = { prefix: 'fas', iconName: 'circle-check' }
	const checked: IconLookup = { prefix: 'fas', iconName: 'check' }
	const xMarkIconDefinition: IconDefinition = findIconDefinition(xMark)
	const coffeeIconDefinition: IconDefinition = findIconDefinition(coffeeLookup)

	const handleToggle = () => {
		if (password == 'password') {
			setpassword('text')
			seteye(false)
			settype(true)
		} else {
			setpassword('password')
			seteye(true)
			settype(false)
		}
	}

	const modalCloseHandler = (): void => {
		setIsOpenAccountModal(false)
		setModalState(1)
	}

	const changeEmailPhone = (): void => {
		setEmailPhone(!emailPhone)
		if (phoneEmailRef.current) {
			setEmail('')
			phoneEmailRef.current.style.color = 'black'
		}
	}

	const cheakInputHandler = (e: {
		target: {
			style: any
			value: any
		}
	}) => {
		if (phoneEmailRef.current?.type === 'email') {
			const pattern1 = /^[^]+@[^]+\.[a-z]{2,3}$/
			const emailValue = e.target.value
			setEmail(emailValue)
			if (email.match(pattern1)) {
				e.target.style.color = '#1da1f2'
			} else {
				e.target.style.color = 'red'
			}
		}
		if (phoneEmailRef.current?.type === 'text') {
			const pattern2 = /^([+]\d{1})?\d{10}$/
			const phoneValue = e.target.value
			setEmail(phoneValue)
			if (email.match(pattern2)) {
				e.target.style.color = '#1da1f2'
			} else {
				e.target.style.color = 'red'
			}
		}
	}

	const cheakPassword = (e: any) => {
		if (passwordRef.current?.value) {
			if (passwordRef.current?.value.length >= 8) {
				e.target.style.borderColor = '#1da1f2'
			} else {
				e.target.style.borderColor = 'red'
			}
		}
	}

	const InputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setCounter(counter + 1)
		if (counter >= 50) {
			setCounter(50)
		}
		if (e.key === 'Backspace') {
			setCounter(counter - 1)
			if (counter <= 0) {
				setCounter(0)
			}
		}
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			setCounter(counter)
		}
		
			
		
	}

	const warning = (e: {
		target: {
			value: string
			style: {
				color: string
				borderColor: string
			}
		}
	}): void => {
		if (e.target.value === '') {
			e.target.style.borderColor = 'red'
			e.target.style.color = 'red'
		} else {
			e.target.style.borderColor = '#1da1f2'
			e.target.style.color = '#1da1f2'
		}
		if (nameRef.current?.type === 'text') {
			const nameValue = e.target.value
			setName(nameValue)
		}
	}
	const monthCheck = (e: { target: { value: any } }) => {
		if (monthRef.current?.selectedOptions) {
			const monthValue = e.target.value
			setMonth(monthValue)
		}
	}

	const dateCheck = (e: { target: { value: any } }) => {
		if (dateRef.current?.selectedOptions) {
			const dateValue = e.target.value
			setDate(dateValue)
		}
	}

	const yearCheck = (e: { target: { value: any } }) => {
		if (yearRef.current?.selectedOptions) {
			const yearValue = e.target.value
			setIsYear(yearValue)
		}
	}

	useEffect(() => {
		const values: string[] = []
		if (modalState === 1) {
			if (nextButtonRef.current) {
				if (
					nameRef.current?.value &&
					date &&
					month &&
					isYear &&
					phoneEmailRef.current?.value.length === 13 &&
					email
				) {
					axios.post('http://localhost:3002/auth/otpcheck', {
						code: values.join(''),
					})
					nextButtonRef.current.disabled = false
				} else {
					nextButtonRef.current.disabled = true
				}
			}
		}
	})

	let listOfYears = []

	let year = new Date().getFullYear()
	let months = [
		'Month',
		'	January',
		'February',
		'March',
		'	April',
		'	May',
		'	June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	for (let i = year; i >= year - 120; i--) {
		listOfYears.push(i)
	}

	let listOfDates = []

	for (let i = 31; i >= 1; i--) {
		listOfDates.push(i)
	}

		useEffect(() => {

			const OTPInputs = document.querySelectorAll(
				'[data-name="OTPInput"]'
			) as NodeListOf<HTMLInputElement>

			const values: string[] = []
			OTPInputs.forEach((OTPInput: HTMLInputElement) => {
				if (OTPInput.value) {
					values.push(OTPInput.value)
				}
			})

			if (values.length === 4) {
				axios.post('http://localhost:8003/auth/otpcheck', { code: values.join('') })
			}
		})

	return (
		<>
			<form action='#hhtp//localhost:3001'>
				<div className={styles.accountModal}>
					{modalState === 1 ? (
						<>
							<button onClick={modalCloseHandler} className={styles.closeBtn}>
								<FontAwesomeIcon
									className={styles.closeicon}
									icon={xMarkIconDefinition}
								/>
							</button>
							<h1 className={styles.accountModalStep}>{modalState} stap 4</h1>
							<div className={styles.accountModalInput}>
								<h1>Create an account</h1>
								<div className={styles.inputContainer}>
									<input
										// id='name'
										type='text'
										ref={nameRef}
										className={styles.inputName}
										autoFocus={true}
										onChange={warning}
										onKeyDown={InputHandler}
										value={name}
									/>
									<label htmlFor='name' className={styles.filled}>
										Name
									</label>
									<label className={styles.letterCounter}>{counter}/50</label>
								</div>
								<div className={styles.inputContainer}>
									<input
										className={styles.inputPhoneEmail}
										ref={phoneEmailRef}
										type={emailPhone ? 'text' : 'email'}
										onChange={cheakInputHandler}
										value={email}
									/>
									<label className={styles.filled}>
										{emailPhone ? 'Phone' : 'Email'}
									</label>
								</div>

								<button
									className={styles.accountModalChangeBtn}
									tabIndex={-1}
									onClick={changeEmailPhone}
								>
									use {emailPhone ? 'email' : 'phone'} instead
								</button>
							</div>
							<div className={styles.accountModalText}>
								<h3>Date of bith</h3>
								<p>
									This will not be shown publicly. Confirm your own age, even if this
									account is for a business, a pet, or something else.
								</p>
							</div>
							<div className={styles.accountModalDate}>
								<div className={styles.dateMonth}>
									<label className={styles.filledMonth}>Month</label>
									<select
										onChange={monthCheck}
										ref={monthRef}
										className={styles.month}
										value={month}
									>
										{months.map(month => {
											return <option key={Math.random()}>{month} </option>
										})}
									</select>
								</div>
								<div className={styles.dateDate}>
									<label className={styles.filledDate}>Date</label>
									<select
										ref={dateRef}
										onChange={dateCheck}
										value={date}
										className={styles.date}
									>
										{listOfDates.map(date => {
											return <option key={Math.random()}>{date}</option>
										})}
									</select>
								</div>
								<div className={styles.dateYear}>
									<label className={styles.filledYear}>Year</label>
									<select
										ref={yearRef}
										onChange={yearCheck}
										value={isYear}
										className={styles.year}
									>
										{listOfYears.map(year => {
											return <option key={Math.random()}>{year}</option>
										})}
									</select>
								</div>
							</div>
							<button
								ref={nextButtonRef}
								onClick={(e): void => {
									e.preventDefault()
									setModalState(2)
								}}
								className={styles.submitButton}
							>
								Next
							</button>
						</>
					) : (
						<>
							<button
								className={styles.closeBtn}
								onClick={() => {
									setModalState(modalState - 1)
								}}
							>
								<FontAwesomeIcon
									className={styles.closeicon}
									icon={coffeeIconDefinition}
								/>
							</button>
							<h1 className={styles.accountModalStep}>{modalState} stap 3</h1>
							<h1 className={styles.accountModalSetting}>
								Настройте Твиттер, как вам удобно
							</h1>
							<h2>
								Отслеживать, на каких сайтах осуществляется показ материалов Твиттера
							</h2>
							<p className={styles.secondModalText}>
								Твиттер использует эти данные для подбора контента для вашей ленты. Ваши
								имя, адрес электронной почты и номер телефона никогда не будут храниться
								вместе с историей посещенных веб-сайтов.
							</p>
							<input className={styles.checkbox} type='checkbox' />

							<p className={styles.secondModalText2}>
								Регистрируясь, вы принимаете наши &nbsp;
								<a href='#'>Условия, Политику конфиденциальности</a> и
								<a href='#'>&nbsp;Политику использования файлов cookie.</a> Twitter
								может использовать ваши контактные данные, в том числе адрес электронной
								почты и номер телефона, в целях, описанных в нашей Политике
								конфиденциальности. <a href='#'>Подробнее</a>
							</p>
							<button
								ref={nextButtonRef}
								onClick={(e): void => {
									e.preventDefault()
									setModalState(3)
								}}
								className={styles.submitButton}
							>
								Next
							</button>
						</>
					)}
					{modalState === 3 ? (
						<div className={styles.accountModal}>
							<button
								className={styles.closeBtn}
								onClick={() => {
									setModalState(modalState - 1)
								}}
							>
								<FontAwesomeIcon
									className={styles.closeicon}
									icon={coffeeIconDefinition}
								/>
							</button>
							<h1 className={styles.accountModalStep}>{modalState} stap 4</h1>
							<h1>Create an account</h1>
							<div className={styles.inputContainerCheck}>
								<input
									id='name'
									type='text'
									ref={nameRef}
									className={styles.inputNameCheck}
									value={name}
									onClick={(e): void => {
										e.preventDefault()
										setModalState(1)
									}}
								/>
								<span className={styles.inputContainerCheckIcon}>
									<FontAwesomeIcon className={styles.cheakIcon} icon={circleCheak} />
								</span>
								<label htmlFor='name' className={styles.filledCheck}>
									Name
								</label>
							</div>
							<div className={styles.inputContainer}>
								<input
									className={styles.inputPhoneEmailChe}
									ref={phoneEmailRef}
									type={emailPhone ? 'text' : 'email'}
									value={email}
									onClick={(e): void => {
										e.preventDefault()
										setModalState(1)
									}}
								/>
								<span className={styles.inputContainerCheckIcon}>
									<FontAwesomeIcon className={styles.cheakIcon} icon={circleCheak} />
								</span>
								<label className={styles.filledCheck}>
									{emailPhone ? 'Phone' : 'Email'}
								</label>
							</div>
							<div
								className={styles.dateOfContainer}
								onClick={(e): void => {
									e.preventDefault()
									setModalState(1)
								}}
							>
								<div className={styles.dateOfInfo}>
									<span>{date}</span>
									<span>{month}.</span>
									<span>{isYear}.</span>
								</div>

								<span className={styles.inputContainerCheckIcon2}>
									<FontAwesomeIcon className={styles.cheakIcon2} icon={circleCheak} />
								</span>
								<label htmlFor='name' className={styles.filledCheck2}>
									Date of birthday
								</label>
							</div>
							<button
								ref={nextButtonRef}
								onClick={(e): void => {
									e.preventDefault()
									setModalState(5)
								}}
								
								className={styles.submitButton}
							>
								Next
							</button>
						</div>
					) : (
						<></>
					)}
					{modalState === 5 ? (
						<div className={styles.accountModal}>
							<button
								className={styles.closeBtn}
								onClick={() => {
									setModalState(modalState - 2)
								}}
							>
								<FontAwesomeIcon
									className={styles.closeicon}
									icon={coffeeIconDefinition}
								/>
							</button>
							<h1 className={styles.accountModalStep}>{modalState - 1} stap 4</h1>
							<h1 className={styles.exModalTittle}>Create a password</h1>
							<span>Необходимо ввести не менее 8 символов.</span>
							<div className={styles.inputContainer}>
								<input
									id='name'
									type={password}
									ref={passwordRef}
									className={styles.inputName}
									autoFocus={true}
									onChange={cheakPassword}
								/>
								<label htmlFor='name' className={styles.filled}>
									Password
								</label>
								<span onClick={handleToggle} className={styles.passwordEye}>
									<FontAwesomeIcon icon={eye ? eyeIconOf : eyeIcon} />
								</span>
							</div>

							<button
								ref={nextButtonRef}
								onClick={(e): void => {
									e.preventDefault()
								}}
								className={styles.submitButton}
							>
								Next
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			</form>
		</>
	)
}