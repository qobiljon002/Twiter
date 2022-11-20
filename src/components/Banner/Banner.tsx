import styles from './Banner.module.scss'

export interface IBannerProps {
	setIsOpenLoginModal: Function
	setIsOpenAccountModal: Function
	isOpenLoginModal: boolean
}

export const Banner: React.FC<IBannerProps> = ({
	setIsOpenLoginModal,
	setIsOpenAccountModal,
}: IBannerProps) => {
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.container}>
					<div className={styles.bannerMenu}>
						<div className={styles.bannerLeft}>
							<img
								src='back_twitter.png'
								className={styles.bannerLeftBackground}
								alt=''
							/>
						</div>
						<div className={styles.bannerRight}>
							<div className={styles.bannerLogo}>
								<img src='twitter-logo-4 1.svg' alt='' />
							</div>
							<h1 className={styles.bannerRightTitle}>Happening now</h1>
							<h2 className={styles.bannerRightTitle2}>Join Twitter today</h2>
							<div className={styles.sign}>
								<div className={styles.login}>
									<button type='button' className={styles.loginButton}>
										<img src='google-icon 1.svg' alt='' />
										<span className={styles.loginSpan}>Sign up with Google</span>
									</button>
								</div>
								<div className={styles.login}>
									<button className={styles.loginButton}>
										<img src='logo-apple 1.svg' alt='' />
										<span className={styles.loginSpan}>Sign up with Apple</span>
									</button>
								</div>
								<div
									className={styles.login}
									onClick={() => {
										setIsOpenAccountModal(true)
									}}
								>
									<button className={styles.loginButton} >
										<span className={styles.loginSpan}>Sign up with phone or email</span>
									</button>
								</div>
								<div className={styles.cockies}>
									<p className={styles.cookiesInfo}>
										By singing up you agree to the <a href='#'>Terms of Service</a> and
										<a href='#'> Privacy Policy</a>, including <a href='#'>Cookie Use</a>.
									</p>
									<span className={styles.cookiesAccount}>
										Already have an account?&nbsp;
										<a
											onClick={() => {
												setIsOpenLoginModal(true)
											}}
											href='#'
										>
											Log in
										</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
