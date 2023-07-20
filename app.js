import {
  PosicionesDivManoIzquierda,
  posPentagramaIzq,
  posPentagramaDer,
  PosicionesDivManoDerecha,
  soundPaths
} from "./constantes.js";
const notasIzq = document.getElementById("notasIzq");
const notasDer = document.getElementById("notasDer");
const ContainerTeclados = document.getElementById("cont_teclados");
const DivNotaActual = document.getElementById("div_notaActual");
const DivManoIzq = document.getElementById("mano_izq");
const DivManoDer = document.getElementById("mano_der");
const notasManoIzq = DivManoIzq.querySelectorAll(".nota");
const notasManoDer = DivManoDer.querySelectorAll(".nota");
const botonAcorde = document.getElementById("acorde");
const botonAyuda = document.getElementById("boton_ayuda");
//**********************************cargar sonidos**************************************** */

let audioContext = new AudioContext();
let soundBuffers = {}; // Almacenar los buffers de sonido precargados


let loadedSounds = 0;

function loadSound(url, callback) {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      let soundIndex = soundPaths.indexOf(url); // Obtener el índice del sonido en el array
      soundBuffers[soundIndex] = buffer; // Asignar el buffer al índice correspondiente
      loadedSounds++;

      if (loadedSounds === soundPaths.length) {
        // Todos los sonidos se han cargado correctamente
        callback();
      }
    });
  };

  request.onerror = function () {
    console.error("Error al cargar el sonido: " + url);
  };

  request.send();
}

function loadAllSounds(callback) {
  for (let i = 0; i < soundPaths.length; i++) {
    loadSound(soundPaths[i], function () {
      if (loadedSounds === soundPaths.length) {
        callback();
      }
    });
  }
}

function playSound(soundIndex) {
  let source = audioContext.createBufferSource();
  source.buffer = soundBuffers[soundIndex];
  source.connect(audioContext.destination);
  source.start();
}

// Precargar todos los sonidos
loadAllSounds(function () {
  // Todos los sonidos se han cargado correctamente
  console.log("Todos los sonidos se han cargado correctamente.");
});


/***************************************************************************************************************** */
notasDer.addEventListener("click", CapturarNotaDer);
notasIzq.addEventListener("click", CapturarNotaIzq);
notasDer.addEventListener("mousemove", MostrarNotaDer); //muestra el nombre de la nota por donde pasa el mouse
notasIzq.addEventListener("mousemove", MostrarNotaIzq); //muestra el nombre de la nota por donde pasa el mouse
let modoAcorde = false;
botonAcorde.style.opacity = ".5";
botonAcorde.addEventListener("click", () => {
  modoAcorde = !modoAcorde;
  if (modoAcorde) {
    botonAcorde.style.opacity = "1";
  } else {
    let notas = document.querySelectorAll(".nota");
    notas.forEach((el) => {
      if (el.classList.contains("rojo")) {
        el.classList.remove("rojo");
        el.innerHTML = "";
      }
    });
    botonAcorde.style.opacity = ".5";
  }
});

botonAyuda.addEventListener("mouseover", () => {
  let divAyuda = document.getElementById("ayuda");
  divAyuda.style.visibility = "visible";
  
});
botonAyuda.addEventListener("mouseout", () => {
  let divAyuda = document.getElementById("ayuda");
  divAyuda.style.visibility = "hidden";
});
let cifrado = false;
let abriendo = true;
const boton_abrirCerrar = document.getElementById("ab_cerr");
const boton_cifrado_activado = document.getElementById("cifrado_activado");
boton_cifrado_activado.style.opacity = "0.5";

const divPentagramas = document.getElementById("pentagramas");
const PentDerecha = document.getElementById("notasDer");
//let DivOffset=PentDerecha.offsetLeft

