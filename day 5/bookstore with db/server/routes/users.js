import express from 'express'
import { DataResponse, InternalErrResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt  from 'jsonwebtoken'
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(DataResponse(users));
})

router.get('/:username', async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({
        where: {
            username: username,
        }
    })
    if(!user){
        res.json(MessageResponse('user not found'));
    }else{
        res.json(DataResponse(user));
    }
    
})


//register tuong duong voi create user nhung them hashFunction()
router.post('/register', async (req, res) => {
    const userInfo = req.body;

    try {
        const hashPassword = await bcrypt.hash(userInfo.password, 10)//10 la saltRound nghia la so vong de hash ra 1 pass
        //phai dat dk truoc o day khong no loi
        const user = await User.create({
            username: userInfo.username,
            password: hashPassword
        })
        console.log(user);
        res.json(DataResponse(user));
    } catch (err) {
        console.log(err)
        res.json(InternalErrResponse());
    }
})

//login
router.post('/login', async (req, res) => {
    const userInfo = req.body;

    const user = await User.findOne({
        where:{
            username: userInfo.username
        }
    })
    if(!user){
        res.json(NotFoundResponse())
        return;
    }
    const isMatch = await bcrypt.compare(userInfo.password, user.password)
    if(isMatch){
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }
        const token = jwt.sign( payload, process.env.SECRET, {
            expiresIn: '3h'//tham so thu 3 de bieu thi thoi gian het han token
        })//sign se dam bao du lieu khong thay doi vi sign thay doi theo data
        //line 69 gan cookie cho browser
        res.cookie('token', token) //token cam la key token xanh la value token store nhu map
        res.json(DataResponse({
            token: token
        }));
    }else{
        res.json(ErrorResponse(401, 'Invalid user or password'))
    }
})

router.delete('/:username', async (req, res) => {
    const username = req.params.username

    const rowAffected = await User.destroy({
        where: {
            username: username,
        }
    })
    if(rowAffected === 0){
        res.json(NotFoundResponse());
        
    }else{
        res.json(MessageResponse('User deleted'));
    }
    
})

router.put('/:username', async (req, res) => {
    const username = req.params.username
    const userInfo = req.body;

    const rowAffected = await User.update(userInfo, {
        where: {
            username: username,
        }
    })
    if(rowAffected[0] === 0){
        res.json(NotFoundResponse());
    }else{
        res.json(MessageResponse('user updated'));
    }
    
})


export default router
