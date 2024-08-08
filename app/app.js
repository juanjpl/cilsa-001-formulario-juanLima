let formulario = {
  nombre: "",
  apellido: "",
  email: "",
  nacimiento: "",
  pais: "",
};

let formularioError = {
  nombre: false,
  apellido: false,
  email: false,
  nacimiento: false,
  pais: false,
};

function fechaHoy() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let dia;
  if (month < 10) {
    if (day < 10) {
      dia = `${year}-0${month}-0${day}`;
    } else {
      dia = `${year}-0${month}-${day}`;
    }
  } else {
    if (day < 10) {
      dia = `${year}-${month}-0${day}`;
    } else {
      dia = `${year}-0${month}-${day}`;
    }
  }

  let nacimiento = document.getElementById("nacimiento");
  nacimiento.setAttribute("max", dia);

  console.log(dia);
  return dia;
}

fechaHoy();
habilitarEnvio();

function imprimirFormulario() {
  console.log(formulario);
  console.log(formularioError);
}

function imprimirMensaje() {
  console.log("Este es un mensaje informativo");
}

function onInputChange(tipo, valor) {
  validacion(tipo, valor);
  mensajeError(tipo);
}

function validacion(tipo, valor) {
  let respuesta;

  if (tipo === "nombre" || tipo === "apellido") {
    let patron = /^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/;
    respuesta = validacionNombre(valor, patron);
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else if (tipo === "email") {
    let patron =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    respuesta = validacionNombre(valor, patron);
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else if (tipo === "pais") {
    respuesta = validacionPais(valor);
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else if (tipo === "nacimiento") {
    let patron = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    let resultado = patron.test(valor);

    respuesta = resultado;
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else {
    console.log("no se puede validar");
    respuesta = false;
  }

  return respuesta;
}

function validacionNombre(valor, patron) {
  const pattern = patron;

  let resultado = pattern.test(valor);

  return resultado;
}

function validacionPais(valor) {
  let respuesta;
  if (
    valor == "Argentina" ||
    valor == "Brasil" ||
    valor == "Bolivia" ||
    valor == "Chile" ||
    valor == "Colombia" ||
    valor == "Ecuador" ||
    valor == "Guyana" ||
    valor == "Paraguay" ||
    valor == "Perú" ||
    valor == "Suriname" ||
    valor == "Uruguay" ||
    valor == "Venezuela"
  ) {
  
    respuesta = true;
  } else {
  
    respuesta = false;
  }
  return respuesta;
}

function mensajeError(tipo) {
  let mensaje = document.getElementById(`mensaje-${tipo}`);

  if (formularioError[tipo] === false) {
    mensaje.innerHTML = "Error al cargar los datos";
    mensaje.className = 'mensaje-invalido'
  
    
  } else if (formularioError[tipo] === true) {
    mensaje.classList.remove('mensaje-invalido')
    mensaje.innerHTML = "Validado correctamente";
    mensaje.className = 'mensaje-validado'
    setTimeout(() => {
      mensaje.innerText = "";
      mensaje.classList.remove('mensaje-validado')

    }, 2000);
  } else {
    mensaje.innerHTML = "";
    mensaje.classList.remove('mensaje-invalido')
    mensaje.classList.remove('mensaje-validado')
  }
}

function habilitarEnvio() {
  const botonEnviar = document.getElementById("boton-enviar");

  if (
    !formularioError.nombre ||
    !formularioError.apellido ||
    !formularioError.email ||
    !formularioError.nacimiento ||
    !formularioError.pais
  ) {
    botonEnviar.setAttribute("disabled", true);
  botonEnviar.className = 'boton-enviar-deshabilitado'
  } else {
    console.log("Habilitado para enviar");
    botonEnviar.removeAttribute("disabled", false);
    botonEnviar.className.remove = 'boton-enviar-deshabilitado'
    botonEnviar.className = 'boton-enviar-habilitado'
  }
}

function enviarFormulario() {
  console.log(formulario);
  console.log(formularioError);

  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");


  setTimeout(() => {
    inputs.forEach((i) => {
      i.value = "";
    });
    selects[0].value = "";
    formularioError.nombre = false;
    formularioError.apellido = false;
    formularioError.email = false;
    formularioError.nacimiento = false;
    formularioError.pais = false;

    formulario.nombre = "";
    formulario.apellido = "";
    formulario.email = "";
    formulario.nacimiento = "";
    formulario.pais = "";
    habilitarEnvio();
  }, 100);
}


function cambiarEstilos(valor){

  const estilo = document.getElementById('estilos');
 

  if(valor){
    estilo.setAttribute('href',  './style/styles-contraste.css');
  }else{
    estilo.setAttribute('href',  './style/styles.css');
  }
 
}