//capturar ancho de pentagrama para usarlo en el calculo de pixeles
const AnchoPentagramaDefault = 980;
const Pentagrama = document.getElementById("notasDer");
let anchoActualPentagrama = Pentagrama.clientWidth;
window.addEventListener("resize", () => {
  anchoActualPentagrama = Pentagrama.clientWidth;
});

divPentagramas.addEventListener("mouseenter", () => {
  divPentagramas.style.cursor = "pointer";
});
//divPentagramas.addEventListener("mouseout", () => {
// DivNotaActual.innerText="";
//})

boton_cifrado_activado.addEventListener("click", () => {
  borrarNotasPintadas();
  cifrado = !cifrado;
  if (cifrado) {
    boton_cifrado_activado.style.opacity = "1";
  } else {
    boton_cifrado_activado.style.opacity = "0.5";
  }
});

ContainerTeclados.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("rojo")) {
    ev.target.classList.remove("rojo");
    ev.target.innerText = "";
  }
});

boton_abrirCerrar.addEventListener("click", () => {
  borrarNotasPintadas();

  abriendo = !abriendo;
  if (abriendo) {
    boton_abrirCerrar.innerText = "Abriendo";
  } else {
    boton_abrirCerrar.innerText = "Cerrando";
  }
});
//muestra el nombre de la nota por donde pasa el mouse
function MostrarNotaDer(ev) {
  var x = ev.clientX - ev.target.offsetLeft;

  let notaSeleccionada = retornarNota("d", x);
  if (notaSeleccionada !== "") {
    DivNotaActual.innerText = notaSeleccionada;
    
  }
}
function MostrarNotaIzq(ev) {
  var x = ev.clientX - ev.target.offsetLeft;

  let notaSeleccionada = retornarNota("i", x);
  if (notaSeleccionada !== "") {
    DivNotaActual.innerText = notaSeleccionada;
  }
}

function CapturarNotaDer(ev) {
  if (!modoAcorde) {
    let notasPintadas = DivManoDer.querySelectorAll(".rojo");
    notasPintadas.forEach((el) => {
      el.classList.remove("rojo");
      el.innerText = "";
    });
  }

  var x = ev.clientX - ev.target.offsetLeft;

  let notaSeleccionada = retornarNota("d", x);
  if (notaSeleccionada !== "") {
    let IdNota = encontrarIdDelDivNota(notaSeleccionada, "d");

    if (IdNota != "") {
      playSound(IdNota[IdNota.length-1])
      document.getElementById(IdNota[0]).classList.add("rojo");
      if (cifrado) {
        let notaEnCifrado = traducir_a_cifrado(IdNota[1]);
        document.getElementById(IdNota[0]).innerText = notaEnCifrado;
      } else {
        document.getElementById(IdNota[0]).innerText = IdNota[1];
      }
    }
  }
}

function borrarNotasPintadas() {
  let notasMostradas = document.querySelectorAll(".rojo");
  notasMostradas.forEach((el) => {
    el.classList.remove("rojo");
    el.innerText = "";
  });
}

function CapturarNotaIzq(ev) {
  if (!modoAcorde) { //despinto la nota antes de pintar la nueva (salvo que esté en modo acorde)
    let notasPintadas = DivManoIzq.querySelectorAll(".rojo");
    notasPintadas.forEach((el) => {
      el.classList.remove("rojo");
      el.innerText = "";
    });
  }
  var x = ev.clientX - ev.target.offsetLeft;

  let notaSeleccionada = retornarNota("i", x);

  if (notaSeleccionada !== "") {
    let IdNota = encontrarIdDelDivNota(notaSeleccionada, "i");
    
    if (IdNota != "") {
      playSound(IdNota[IdNota.length-1])

      if (cifrado) {
        if (IdNota[0] === "i_31" && IdNota[1] === "Mi") {
          //si la nota es el mi que está dos veces
          document.getElementById("i_31").classList.add("rojo");
          document.getElementById("i_31").innerText = "E";
          document.getElementById("i_28").classList.add("rojo");
          document.getElementById("i_28").innerText = "E";
          return;
        } else {
          let notaEnCifrado = traducir_a_cifrado(IdNota[1]);
          document.getElementById(IdNota[0]).classList.add("rojo");
          document.getElementById(IdNota[0]).innerText = notaEnCifrado;
          console.log(IdNota)
          
          
         
          
        }
      } else {
        if (IdNota[0] === "i_31" && IdNota[1] === "Mi") {
          //si la nota es el mi que está dos veces
          document.getElementById("i_31").classList.add("rojo");
          document.getElementById("i_31").innerText = "Mi";
          document.getElementById("i_28").classList.add("rojo");
          document.getElementById("i_28").innerText = "Mi";
          return;
        }

        document.getElementById(IdNota[0]).classList.add("rojo");
        document.getElementById(IdNota[0]).innerText = IdNota[1];
      }
    }
  }
}

