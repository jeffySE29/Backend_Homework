import express from 'express'
import { DataResponse, InternalErrResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'
import Album from '../models/Album.js'
import Album_details from '../models/Album_details.js'

const router = express.Router()

router.get('/', requireRole("user"), async (req, res) => {
    const albums = await Album.findAll();
    res.json(DataResponse(albums));
})

router.get('/:id', requireRole("user"), async (req, res) => {
    const id = parseInt(req.params.id)
    const album = await Album.findOne({
        where: {
            id: id,
        }
    })
    if(!album){
        res.json(MessageResponse('Album not found'));
    }else{
        res.json(DataResponse(album));
    }
    
})

router.post('/', requireRole("user"), async (req, res) => {
    const userID = res.locals.userData.id
    const album_name = req.body

    try {
        const album = await Album.create({
            userID: userID,
            album_name: album_name,
            isPrivate: true,
        })
        console.log(album)
        res.json(MessageResponse("Create album successfully"));
    } catch (error) {
        res.json(InternalErrResponse());
    }
})

router.post('/:albumID/song/:songID', requireRole("user"), async(req,res) => {
    const albumID = parseInt(req.params.albumID)
    const songID = parseInt(req.params.songID)

    try {
        const album_details = await Album_details.create({
            albumID: albumID,
            songID: songID,
        })
        console.log(album_details)
        res.json(MessageResponse("Album details added"))
    } catch (error) {
        res.json(InternalErrResponse())
    }
})


router.delete('/:id', requireRole("user"), async (req, res) => {
    const id = parseInt(req.params.id)

    const rowAffected = await Album.destroy({
        where: {
            id: id,
        }
    })
    if(rowAffected === 0){
        res.json(NotFoundResponse());
        
    }else{
        res.json(MessageResponse('Album deleted'));
    }
    
})

router.delete('/:albumID/song/:songID', requireRole("user"), async (req, res) => {
    const albumID = parseInt(req.params.albumID)
    const songID = parseInt(req.params.songID)

    const rowAffected = await Album_details.destroy({
        where: {
            albumID: albumID,
            songID: songID,
        }
    })
    if(rowAffected === 0){
        res.json(NotFoundResponse());
        
    }else{
        res.json(MessageResponse('Album deleted'));
    }
    
})

router.put('/:id', requireRole("user"), async (req, res) => {
    const id = parseInt(req.params.id)
    const albumData = req.body;

    const rowAffected = await Album.update(albumData, {
        where: {
            id: id,
        }
    })
    if(rowAffected[0] === 0){
        res.json(NotFoundResponse());
    }else{
        res.json(MessageResponse('Album updated'));
    }
    
})

router.put('/setPrivacy', requireRole('user'), async (req, res) => {
    const albumID = parseInt(req.body.id)
    const isPrivate = req.body.isPrivate
    try {
        const album = await Album.update({isPrivate: isPrivate}, {
            where: {
                id: albumID
            }
        })
        let album_name = album.album_name;
        res.json(MessageResponse(`${album_name}'s privacy is updated`))
    } catch (error) {
        res.json(InternalErrResponse())
    }
})

export default router
