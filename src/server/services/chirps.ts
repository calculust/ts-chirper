import * as fs from 'fs';

interface IChirp {
    name: string;
    content: string;
}

interface IChirpData {
    [key: number]: IChirp;
    nextid: number;
}

let chirps: IChirpData = { nextid: 1 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

let getChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it
}

let getChirp = (id: number) => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}

let createChirp = (chirp: IChirp) => {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};

let updateChirp = (id: number, chirp: IChirp) => {
    chirps[id] = chirp;
    writeChirps();
}

let deleteChirp = (id: number) => {
    delete chirps[id];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

export default {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}