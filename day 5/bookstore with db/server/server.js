// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import overwriteResponseJSON from './middlewares/overwriteResponseJSON.js'

import './database/database.js'
import indexRouter from './routes/index.js'
import bookRouter from './routes/books.js'
import userRouter from './routes/users.js'
import orderRouter from './routes/orders.js'


// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
})) //cho phep gui request tu 2 localhost khac nhau
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/public', express.static('public'))
server.use(cookieParser())
server.use(overwriteResponseJSON)
// server.use('/public1', express.static('public'))
// /public1 se thay the chuoi o trong static 
//vd
// server.use('/public', express.static('public/image'))
// nhu nay thi /public se thay thay public/image


// ===== Routes =====
server.use('/', indexRouter)
server.use('/books', bookRouter)
server.use('/users', userRouter)
server.use('/orders', orderRouter)



server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
