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
    if(!value) {
        return;
    } else if (value.length > 32){
        alert("Error: Ah excedido el número de caracteres permitido");
        event.target.reset();
        return;
    };

    const tarea = document.createElement('div');
    tarea.classList.add('task', 'redondear');
    tarea.textContent = value;

    //añadir un boton de eliminar tarea
    const eliminar = document.createElement('button');
    eliminar.textContent = 'X';
    eliminar.classList.add('eliminar');
    eliminar.style.display = 'none'; //para que al comienzo se oculte
    eliminar.addEventListener('click', () => tarea.remove() ) //elimia la tarea
    
    //añadir un boton para editar la tarea
    const editar = document.createElement('button');
    editar.textContent = '✏️' ;
    editar.classList.add('editar');
    editar.style.display = 'none';
    editar.addEventListener('click', () => editarTarea(tarea));

    //para mostrar botones
    tarea.addEventListener('click', () => changeTaskstate(tarea, eliminar,editar) );


    //agrega el boton de eliminar
    tarea.appendChild(eliminar);
    tarea.appendChild(editar);
    //
    Contenedor_tareas.prepend(tarea);
    event.target.reset();
};

const editarTarea = (tarea) => {
    // Obtener el texto actual de la tarea
    const textoActual = tarea.firstChild.textContent; 

    // Crear un nuevo input para edición
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoActual;
    input.classList.add('tarea_editada');

    // Guardamos los botones para no perderlos
    const botones = [...tarea.querySelectorAll('button')];

    // Limpiar el contenido de la tarea y agregar el input
    tarea.textContent = '';
    tarea.appendChild(input);

    // Volver a agregar los botones después del input
    botones.forEach(boton => tarea.appendChild(boton));

    // Guardar cambios al presionar "Enter"
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const nuevoTexto = input.value.trim();
            if (nuevoTexto) {
                // Restaurar el texto editado sin eliminar los botones
                tarea.textContent = nuevoTexto;
                botones.forEach(boton => tarea.appendChild(boton));
            } else {
                // Si el input está vacío, restaurar el texto original
                tarea.textContent = textoActual;
                botones.forEach(boton => tarea.appendChild(boton));
            }
        }
    });

    input.focus();
};


// añade clase para identificar que tarea esta en proceso
const changeTaskstate = (tarea, eliminar, editar) => {
    tarea.classList.toggle('done');

    //para mostrar el boton cuando de click
    if (tarea.classList.contains('done')){
        eliminar.style.display = 'inline-block';
        editar.style.display = 'inline-block';
    } else{
        eliminar.style.display = 'none';
        editar.style.display = 'none';
    };

    if(tarea.classList.contains('eliminar_editar')){
        editar.style.display = 'none';
    };
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
        tarea.classList.add('eliminar_editar');
        tarea.querySelector('.editar').style.display = 'none';
        tarea.removeEventListener('click', editarTarea);
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