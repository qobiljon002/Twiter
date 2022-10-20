import React, { useState } from 'react'
import {Container,AuthModal } from './components'

const App: React.FC = () => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	return (
		<>
			<Container>
				<AuthModal isAuthModalOpen={isAuthModalOpen}
					setIsAuthModalOpen={setIsAuthModalOpen}/>
			</Container>
		</>
	)
}

export default App
