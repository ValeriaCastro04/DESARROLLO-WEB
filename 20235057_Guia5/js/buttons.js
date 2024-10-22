function aviso(){
    alert("Bienvenido al mundo JavaScript");
}

function confirmacion(){
    let confirmacion = confirm("¿Desea salir de la Sesión?");

    alert('Valor seleccionado ${confirmacion');
}

function capturarDatos(){
    let nombre = prompt("¿Cuál es su nombre?");

    let edad = prompt("¿Cual es su edad?", 0);

    alert('Su nombre es ${nombre} y su edad ${edad}');
}

function dibujarParrafo(){
    let parrafo = prompt(
        "Escriba la información que desea visualizar en el parrafo"
    );

    /*Se utilizara la API DOM para acceder al elemento
    <p id="idParrafo"></p> que se ha creado en el documento HTML del siguiente paso*/

    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}