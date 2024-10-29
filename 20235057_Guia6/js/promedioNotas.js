// Accedemos al contenedor donde se mostrará la lista de estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

// Accedemos al botón de cálculo de promedio
const btnPromedio = document.querySelector("#idBtnPromedio");

// Agregamos el evento click al botón y asignamos la función a realizar
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    let arrayEstudiante = [];
    let totalEstudiantes = parseInt(document.querySelector("#inputNumeroEstudiantes").value);

    if (isNaN(totalEstudiantes) || totalEstudiantes <= 0) {
        alert("Por favor, ingrese un número válido de estudiantes.");
        return;
    }

    let contador = 1;

    // Utilizamos un while para pedir los datos de cada estudiante
    while (contador <= totalEstudiantes) {
        let estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
        let calificacion;
        let convertir;

        // Validación de la calificación del estudiante
        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`);
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante.push([estudiante, convertir]);
        contador++;
    }

    // Variables para almacenar el promedio y la calificación más alta
    let calificacionAlta = 0;
    let promedio = 0;
    let posicion = 0;

    // Generar el listado de estudiantes
    let listado = "<h3>Listado de estudiantes registrados</h3><ol>";

    for (let i = 0; i < arrayEstudiante.length; i++) {
        const nombre = arrayEstudiante[i][0];
        const nota = arrayEstudiante[i][1];

        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // Determinar la calificación más alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = i;
        }

        promedio += nota;
    }

    listado += "</ol>"; 
    promedio = (promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${arrayEstudiante[posicion][0]}</p>`;

    // Imprimir el resultado en el contenedor
    containerEstudiantes.innerHTML = listado;
}
