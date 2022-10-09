/**
 * _listado:
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' },
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' },
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' }
 */

import colors from 'colors';
import { Tarea } from "./tarea.js";

class Tareas {
    
    _listado = {};

    constructor(){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];
        //Extraer las llaves que se encuentren en el objeto
        Object.keys(this._listado).forEach(key =>{
            // console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    borrarTarea( id = '' ){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        // console.log(tarea);
    }

    cargarTareasFromArray( tareas ) {

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });

        return this._listado
        // console.log(this._listado);
    }

    listadoCompleto(){

        console.log('\n');

        this.listadoArr.forEach((tarea, i) =>{

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            // console.log(desc)
            const estado = (completadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red
            
            console.log(`${ idx }. ${ desc } :: ${ estado }`);

        });
    }

    listarPendientesCompletadas( completadas = true ){

        let contador = 0;

        console.log('\n');

        this.listadoArr.forEach( (tarea)=>{
    
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red

            if (completadas) {
                if(completadoEn){
                    contador += 1;
                    console.log(`${ (contador.toString() + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }

            } else {

                if(!completadoEn){
                    contador += 1;
                    console.log(`${ (contador.toString() + '.').green }. ${ desc } :: ${ estado }`);
                }
            }

        });
    }


}

export { Tareas };