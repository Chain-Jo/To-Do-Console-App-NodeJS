import inquirer from 'inquirer';
import chalk from 'chalk';

import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';


const preguntasMenu = [
    {
        type: 'list',
        name: 'opciones',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ chalk.red('1.') } Crear tarea.`
            },
            {
                value: '2',
                name: `${ chalk.red('2.') } Listar tarea(s).`
            },
            {
                value: '3',
                name: `${ chalk.red('3.') } Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${ chalk.red('4.') } Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${ chalk.red('5.') } Completar tarea(s).`
            },
            {
                value: '6',
                name: `${ chalk.red('6.') } Borrar tarea.`
            },
            {
                value: '0',
                name: `${ chalk.red('0.') } Salir. \n`
            },
            
        ]
    }
];


const inquirerMenu = async() => {
    console.clear();
    console.log(chalk.red('==========================='));
    console.log(chalk.black.bgWhite.bold('   Seleccione una opción   '));
    console.log(chalk.red('===========================\n'));

    const {opciones} = await inquirer.prompt(preguntasMenu);

    return opciones;
        
}


const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Presione ${ chalk.red('ENTER') } para continuar \n`
        }
    ]
    console.log('\n');

    await inquirer.prompt(question)
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor.'
                }
                return true
            }
        }
    ];

    const {descripcion} = await inquirer.prompt(question);
    return descripcion;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, index) => {

        const idx = `${chalk.red(index + 1 + '.')}`;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${chalk.red('0.')} Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmarBorrado = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;

}



const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, index) => {

        const idx = `${chalk.red(index + 1 + '.')}`;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

}





export {
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar, 
    confirmarBorrado,
    mostrarListadoCheckList
}
