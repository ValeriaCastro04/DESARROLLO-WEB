// Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

let arrayPaciente = [];

// Limpiar el formulario
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

// Agregar un nuevo paciente
const addPaciente = () => {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (nombre && apellido && fechaNacimiento && sexo && pais !== "0" && direccion) {
        arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();

        limpiarForm();
        imprimirPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Eliminar un paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    imprimirPacientes();
    mensaje.innerHTML = "Paciente eliminado";
    toast.show();
};

// Editar un paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    inputRdMasculino.checked = paciente[3] === "Hombre";
    inputRdFemenino.checked = paciente[3] === "Mujer";
    cmbPais.value = Array.from(cmbPais.options).find(opt => opt.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    buttonAgregarPaciente.onclick = () => {
        arrayPaciente[index] = [
            inputNombre.value,
            inputApellido.value,
            inputFechaNacimiento.value,
            inputRdMasculino.checked ? "Hombre" : "Mujer",
            cmbPais.options[cmbPais.selectedIndex].text,
            inputDireccion.value
        ];
        imprimirPacientes();
        limpiarForm();
        mensaje.innerHTML = "Paciente editado correctamente";
        toast.show();

        // Restaurar funcionalidad del botón "Guardar"
        buttonAgregarPaciente.onclick = addPaciente;
    };
};

// Imprimir pacientes en la tabla
const imprimirPacientes = () => {
    let tableHTML = `<div class="table-responsive">
                        <table class="table table-striped table-hover table-bordered">
                            <tr>
                                <th scope="col" class="text-center" style="width:5%">#</th>
                                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                                <th scope="col" class="text-center" style="width:10%">País</th>
                                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                                <th scope="col" class="text-center" style="width:10%">Opciones</th>
                            </tr>`;

    arrayPaciente.forEach((element, index) => {
        tableHTML += `<tr>
                        <td scope="row" class="text-center fw-bold">${index + 1}</td>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </td>
                    </tr>`;
    });
    tableHTML += `</table></div>`;
    document.getElementById("idTablaPacientes").innerHTML = tableHTML;
};

buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();
//Validar formulario estudiante
function validarFormularioEstudiante() {
    const carnet = document.getElementById("idCarnet").value;
    const nombre = document.getElementById("idNombre").value;
    const dui = document.getElementById("idDUI").value;
    const nit = document.getElementById("idNIT").value;
    const fechaNacimiento = document.getElementById("idFechaNacimiento").value;
    const correo = document.getElementById("idCorreo").value;
    const edad = document.getElementById("idEdad").value;

    // Expresiones regulares
    const regexCarnet = /^[A-Za-z]{2}\d{3}$/;
    const regexNombre = /^[A-Za-z\s]+$/;
    const regexDUI = /^\d{8}-\d$/;
    const regexNIT = /^\d{4}-\d{6}-\d{3}-\d$/;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexEdad = /^\d+$/;

    // Validación
    if (!regexCarnet.test(carnet)) {
        alert("Carnet inválido. Formato: AB001");
        return;
    }
    if (!regexNombre.test(nombre)) {
        alert("Nombre inválido. Solo letras y espacios permitidos.");
        return;
    }
    if (!regexDUI.test(dui)) {
        alert("DUI inválido. Formato: 12345678-9");
        return;
    }
    if (!regexNIT.test(nit)) {
        alert("NIT inválido. Formato: 1234-567890-123-4");
        return;
    }
    if (!regexFecha.test(fechaNacimiento)) {
        alert("Fecha de nacimiento inválida. Formato: YYYY-MM-DD");
        return;
    }
    if (!regexCorreo.test(correo)) {
        alert("Correo electrónico inválido.");
        return;
    }
    if (!regexEdad.test(edad)) {
        alert("Edad inválida. Solo números permitidos.");
        return;
    }

    alert("Formulario validado correctamente.");
}
