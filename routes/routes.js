import express from 'express';
import 'dotenv/config';
import song from '../model/song.js';

const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        cover: req.body.cover,
        lyrics: req.body.lyrics
    });

    try {
        const saved = await data.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await song.find().limit(4).sort({ _id: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await song.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

//Update by ID Method
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const options = { new: true };
        const data = await song.findByIdAndUpdate(id, newData, options);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await song.findByIdAndDelete(id);
        res.send(`Song ${data.title} has been deleted..`)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/artist/:name', async (req, res) => {
    try {
        const data = await song.find({ artist: { '$regex': req.params.name, "$options": "i" } });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;