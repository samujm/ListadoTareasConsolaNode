/**
 * _listado:
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' },
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' },
 *       { 'uuid-212321321-1343432432 : { id:12, desc:asad, completadoEn: 942212}' }
 */

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

    cargarTareasFromArray( tareas ) {

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });

        return this._listado
        // console.log(this._listado);
    }


    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    
    listadoCompleto(){
        //numero en verde
        //completada : verde
        //Pendiente: rojo
        //1. uno en verde, despues descripcion, :: Completada | Pendiente
        //. 
    }

}

export { Tareas };