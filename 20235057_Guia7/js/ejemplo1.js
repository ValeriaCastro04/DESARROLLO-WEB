// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRÁ LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar"); // Nuevo

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCIÓN PARA VALIDAR QUE NO EXISTA UN CONTROL CON EL MISMO ID
const validarIDUnico = (id) => {
    return !newForm.querySelector(`#${id}`);
};

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    const id = `id${nombreElemento.value}`;
    if (!validarIDUnico(id)) {
        alert("El ID ya existe. No se permite duplicados.");
        return;
    }
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("class", "form-select");

    // Agregando una opción vacía
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione una opción";
    addElemento.appendChild(defaultOption);

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = `opcion${i}`;
        addOption.textContent = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control = ${id}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    const id = `id${nombreElemento.value}`;
    if (!validarIDUnico(id)) {
        alert("El ID ya existe. No se permite duplicados.");
        return;
    }

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check mb-3");

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.setAttribute("name", nombreElemento.value); // Importante para radios

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control = ${id}`;

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    const id = `id${nombreElemento.value}`;
    if (!validarIDUnico(id)) {
        alert("El ID ya existe. No se permite duplicados.");
        return;
    }
    let addElemento;
    if (newElemento === "textarea") {
        addElemento = document.createElement("textarea");
        addElemento.setAttribute("rows", "3");
    } else {
        addElemento = document.createElement("input");
        addElemento.setAttribute("type", newElemento);
    }
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control = ${id}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
        modal.hide(); // Cerrar el modal después de agregar el elemento
    } else {
        alert("Faltan campos por completar");
    }
};

// ASIGNANDO EL EVENTO CLICK AL BOTÓN "VALIDAR FORMULARIO"
buttonValidar.onclick = () => {
    validarFormulario();
};

// FUNCIÓN PARA VALIDAR EL FORMULARIO
const validarFormulario = () => {
    let errores = [];

    // Obtener todos los elementos de entrada del formulario
    const inputs = newForm.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        const id = input.getAttribute("id") || input.getAttribute("name");

        // Validar campos de texto vacíos
        if (input.type === "text" || input.type === "password" || input.type === "email" || input.tagName === "TEXTAREA") {
            if (input.value.trim() === "") {
                errores.push(`El campo '${id}' está vacío.`);
            }
        }

        // Validar campos de número
        if (input.type === "number") {
            if (input.value === "") {
                errores.push(`El campo '${id}' está vacío.`);
            } else if (isNaN(input.value)) {
                errores.push(`El campo '${id}' debe ser un número válido.`);
            }
        }

        // Validar selects
        if (input.tagName === "SELECT") {
            if (input.value === "") {
                errores.push(`Debe seleccionar una opción en '${id}'.`);
            }
        }

        // Validar checkboxes y radios
        if (input.type === "checkbox" || input.type === "radio") {
            if (!input.checked) {
                errores.push(`Debe marcar el campo '${id}'.`);
            }
        }

        // Validar emails
        if (input.type === "email") {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(input.value)) {
                errores.push(`El campo '${id}' debe ser un correo electrónico válido.`);
            }
        }

        // Validar color
        if (input.type === "color") {
            if (input.value === "") {
                errores.push(`Debe seleccionar un color en '${id}'.`);
            }
        }

        // Puedes agregar más validaciones según el tipo de input
    });

    if (errores.length > 0) {
        alert("Se encontraron los siguientes errores:\n" + errores.join("\n"));
    } else {
        alert("Formulario válido. ¡Enviado con éxito!");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

