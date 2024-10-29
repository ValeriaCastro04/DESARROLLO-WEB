//accediendo a los elementos html
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
//componente de bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//componente modal
const idModal = document.getElementById("idModal");

//arreglo global de paciente
let arrayPaciente = [];

//creando funcion para que se limpie el formulario
const limpiarForm = () =>{
    inputNombre.value="";
    inputApellido.value="";
    inputFechaNacimiento.value="";
    inputRdMasculino.checked=false;
    inputRdFemenino.checked=false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value="";

    inputNombre.focus();
};
//funcion para validar el ingreso del paciente
const addPaciente = function(){
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";

        toast.show();

        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";

        toast.show();
    }
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    imprimirPacientes();
    mensaje.innerHTML = "Paciente eliminado";
    toast.show();
};

// Función para editar un paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    paciente[3] === "Hombre" ? (inputRdMasculino.checked = true) : (inputRdFemenino.checked = true);
    cmbPais.value = Array.from(cmbPais.options).find(opt => opt.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    // Al hacer clic en "Guardar", se actualiza el paciente
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
    };
};

// Modificar `imprimirFilas` para agregar eventos a los botones de edición y eliminación
function imprimirFilas() {
    let $fila = "";
    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${index + 1}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                </tr>`;
    });
    return $fila;
}


const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <tr>
                            <th scope="col" class="text-center" style="width:5%">#</th>
                            <th scope="col" class="text-center" style="width:15%">Nombre</th>
                            <th scope="col" class="text-center" style="width:15%">Apellido</th>
                            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                            <th scope="col" class="text-center" style="width:10%">Sexo</th>
                            <th scope="col" class="text-center" style="width:10%">#Pais</th>
                            <th scope="col" class="text-center" style="width:25%">#Direccion</th>
                            <th scope="col" class="text-center" style="width:10%">Opciones</th>
                        </tr>
                        ${imprimirFilas()}
                    </table>
                </div>
    `;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};
//contador global de los option correspondientes
//al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != ""){
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption +1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "Pais agregado correctamente";

        toast.show();
    } else{
        mensaje.innerHTML = "Faltan campos por completar";

        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

//se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();