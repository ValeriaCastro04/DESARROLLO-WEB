// Accedemos a los contenedores donde se mostrarán los estudiantes y el arreglo ordenado
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector("#idContainerArregloOrdenado");

// Accedemos a cada botón por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// Inicializamos el arreglo
let arreglo = [];

// Asignamos eventos a los botones
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

// Función para agregar un elemento al arreglo
function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);

    // Verificar si es un número válido
    if (isNaN(numero)) {
        alert("Debe ingresar un número válido");
    } else {
        arreglo.push(numero);

        // Crear un elemento HTML para mostrar el número en el contenedor
        const caja = document.createElement("div");
        caja.className = "col-md-1 colum";
        const valor = document.createElement("h3");
        valor.textContent = numero;
        caja.appendChild(valor);

        containerArreglo.insertAdjacentElement("beforeend", caja);

        // Limpiar el campo de entrada después de agregar el número
        document.querySelector("#inputNumero").value = "";
    }
}

// Función para ordenar y mostrar los elementos del arreglo
function ordenarElementos() {
    // Limpiar el contenedor para evitar acumulaciones de elementos
    containerArregloOrdenado.innerHTML = "";

    // Ordenar el arreglo y crear elementos HTML para mostrar los números ordenados
    const arregloOrdenado = [...arreglo].sort((a, b) => a - b); // Orden ascendente
    for (let i of arregloOrdenado) {
        const caja = document.createElement("div");
        caja.className = "col-md-1 colum-green";
        const valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);
        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}
