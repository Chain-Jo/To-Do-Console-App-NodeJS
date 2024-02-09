const { rejects } = require('assert');
import chalk from 'chalk';
const { resolve } = require('path');
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';
require('@colors/colors');

const mostrarMenu = () => {

    return new Promise ((resolve, reject) => {
        console.clear();
        console.log(chalk.red('==========================='));
        console.log(chalk.black.bgWhite.bold('   Seleccione una opción   '));
        console.log(chalk.red('===========================\n'));
        
    
        console.log(`${ chalk.red('1.') } Crear tarea.`);
        console.log(`${ chalk.red('2.') } Listar tarea(s).`);
        console.log(`${ chalk.red('3.') } Listar tareas completadas.`);
        console.log(`${ chalk.red('4.') } Listar tareas pendientes.`);
        console.log(`${ chalk.red('5.') } Completar tarea(s).`);
        console.log(`${ chalk.red('6.') } Borrar tarea.`);
        console.log(`${ chalk.red('0.') } Salir. \n`);
        
        const readLine = readline.createInterface({ input, output });
    
        readline.question('Seleccione una opción: ', (opcion) => {
    
            readline.close();
            resolve(opcion);
        });

    });

}


const pausa = () => {

    return new Promise ((resolve, reject) => {
        
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            readline.question(`\n Presione ${ chalk.red('ENTER') } para continuar \n` , (opcion) => {
                readline.close();
                resolve();
            });

    })
    
}

export { pausa, mostrarMenu };