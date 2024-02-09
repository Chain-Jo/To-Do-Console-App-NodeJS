import chalk from 'chalk';

import { 
    inquirerMenu, 
    pausa,
    leerInput, 
    listadoTareasBorrar,
    confirmarBorrado,
    mostrarListadoCheckList,
} from './helpers/inquirer.js';
import { TareasVarias } from './models/tareasVarias.js';
import { guardarInformacion, leerDataBase } from './helpers/guardarArchivo.js';



const main = async() => { 
    
    // Imprimir el menú
    let opcion = '';

    const tareasVarias = new TareasVarias();

    const tareasDB = leerDataBase();

    if (tareasDB) { // Cargar tareas
        // Establecer las tareas
        tareasVarias.cargarTareasFromArray(tareasDB);
    }


    do {
        opcion = await inquirerMenu();
        console.log({opcion});

        switch (opcion) {
            case '1':
                // crear opcion
                const descripcion = await leerInput('Descripciòn:')
                tareasVarias.crearTareas(descripcion);
                
            break;

            case '2':
                tareasVarias.listadoCompleto();
                // console.log(tareasVarias.listadoArreglo);
            break;
            case '3': // Listar completadas
                tareasVarias.listarPendientesCompletadas(true);
            break;
            case '4': // Listar pendientes
                tareasVarias.listarPendientesCompletadas(false);
            break;
            case '5': // Compledados | Pendientes
                const ids = await mostrarListadoCheckList(tareasVarias.listadoArreglo)
                tareasVarias.toggleCompletadas(ids)             
            break;
            case '6': // Borrar tareas
                const id =  await listadoTareasBorrar(tareasVarias.listadoArreglo);

                if (id !== '0') {
                    const ok = await confirmarBorrado('¿Estás seguro?');
                    
                    if (ok) {
                        tareasVarias.borrarTarea(id);
                        console.log(`${chalk.green('Tarea borrada :D')}`);
                        
                    }
                    
                }
            break;
        
        }
        
        guardarInformacion(tareasVarias.listadoArreglo);
        

        

        await pausa();
        
    } while (opcion !== '0');
}

main();