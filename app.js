import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js';
import { Tareas } from "./models/tareas.js";



const main = async()=>{
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
        // console.log(tarea);
    }

    do{
        //Esta función imprime el menú
        opt = await inquirerMenu();
        // console.log({opt});

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                // console.log( desc );
                tareas.crearTarea(desc);
            break;
        
            case '2':
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            
            break;

            case '5': //Completado | Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                // console.log(ids);
                tareas.toggleCompletadas( ids );
            break;

            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if ( id !== '0' ) {
                    //Preguntar si está seguro de borrar
                    const ok = await confirmar('¿Está seguro?');
                    // console.log({ok});
                    if ( ok ) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada :)');
                    }
                }
                
            break;
        
            default:
            break;
        }


        guardarDB( tareas.listadoArr );


        await pausa();

    } while( opt !== '0');
    
}

main();







