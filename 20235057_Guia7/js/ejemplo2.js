// Obteniendo la referencia de los elementos
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const bodyModal = document.getElementById("idBodyModal");
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// Función para validar el formulario
const validarFormulario = () => {
    let errores = [];

    // Validar que los campos de texto no estén vacíos
    const nombre = formulario["idNombre"];
    const apellidos = formulario["idApellidos"];
    if (!nombre.value.trim()) errores.push("El campo 'Nombres' es obligatorio.");
    if (!apellidos.value.trim()) errores.push("El campo 'Apellidos' es obligatorio.");

    // Validar la fecha de nacimiento
    const fechaNac = formulario["idFechaNac"];
    const hoy = new Date();
    const fechaNacimiento = new Date(fechaNac.value);
    if (!fechaNac.value) {
        errores.push("El campo 'Fecha de nacimiento' es obligatorio.");
    } else if (fechaNacimiento > hoy) {
        errores.push("La fecha de nacimiento no puede ser una fecha futura.");
    }

    // Validar el correo electrónico con expresión regular
    const correo = formulario["idCorreo"];
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.value.trim()) {
        errores.push("El campo 'Correo electrónico' es obligatorio.");
    } else if (!regexCorreo.test(correo.value)) {
        errores.push("El correo electrónico no es válido.");
    }

    // Validar que las contraseñas sean iguales
    const password = formulario["idPassword"];
    const passwordRepetir = formulario["idPasswordRepetir"];
    if (password.value !== passwordRepetir.value) {
        errores.push("Las contraseñas no coinciden.");
    }

    // Verificar que al menos una opción esté seleccionada en "algunos intereses"
    const intereses = [
        formulario["idCkProgramacion"],
        formulario["idCkBD"],
        formulario["idCkRedes"],
        formulario["idCkSeguridad"]
    ];
    const algunInteresSeleccionado = intereses.some(interes => interes.checked);
    if (!algunInteresSeleccionado) {
        errores.push("Debe seleccionar al menos un interés.");
    }

    // Verificar que el usuario seleccione una carrera
    const carreraSeleccionada = document.querySelector("input[name='idRdCarrera']:checked");
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una carrera.");
    }

    // Verificar que sea seleccionado un país de origen
    const pais = formulario["idCmPais"];
    if (pais.value === "Seleccione una opcion") {
        errores.push("Debe seleccionar un país de origen.");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        mostrarModalConInformacion();
    }
};

// Función para mostrar la información en un modal usando una tabla generada con el DOM
const mostrarModalConInformacion = () => {
    // Limpiar el contenido del modal
    bodyModal.innerHTML = "";

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped");

    // Crear encabezado de la tabla
    const thead = document.createElement("thead");
    const encabezadoFila = document.createElement("tr");

    ["Campo", "Valor"].forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        encabezadoFila.appendChild(th);
    });
    thead.appendChild(encabezadoFila);
    tabla.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement("tbody");

    // Función para agregar filas a la tabla
    const agregarFila = (campo, valor) => {
        const fila = document.createElement("tr");
        const celdaCampo = document.createElement("td");
        const celdaValor = document.createElement("td");

        celdaCampo.textContent = campo;
        celdaValor.textContent = valor;

        fila.appendChild(celdaCampo);
        fila.appendChild(celdaValor);
        tbody.appendChild(fila);
    };

    // Agregar los datos a la tabla
    agregarFila("Nombres", formulario["idNombre"].value);
    agregarFila("Apellidos", formulario["idApellidos"].value);
    agregarFila("Fecha de nacimiento", formulario["idFechaNac"].value);
    agregarFila("Correo electrónico", formulario["idCorreo"].value);
    agregarFila("País de origen", formulario["idCmPais"].options[formulario["idCmPais"].selectedIndex].text);

    // Agregar intereses seleccionados
    const interesesSeleccionados = intereses.filter(interes => interes.checked).map(interes => interes.nextElementSibling.textContent);
    agregarFila("Intereses", interesesSeleccionados.join(", "));

    // Agregar carrera seleccionada
    if (carreraSeleccionada) {
        agregarFila("Carrera", carreraSeleccionada.nextElementSibling.textContent);
    }

    // Agregar la tabla al modal
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);

    // Mostrar el modal
    modal.show();
};

// Agregar evento de clic al botón para validar y mostrar la información
button.onclick = (event) => {
    event.preventDefault();
    validarFormulario();
};
