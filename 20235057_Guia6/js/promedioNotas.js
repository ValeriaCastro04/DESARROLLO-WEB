//accedemos al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

//accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

//agregamos el evento click a los botones, adicionalmente
// se le asigna la funcion que se realizara la operacion
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes(){
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador =1;

    //utilizaremos un while para recorrer el total de estudiantes

    let estudiante,
        calificacion,
        convertir = 0;
        while(contador <= totalEstudiantes){
            estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

            do{
                calificacion = prompt(
                    `Ingrese la calificacion del estudiante ${contador}`
                );

                convertir = parseFloat(calificacion);
            } while (isNaN(convertir) || convertir < 0 || convertir > 10);


            arrayEstudiante.push(new Array(estudiante, parseFloat(calificacion)));
            
            /*
            arrayEstudiante[contador -1] = new Array(
                estudiante,
                parseFloat(calificacion)
            );*/
            contador ++;
        }

        //verificaremos cual es el promedio de las calificaciones

        let calificacionAlta = 0,
            promedio = 0,
            posicion = 0;

        let listado = "<h3> Listado de estudiantes registrados </h3>";
        listado += "<ol>";
        for (let indice of arrayEstudiante){
            let nombre = indice[0];
            let nota = indice[1];

            listado += `<li><b> Nombre: </b> ${nombre} - <b> Calificacion: </b> ${nota} </li>`;

            if (nota > calificacionAlta){
                posicion = indice;
            }

            promedio += parseFloat(nota);
        }

        listado += "/<ol>";
        promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
        listado += `<p><b>Promedio de calificaciones: </b> ${promedio}`;
        listado += `<br><b>Estudiante con mejor calificacion </b> ${posicion[0]}</p>`;

        //imprimiendo resultado
        containerEstudiantes.innerHTML = listado;

}