import express from 'express'
import { DataResponse, MessageResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'
import Order from '../models/Order.js'
import OrderItem from '../models/OrderItems.js'
import User from '../models/User.js'
import Book from '../models/Book.js'


const router = express.Router()

router.post('/', requireRole('user') , async (req, res) => {
    const orderData = req.body
    const userId = res.locals.userData.id;

    const order = await Order.create({
        userId: userId,
    })

    orderData.items.forEach(item => {
        OrderItem.create({
            orderId: order.id,
            bookId: item.bookId,
            amount: item.amount
        })
    });

    res.json(DataResponse({
        orderId: order.id,
    }));
})

router.get('/', requireRole('user'), async (req, res) => {
    const userId = res.locals.userData.id

    const user = await User.findOne({
        where: {//include se lay theo where id con neu khong thi no lay het
            id: userId
        }
        ,
        include: { //nay giong nhu sub query kieu nhu lay nhung thg Order theo UserId o tren where
            model: Order,
            attributes: ['id', 'createdAt'], //cai nay giong nhu lay ra nhung col truoc from cua MySQL
            include: { //include tiep van dc
                model: OrderItem,
                as: 'items',
                attributes: ['amount', 'createdAt'],
                include: {
                    model: Book
                }
            }
        }
    })
    res.json(DataResponse(user.orders))
})

export default router
