import React, { useState, useEffect } from 'react'
import { Container, AccountModal, LogInModal, Banner } from './components'
// import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
	const [isOpenAccountModal, setIsOpenAccountModal] = useState(false)
	const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
	useEffect(() => {})
	return (
		<>
			<Banner
				setIsOpenAccountModal={setIsOpenAccountModal}
				setIsOpenLoginModal={setIsOpenLoginModal}
				isOpenLoginModal={isOpenLoginModal}
			/>
			<Container>
				{isOpenAccountModal && (
					<AccountModal 
						IsOpenAccountModal={isOpenAccountModal}
						setIsOpenAccountModal={setIsOpenAccountModal}
						
					/>
				 )}
				{isOpenLoginModal && (
					<LogInModal
						IsOpenLoginModal={isOpenLoginModal}
						setIsOpenLoginModal={setIsOpenLoginModal} />
				)}
			</Container>
		</>
	// 	const App: React.FC = () => {
	// const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

	// useEffect(() => {
		
	// })
	// return (
	// 	<>
	// 		<Container>
	// 			<Banner setIsAuthModalOpen={setIsAuthModalOpen} />
	// 			<NavigationBar />
	// 			<AuthModal
	// 				isAuthModalOpen={isAuthModalOpen}
	// 				setIsAuthModalOpen={setIsAuthModalOpen}
	// 			/>
	)
}

export default App
