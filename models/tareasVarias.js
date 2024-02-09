 /**
  *  _listado:
  *     {}
  */
import chalk from 'chalk';
import { TareaUna } from './tareaUna.js';



class TareasVarias {
    _listado = {};

    get listadoArreglo() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
            
        });

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {
        if(this._listado[id]){
            delete  this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tareaUna => {
            this._listado[tareaUna.id] = tareaUna;

        })
    }

    crearTareas(descripcion = '') {
        const tareaUna = new TareaUna(descripcion);

        this._listado[tareaUna.id] = tareaUna;
    }

    listadoCompleto() {

        console.log('');
        
        this.listadoArreglo.forEach((tarea, indice) => {
            const idx = `${chalk.red(indice + 1)}` 
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? chalk.green('Completado')
                                : chalk.red('Pendiente');
            
            console.log(`${idx} ${descripcion} :: ${estado}`);
            
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log('');

        let indice = 0;
        
        this.listadoArreglo.forEach((tarea) => {
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? chalk.green('Completado')
                                : chalk.red('Pendiente');
            if (completadas) {
                // Mostrar completadas
                if (completadoEn) {
                    indice += 1;
                    console.log(`${chalk.red(indice.toString() + '.')} ${descripcion} :: ${chalk.black.bgWhite.bold(completadoEn)}`);
                    
                }
            } else {
                // Mostrar pendientes
                if (!completadoEn) {
                    indice += 1;
                    console.log(`${chalk.red(indice.toString() + '.')} ${descripcion} :: ${estado}`);
                }  
            }
            
        });
    }

    toggleCompletadas (ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArreglo.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

export {TareasVarias};