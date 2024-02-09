import fs from 'fs';

const archivo = '../04-To-Do-App-NodeJS/database/data.json'
const guardarInformacion = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDataBase = () => {
    if (!fs.existsSync(archivo)) {
        return null
    } 
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info)
    // console.log(data);
    
    return data;
}

export {guardarInformacion, leerDataBase}