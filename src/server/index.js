const express = require('express')
const cors = require('cors')
const otpGenerator = require('otp-generator')

const server = express()
const PORT = 3002

server.use(cors())
server.use(express.json())

server.post('/auth', (req, res) => {
	const otp = otpGenerator.generate(4, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	})
})

server.post('/auth/otpcheck', (req, res) => {
})
 


