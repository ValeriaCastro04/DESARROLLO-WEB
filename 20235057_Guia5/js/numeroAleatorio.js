//Generamos el numero aleatorio entre 1 y 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
//creamos una constante que permite identidicar el maximo de intentos
const numeroIntentos =3;
//Guardara el nuermo de intentos que realiza el usuario
let intentos = 1;
function generarNumeroAleatorio(){
    //definimos una variable para impresion de mensajes
    let mensaje;
    //utilizamos el DOM para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo");

    //verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt(
            "Que numero se ha generado (Intento" + intentos + ")?"
        );

        //verificamos el numero aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio){
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio})!.
            <br> Refresque la página para volver a jugar.`;
            intentos = numeroIntentos + 1;
        } else if (numero > numeroAleatorio){
            mensaje = `El numero aleatorio es menor que tu propuesta. Te quedan ${numeroIntentos - intentos} intentos`;
        } else if (numero < numeroAleatorio){
            mensaje = `El numero aleatorio es mayor que tu propuesta. Te quedan ${numeroIntentos - intentos} intentos`;
        } 

        //aumentamos el valor de los intentos
        if (intentos <= numeroIntentos){
            intentos++;
        }
        
        if(intentos > numeroIntentos && numero != numeroAleatorio){
            mensaje = `Su numero de intentos ha terminado.
            El numero oculto era: ${numeroAleatorio}.Refresque la pagina para volver a jugar.`;
        }


    } else {
        mensaje = `Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}

