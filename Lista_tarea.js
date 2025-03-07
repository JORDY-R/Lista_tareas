// DAtos para la fecha
const fecha_num = document.getElementById("fecha_num");
const  fecha_mes = document.getElementById("fecha_mes");
const fecha_ano = document.getElementById("fecha_ano");
const fecha_dia = document.getElementById("fecha_dia");

//Contenedor de donde ira las tareas
const Contenedor_tareas = document.getElementById("tasksContainer");

//1-Nuevos cambios
const tareas_proceso = document.getElementById('Tarea_proceso');
const tareas_fin = document.getElementById('tarea_terminada');
//1- 


//Datos de fecha
const setDate = () => {
    const date = new Date();
    fecha_num.textContent = date.toLocaleString('es',{day: 'numeric'});
    fecha_mes.textContent = date.toLocaleString('es',{month: 'short'});
    fecha_ano.textContent = date.toLocaleString('es',{year: 'numeric'});
    fecha_dia.textContent = date.toLocaleString('es',{weekday: 'long'});
};

//Datos de Tarea
const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;

    const tarea = document.createElement('div');
    tarea.classList.add('task', 'redondear');
    tarea.textContent = value;

    //añadir funcion de eliminar
    const eliminar = document.createElement('button');
    eliminar.textContent = 'X';
    eliminar.classList.add('eliminar');
    eliminar.style.display = 'none'; //para que al comienzo se oculte
    eliminar.addEventListener('click', () => tarea.remove() ) //elimia la tarea
    
    tarea.addEventListener('click', () => changeTaskstate(tarea, eliminar) );

    //agrega el boton de eliminar
    tarea.appendChild(eliminar);
    //
    Contenedor_tareas.prepend(tarea);
    event.target.reset();
};

// añade clase para identificar que tarea esta en proceso
const changeTaskstate = (tarea, eliminar) => {
    tarea.classList.toggle('done');

    //para mostrar el boton cuando de click
    if (tarea.classList.contains('done')){
        eliminar.style.display = 'inline-block';
    } else{
        eliminar.style.display = 'none';
    }
};

//añade clase para identificar que tarea termino
const Tarea_terminada = event =>{
    event.target.classList.toggle('terminada')
};


//funcion ordenar - ordenaba en la misma columna donde se añadia tareas
// const ordenar = () => {
//     const hecho = [];
//     const terminado = [];
//     [...Contenedor_tareas.children].forEach( i => {
//         i.classList.contains('done') ? hecho.push(i) : terminado.push(i);
//     });
//     return [...terminado,...hecho];
// };

// const renderOrderedTasks = () => {
//     ordenar().forEach(i => Contenedor_tareas.appendChild(i));
// };

const comenzar_tareas = () =>{

    const proceso = [];

    
    // Recorrer las tareas en "Por Hacer" y seleccionar las que están "hechas"
    [...Contenedor_tareas.children].forEach(i => {
        if (i.classList.contains('done')) {
            proceso.push(i);
        }
    });

     // Mover las tareas seleccionadas a "Tarea en proceso"
    proceso.forEach(tarea => {
        tarea.querySelector('.eliminar').style.display = 'none';
        tarea.addEventListener('click', Tarea_terminada); // Ahora sí agregamos el event listener correctamente
        tareas_proceso.appendChild(tarea);
    });    
};

// Función para mover tareas a "Tareas terminadas"
const Tarea_finalizada = () => {
    const terminadas = [];

    [...tareas_proceso.children].forEach(i => {
        if (i.classList.contains('terminada')) {
            terminadas.push(i);
        }
    });

    terminadas.forEach(tarea => {
        tarea.classList.remove('done'); // Quitamos la clase "terminada" para evitar problemas
        tareas_fin.appendChild(tarea);
    });
};

setDate();