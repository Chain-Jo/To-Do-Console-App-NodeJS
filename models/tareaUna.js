import { v4 as uuidv4 } from 'uuid';


class TareaUna {
    id = '';
    descripcion = '';
    completadoEn = null;
    
    constructor(descripcion) {
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadoEn = null;
    }

}


export {TareaUna};