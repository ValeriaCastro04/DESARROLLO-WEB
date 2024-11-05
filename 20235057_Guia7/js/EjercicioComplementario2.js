// Obteniendo referencias a los elementos del formulario
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

// Referencias a los campos del formulario
const idNombre = document.getElementById("idNombre");
const idApellidos = document.getElementById("idApellidos");
const idFechaNac = document.getElementById("idFechaNac");
const idCorreo = document.getElementById("idCorreo");
const idPassword = document.getElementById("idPassword");
const idPasswordRepetir = document.getElementById("idPasswordRepetir");
const idCkProgramacion = document.getElementById("idCkProgramacion");
const idCkBD = document.getElementById("idCkBD");
const idCkRedes = document.getElementById("idCkRedes");
const idCkSeguridad = document.getElementById("idCkSeguridad");
const idCmPais = document.getElementById("idCmPais");

// Función para validar el formulario
function validarFormulario() {
    let errors = [];

    // a. Validar que los campos no estén vacíos
    if (idNombre.value.trim() === "") {
        errors.push("El campo Nombres no puede estar vacío.");
    }
    if (idApellidos.value.trim() === "") {
        errors.push("El campo Apellidos no puede estar vacío.");
    }
    if (idFechaNac.value === "") {
        errors.push("El campo Fecha de nacimiento no puede estar vacío.");
    }
    if (idCorreo.value.trim() === "") {
        errors.push("El campo Correo electrónico no puede estar vacío.");
    }
    if (idPassword.value === "") {
        errors.push("El campo Contraseña no puede estar vacío.");
    }
    if (idPasswordRepetir.value === "") {
        errors.push("El campo Repetir Contraseña no puede estar vacío.");
    }

    // b. Validar que la fecha de nacimiento no supere la fecha actual
    if (idFechaNac.value !== "") {
        let fechaNac = new Date(idFechaNac.value);
        let today = new Date();
        if (fechaNac > today) {
            errors.push("La Fecha de nacimiento no puede ser posterior a la fecha actual.");
        }
    }

    // c. Validar el correo electrónico con expresión regular
    if (idCorreo.value.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(idCorreo.value.trim())) {
            errors.push("El Correo electrónico no es válido.");
        }
    }

    // d. Validar que las contraseñas coincidan
    if (idPassword.value !== idPasswordRepetir.value) {
        errors.push("Las contraseñas no coinciden.");
    }

    // e. Verificar que al menos un interés esté seleccionado
    let interesesSeleccionados = idCkProgramacion.checked || idCkBD.checked || idCkRedes.checked || idCkSeguridad.checked;
    if (!interesesSeleccionados) {
        errors.push("Debe seleccionar al menos un interés.");
    }

    // f. Verificar que se haya seleccionado una carrera
    let carreraSeleccionada = false;
    let carreras = document.getElementsByName("idRdCarrera");
    for (let i = 0; i < carreras.length; i++) {
        if (carreras[i].checked) {
            carreraSeleccionada = true;
            break;
        }
    }
    if (!carreraSeleccionada) {
        errors.push("Debe seleccionar una carrera.");
    }

    // g. Verificar que se haya seleccionado un país de origen
    if (idCmPais.value === "Seleccione una opcion") {
        errors.push("Debe seleccionar un país de origen.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    } else {
        return true;
    }
}

// Función para mostrar los datos en el modal
function mostrarDatos() {
    // Limpiar el contenido del modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    // Crear la tabla
    let table = document.createElement("table");
    table.className = "table";

    // Crear el cuerpo de la tabla
    let tbody = document.createElement("tbody");

    // Función para agregar filas a la tabla
    function addRow(key, value) {
        let tr = document.createElement("tr");

        let tdKey = document.createElement("th");
        tdKey.scope = "row";
        tdKey.textContent = key;

        let tdValue = document.createElement("td");
        tdValue.textContent = value;

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);

        tbody.appendChild(tr);
    }

    // Agregar filas con la información capturada
    addRow("Nombres", idNombre.value);
    addRow("Apellidos", idApellidos.value);
    addRow("Fecha de Nacimiento", idFechaNac.value);
    addRow("Correo Electrónico", idCorreo.value);

    // Obtener los intereses seleccionados
    let intereses = [];
    if (idCkProgramacion.checked) {
        intereses.push("Programación");
    }
    if (idCkBD.checked) {
        intereses.push("Base de Datos");
    }
    if (idCkRedes.checked) {
        intereses.push("Inteligencia Artificial");
    }
    if (idCkSeguridad.checked) {
        intereses.push("Seguridad Informática");
    }
    addRow("Intereses", intereses.join(", "));

    // Obtener la carrera seleccionada
    let carrera = "";
    let carreras = document.getElementsByName("idRdCarrera");
    for (let i = 0; i < carreras.length; i++) {
        if (carreras[i].checked) {
            let label = document.querySelector(`label[for='${carreras[i].id}']`);
            carrera = label.textContent;
            break;
        }
    }
    addRow("Carrera", carrera);

    // Obtener el país de origen
    let pais = idCmPais.options[idCmPais.selectedIndex].text;
    addRow("País de Origen", pais);

    // Añadir el cuerpo a la tabla
    table.appendChild(tbody);

    // Añadir la tabla al cuerpo del modal
    bodyModal.appendChild(table);

    // Mostrar el modal
    modal.show();
}

// Asignar el evento al botón
button.onclick = () => {
    if (validarFormulario()) {
        mostrarDatos();
    }
};