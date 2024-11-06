// inicializando primer color de fondo en el input color
const primerColorFondo = function (event) {
    document.body.style.backgroundColor = event.target.value;
};

// funciones para modificar el color de los títulos
const primerColorTitulos = function (event) {
    let colorSeleccionado = event.target.value;
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.color = colorSeleccionado;
    }
};

// funciones para modificar el color de los párrafos
const primerColorParrafos = function (event) {
    let colorSeleccionado = event.target.value;
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.color = colorSeleccionado;
    }
};

// Variable global para el tamaño de la letra
let fontSize = 1;

const aumentarLetra = function () {
    fontSize += 0.05; 
    actualizarTamañoLetra();
};

const disminuirLetra = function () {
    fontSize = Math.max(0.5, fontSize - 0.05); 
    actualizarTamañoLetra();
};

const actualizarTamañoLetra = function () {
    document.body.style.fontSize = `${fontSize}em`;
    const parrafos = document.querySelectorAll("p");
    for (let index = 0; index < parrafos.length; index++) {
        parrafos[index].style.fontSize = `${fontSize}em`;
    }
    const titulos = document.querySelectorAll("h1");
    for (let index = 0; index < titulos.length; index++) {
        titulos[index].style.fontSize = `${fontSize}em`;
    }
};

// Función principal para inicializar referencias y eventos
const startDOM = () => {
    // Obteniendo la referencia del input color para cambiar fondo
    const buttonFondo = document.getElementById("idFondo");
    buttonFondo.value = "#ffffff";
    buttonFondo.addEventListener("input", primerColorFondo, false);

    // Obteniendo la referencia del input color para cambiar color de títulos
    const buttonTitulos = document.getElementById("idTitulos");
    buttonTitulos.value = "#000000";
    buttonTitulos.addEventListener("input", primerColorTitulos, false);

    // Obteniendo la referencia del input color para cambiar color de párrafos
    const buttonParrafos = document.getElementById("idParrafos");
    buttonParrafos.value = "#000000";
    buttonParrafos.addEventListener("input", primerColorParrafos, false);

    // Obteniendo las referencias de los botones de tamaño de letra
    const buttonAumentar = document.getElementById("idBtnAumentar");
    const buttonDisminuir = document.getElementById("idBtnDisminuir");

    buttonAumentar.addEventListener("click", aumentarLetra, false);
    buttonDisminuir.addEventListener("click", disminuirLetra, false);
};
