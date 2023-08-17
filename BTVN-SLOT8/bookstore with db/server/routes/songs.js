import express from 'express'
import { DataResponse, InternalErrResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import fileUpload from 'express-fileupload'
import Song from '../models/Song.js'
import { requireRole } from '../middlewares/auth.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const songs = await Song.findAll();
    res.json(DataResponse(songs));
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const song = await Song.findOne({
        where: {
            id: id,
        }
    })
    song.listen_Count++;
    if(!song){
        res.json(MessageResponse('Song not found'));
    }else{
        res.json(DataResponse(song));
    }
})

router.get('/listen_Count/song/:songID', async (req, res) => {
    const songID = parseInt(req.params.songID)
    try {
        const song = await Song.findOne({
            where:{
                id: songID
            }
        })
        let count = song.listen_Count;
        res.json(DataResponse(count))
    } catch (error) {
        res.json(InternalErrResponse())
    }
})

router.post('/', requireRole("user"), async (req, res) => {
    const songData = req.body;

    try {
        //phai dat dk truoc o day khong no loi
        const song = await Song.create(songData)
        // console.log(album);
        res.json(DataResponse(song));
    } catch (err) {
        console.log(err)
        res.json(InternalErrResponse());
    }
})

router.delete('/:id', requireRole("user"), async (req, res) => {
    const id = parseInt(req.params.id)

    const rowAffected = await Song.destroy({
        where: {
            id: id,
        }
    })
    if(rowAffected === 0){
        res.json(NotFoundResponse());
        
    }else{
        res.json(MessageResponse('Song deleted'));
    }
    
})

router.put('/:id', requireRole("user"), async (req, res) => {
    const id = parseInt(req.params.id)
    const songData = req.body;

    const rowAffected = await Song.update(songData, {
        where: {
            id: id,
        }
    })
    if(rowAffected[0] === 0){
        res.json(NotFoundResponse());
    }else{
        res.json(MessageResponse('Song updated'));
    }
    
})

router.post('/upload_song', requireRole("user"), fileUpload(), async (req, res) => {
    const song_name = req.body.song_name
    const composer = req.body.composer
    const music = req.files.music

    const save_path = `./public/music/${song_name}`
    music.mv(save_path)
    try{
        const song = await Song.create({
            song_name: song_name,
            composer: composer,
            save_path: save_path,
            isPrivate: false,
            listen_Count: 0,
        })
        res.json(MessageResponse('Song upload successfully'))
    }catch(error){
        res.json(InternalErrResponse())
    }
})

router.put('/setPrivacy', requireRole('user'), async (req, res) => {
    const songID = parseInt(req.body.id)
    const isPrivate = req.body.isPrivate
    const song = await Song.update({isPrivate: isPrivate}, {
        where: {
            id: songID
        }
    })
})

router.get('/download', requireRole('user'), async (req, res) => {
    
})
export default router
