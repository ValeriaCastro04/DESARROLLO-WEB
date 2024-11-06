// inicializando primer color de fondo en el input color
const primerColorFondo = function (event) {
    document.body.style.backgroundColor = event.target.value;
};


// funciones para modificar el color de los títulos
const primerColorTitulos = function (event) {
    let colorSeleccionado = event.target.value;
    const titulos = document.querySelectorAll("h1");
    titulos.forEach(titulo => {
        titulo.style.color = colorSeleccionado;
    });
};

// funciones para modificar el color de los párrafos
const primerColorParrafos = function (event) {
    let colorSeleccionado = event.target.value;
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach(parrafo => {
        parrafo.style.color = colorSeleccionado;
    });
};

// Variable global para el tamaño de la letra
let fontSize = 1;

const aumentarLetra = function () {
    fontSize += 0.1; 
    actualizarTamañoLetra();
};

const disminuirLetra = function () {
    fontSize = Math.max(0.5, fontSize - 0.1); 
    actualizarTamañoLetra();
};

const actualizarTamañoLetra = function () {
    document.body.style.fontSize = `${fontSize}em`;
};

// Función principal para inicializar referencias y eventos
const startDOM = () => {
    // Obteniendo la referencia del input color para cambiar fondo
    const buttonFondo = document.getElementById("idFondo");
    buttonFondo.addEventListener("input", primerColorFondo, false);
    // Establecer color de fondo inicial a blanco
    document.body.style.backgroundColor = "#ffffff";

    // Obteniendo la referencia del input color para cambiar color de títulos
    const buttonTitulos = document.getElementById("idTitulos");
    buttonTitulos.addEventListener("input", primerColorTitulos, false);
    // Establecer color inicial de los títulos a negro
    const titulos = document.querySelectorAll("h1");
    titulos.forEach(titulo => {
        titulo.style.color = "#000000";
    });

    // Obteniendo la referencia del input color para cambiar color de párrafos
    const buttonParrafos = document.getElementById("idParrafos");
    buttonParrafos.addEventListener("input", primerColorParrafos, false);
    // Establecer color inicial de los párrafos a negro
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach(parrafo => {
        parrafo.style.color = "#000000";
    });

    // Obteniendo las referencias de los botones de tamaño de letra
    const buttonAumentar = document.getElementById("idBtnAumentar");
    const buttonDisminuir = document.getElementById("idBtnDisminuir");

    buttonAumentar.addEventListener("click", aumentarLetra, false);
    buttonDisminuir.addEventListener("click", disminuirLetra, false);
};


// Ejecutar `startDOM` cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", startDOM);