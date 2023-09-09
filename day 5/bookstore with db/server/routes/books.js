import express from 'express'
import { DataResponse, InternalErrResponse, InvalidTypeResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import { Op } from 'sequelize'
import Book from '../models/Book.js'
import fileUpload from 'express-fileupload'
import { requireRole } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {// dau || neu exp1 || exp2 ma exp1 tra ve gia tri falsy thi no se tra ve exp2
    // con dau ?? neu exp1 ?? exp2 ma exp1 tra ve null hoac undefined thi tra ve exp2
    const pageNo = parseInt(req.query.page_no) || 1
    const limit = parseInt(req.query.limit) || 10
    const title = req.query.title || ''
    console.log(pageNo, limit);

    const books = await Book.findAll({
        limit: limit,//do dai cua 1 khung
        offset: (pageNo - 1) * limit,//vi tri khung
        where: {
            title: {
                [Op.like]: '%' + title
            }
        }
    });

    res.json(DataResponse(books));
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const book = await Book.findOne({
        where: {
            id: id,
        }
    })
    if (book == null) {
        res.json(NotFoundResponse());
    } else {
        res.json(DataResponse(book));
    }

})

router.post('/', requireRole('user'), fileUpload(), async (req, res) => {
    const { title, author, summary } = req.body; //destructuring
    const thumbnailImage = req.files.thumbnail_image 
    const [fileType, fileExt] = thumbnailImage.mimetype.split('/') //cai nay bai tournament da co roi
    const userId = res.locals.userData.id

    const savePath = `./public/image/${Date.now()}_${title.replace(' ', '-')}.${fileExt}`
    const allowExtensions = ['png', 'jpeg', 'jpg']
    thumbnailImage.mv(savePath)

    if (!fileType === 'image' || !allowExtensions.includes(fileExt)) {
        res.json(InvalidTypeResponse())
        return;
    } else {
        try {
            //phai dat dk truoc o day khong no loi
            const book = await Book.create({
                title: title, // de la title khong thoi cung dc
                author: author,
                summary: summary,
                creatorId: userId, //cai nay k dc vi 2 ve khac nhau
                thumbnailImage: savePath, //cai nay nhu id
            })
            
            res.json(DataResponse({
                id: book.id,
                thumbnailImage: savePath
            }));
        } catch (err) {
            console.log(err)
            res.json(InternalErrResponse());
        }
    }

})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const rowAffected = await Book.destroy({
            where: {
                id: id,
            }
        })
        if (rowAffected === 0) {
            res.json(NotFoundResponse());

        } else {
            res.json(MessageResponse('Book deleted'));
        }
    } catch (error) {
        console.log(error)
        res.json(InternalErrResponse())
    }

})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const bookData = req.body;

    try {
        const rowAffected = await Book.update(bookData, {
            where: {
                id: id,
            }
        })
        if (rowAffected[0] === 0) {
            res.json(NotFoundResponse());
        } else {
            res.json(MessageResponse('book updated'));
        }
    } catch (error) {
        console.log(error)
        res.json(InternalErrResponse())
    }

})


export default router
