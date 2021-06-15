import * as express from 'express';
import chirpsService from '../services/chirps';
let router = express.Router();

interface IChirpDataArray {
    id: number;
    name: string;
    content: string;
    date: number;
}

router.get('/:id?', (req, res) => {
    let id: number = Number(req.params.id)
    if(id) {
        let chirpDTO = chirpsService.GetChirp(id);
        if(!chirpDTO.name) {
            res.json({ id, name: 'Error', content: 'Does Not Exist', date: Date.now() });
        } else {
            res.json(chirpDTO);
        }
    } else {
        const data = chirpsService.GetChirps();
        const chirps = Object.keys(data).map(key => ({
            id: Number(key),
            ...data[Number(key)]
        }));
        chirps.pop()
        res.json(chirps);
    }
}); 

router.post('/', (req, res) => {
    chirpsService.CreateChirp(req.body);
    console.log(req.body);
    res.status(200).json({ message: 'Chirp has been added successfully.' });
})

router.delete('/:id?', (req, res) => {
    let id: number = Number(req.params.id);
    if(id) {
        chirpsService.DeleteChirp(id);
        res.sendStatus(200);
    } else {
        res.send(chirpsService.GetChirps());
    }
})

router.put('/:id?', (req, res) => {
    let id: number = Number(req.params.id);
    if(id) {
        chirpsService.UpdateChirp(id, req.body);
        console.log(id);
        console.log(req.body);
        res.status(200).json({ message: 'Chirp has been edited successfully.' });
    } else {
        res.status(400).json({ message: 'Chirp ID must be provided' });
    }
})

export default router;