// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import './database/database.js'
import indexRouter from './routes/index.js'
import songRouter from './routes/songs.js'
import userRouter from './routes/users.js'
import albumRouter from './routes/albums.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/public', express.static('public'))
server.use(cookieParser())
// server.use('/public1', express.static('public'))
// /public1 se thay the chuoi o trong static 
//vd
// server.use('/public', express.static('public/image'))
// nhu nay thi /public se thay thay public/image


// ===== Routes =====
server.use('/', indexRouter)
server.use('/books', songRouter)
server.use('/users', userRouter)
server.use('/orders', albumRouter)



server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