function retornarNota(izq_der, x) {
  //retorna el nombre de la nota seleccionada en la partitura
  //acá tengo que hacer el cálculo del tamaño actual del pentagrama
  let coeficiente = AnchoPentagramaDefault / anchoActualPentagrama;

  if (izq_der === "i") {
    for (let key in posPentagramaIzq) {
      if (
        posPentagramaIzq[key][0] / coeficiente < x &&
        posPentagramaIzq[key][1] / coeficiente > x
      ) {
        return key;
      }
    }
    return "";
  } else {
    for (let key in posPentagramaDer) {
      if (
        posPentagramaDer[key][0] / coeficiente < x &&
        posPentagramaDer[key][1] / coeficiente > x
      ) {
        return key;
      }
    }
    return "";
  }
}

function encontrarIdDelDivNota(nota, izq_der) {
  let aux;
  let notaParaMostrar = []; //acá guardo el id del div (indice 0) y el texto para mostrar(indice 1)

  if (!abriendo) {
    //si está chequeado (cerrando) el valor de X es 3 (que va a ser el subindice de donde obtiene el id del div)
    aux = 3;
  } else {
    aux = 2;
  }
  if (izq_der === "i") {
    for (let i = 0; i < PosicionesDivManoIzquierda.length; i++) {
      if (
        PosicionesDivManoIzquierda[i][0] === nota &&
        PosicionesDivManoIzquierda[i][aux] !== ""
      ) {
        notaParaMostrar.push(PosicionesDivManoIzquierda[i][aux]);
        notaParaMostrar.push(PosicionesDivManoIzquierda[i][1]);
        notaParaMostrar.push(PosicionesDivManoIzquierda[i][4]); //aca meto el indice del sonido para ejecutar

        return notaParaMostrar;
      }
    }
    No_disponible();
    return "";
  } else {
    for (let i = 0; i < PosicionesDivManoDerecha.length; i++) {
      if (
        PosicionesDivManoDerecha[i][0] === nota &&
        PosicionesDivManoDerecha[i][aux] !== ""
      ) {
        notaParaMostrar.push(PosicionesDivManoDerecha[i][aux]);
        notaParaMostrar.push(PosicionesDivManoDerecha[i][1]);
        notaParaMostrar.push(PosicionesDivManoDerecha[i][4])

        return notaParaMostrar;
      }
    }
    No_disponible();
    return "";
  }
}
function No_disponible() {
  let noDisponibleH1 = document.getElementById("nota_no_encontrada");
  noDisponibleH1.innerText = "Nota no disponible";
  setTimeout(() => {
    noDisponibleH1.innerText = "";
  }, 1000);
}

function traducir_a_cifrado(nota) {
  const Notas = {
    Do: "C",
    "Do#": "C#",
    Re: "D",
    "Re#": "D#",

    Mi: "E",
    Fa: "F",
    "Fa#": "F#",

    Sol: "G",
    "Sol#": "G#",
    La: "A",
    "La#": "A#",

    Si: "B",
  };

  for (let X in Notas) {
    if (X === nota) {
      return Notas[X];
    }
  }
}
