/* eslint-disable no-unused-vars */
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconLookup, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect } from 'react';



import styles from './LogInModal.module.scss';


// import React, { useEffect, useRef, useState } from 'react'
library.add(fas)

export interface ILogInModalProps {
	IsOpenLoginModal: boolean
	setIsOpenLoginModal: Function
}

export const LogInModal: React.FC<ILogInModalProps> = ({
	IsOpenLoginModal,
	setIsOpenLoginModal,
}: ILogInModalProps) => {
	const xMark: IconLookup = {
		prefix: 'fas',
		iconName: 'xmark',
	}
	const xMarkIconDefinition: IconDefinition = findIconDefinition(xMark)
	useEffect(() => {
		const password = document.querySelector('input')
		axios.get('http://localhost:3002/auth/otpcheck').then(res => {
			const localPassword = res.data
			console.log(localPassword);
			
		})
		// if(password=)
	})
	return (
		
		<>
			<div className={styles.loginModal}>
				<button className={styles.closeBtn}
					onClick={() => {
						setIsOpenLoginModal(false)
					}}
				>
					<FontAwesomeIcon className={styles.closeicon} icon={xMarkIconDefinition} />
				</button>
				<img src='twitter-logo-4 1.svg' alt='' className={styles.loginModalLogo} />
				<div className={styles.loginModalInput}>
					<h1>Log in to Twitter</h1>
					<input type='text' placeholder='Phone number, email adress' />
					<input type='tell' placeholder='Password' />
				</div>
				<button className={styles.loginModalBtn}>Log in</button>
				<div className={styles.loginModalNav}>
					<a href='#'>Forgot password ?</a>
					<a href='#'>Sign up to Twitter</a>
				</div>
			</div>
		</>
	)
}