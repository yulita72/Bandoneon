let  notasIzq = document.getElementById("notasIzq");
let notasDer=document.getElementById("notasDer")
notasDer.addEventListener("click",CapturarNotaDer);
notasIzq.addEventListener("click", CapturarNotaIzq);
notasDer.addEventListener("mousemove",MostrarNotaDer);//muestra el nombre de la nota por donde pasa el mouse
notasIzq.addEventListener("mousemove", MostrarNotaIzq);//muestra el nombre de la nota por donde pasa el mouse
let DivNotaActual=document.getElementById("div_notaActual")
let DivManoIzq=document.getElementById("mano_izq")
let DivManoDer=document.getElementById("mano_der")
let notasManoIzq=DivManoIzq.querySelectorAll(".nota")
let notasManoDer=DivManoDer.querySelectorAll(".nota")
let cifrado=false;
let abriendo=true;
const boton_abrirCerrar=document.getElementById("ab_cerr");
const boton_cifrado_activado=document.getElementById("cifrado_activado")
boton_cifrado_activado.style.opacity="0.5"
const boton_cifrado_desact=document.getElementById("cifrado_desactivado")
const divPentagramas=document.getElementById("pentagramas")
const PentDerecha= document.getElementById("notasDer")
//let DivOffset=PentDerecha.offsetLeft

//capturar ancho de pentagrama para usarlo en el calculo de pixeles
const AnchoPentagramaDefault=980;
const Pentagrama=document.getElementById("notasDer");
let anchoActualPentagrama=Pentagrama.clientWidth
window.addEventListener("resize",()=>{
   anchoActualPentagrama=Pentagrama.clientWidth
   //DivOffset=divPentagramas.offsetLeft
   console.log(anchoActualPentagrama)
})


divPentagramas.addEventListener("mouseenter",()=>{
  divPentagramas.style.cursor="pointer"
})

boton_cifrado_activado.addEventListener("click",()=>{

cifrado=true;
boton_cifrado_desact.style.opacity=".5"
boton_cifrado_activado.style.opacity="1"


})

boton_cifrado_desact.addEventListener("click",()=>{

  cifrado=false;
  boton_cifrado_activado.style.opacity=".5"
  boton_cifrado_desact.style.opacity="1"
  
  
  })


boton_abrirCerrar.addEventListener("click", ()=>{
  abriendo=!abriendo
  if (abriendo){
    boton_abrirCerrar.innerText="Abriendo"

  }else{
    boton_abrirCerrar.innerText="Cerrando"
  }
  



})
//muestra el nombre de la nota por donde pasa el mouse
function MostrarNotaDer(ev){
  var x = ev.clientX - ev.target.offsetLeft;
  //DivNotaActual.innerText=x
  let notaSeleccionada=retornarNota("d",x)
  if (notaSeleccionada !=="") {
    DivNotaActual.innerText=(notaSeleccionada)}



}
function MostrarNotaIzq(ev){
  var x = ev.clientX - ev.target.offsetLeft;
  //DivNotaActual.innerText=x
  let notaSeleccionada=retornarNota("i",x)
  if (notaSeleccionada !=="") {
    DivNotaActual.innerText=(notaSeleccionada)}



}

function CapturarNotaDer(ev){
 

  let notasPintadas=DivManoDer.querySelectorAll(".rojo")
  notasPintadas.forEach(el=>{
    el.classList.remove("rojo");
    el.innerText="";
  })
  var x = ev.clientX - ev.target.offsetLeft;
 
  
  
  let notaSeleccionada=retornarNota("d",x)
  if (notaSeleccionada !=="") {
    let IdNota=encontrarIdDelDivNota(notaSeleccionada,"d");


    if (IdNota!=""){
      
     document.getElementById(IdNota[0]).classList.add("rojo")
     if(cifrado){let notaEnCifrado=traducir_a_cifrado(IdNota[1])
      document.getElementById(IdNota[0]).innerText=notaEnCifrado;
     }else{
      document.getElementById(IdNota[0]).innerText=IdNota[1];

     }
     
    }
    
  } 

}


function CapturarNotaIzq(ev){
  let notasPintadas=DivManoIzq.querySelectorAll(".rojo")
  notasPintadas.forEach(el=>{
    el.classList.remove("rojo");
    el.innerText="";
  })
  var x = ev.clientX - ev.target.offsetLeft;
  
 
  let notaSeleccionada=retornarNota("i",x)
  
  if (notaSeleccionada !=="") {
    let IdNota=encontrarIdDelDivNota(notaSeleccionada,"i");


    if (IdNota!=""){

      if(cifrado){
        if (IdNota[0]==="i_31" && IdNota[1]==="Mi"){   //si la nota es el mi que está dos veces
          document.getElementById("i_31").classList.add("rojo")
          document.getElementById("i_31").innerText="E";
          document.getElementById("i_28").classList.add("rojo")
          document.getElementById("i_28").innerText="E";
          return;
  
        }else{
          let notaEnCifrado=traducir_a_cifrado(IdNota[1])
          document.getElementById(IdNota[0]).classList.add("rojo")
        document.getElementById(IdNota[0]).innerText=notaEnCifrado;
        }
      
      }else{
        if (IdNota[0]==="i_31" && IdNota[1]==="Mi"){   //si la nota es el mi que está dos veces
          document.getElementById("i_31").classList.add("rojo")
          document.getElementById("i_31").innerText="Mi";
          document.getElementById("i_28").classList.add("rojo")
          document.getElementById("i_28").innerText="Mi";
          return;
  
        }
        
       document.getElementById(IdNota[0]).classList.add("rojo")
       document.getElementById(IdNota[0]).innerText=IdNota[1];

      }

      

    }
    
  } 
 
 
}



function retornarNota(izq_der,x){ //retorna el nombre de la nota seleccionada en la partitura
 //acá tengo que hacer el cálculo del tamaño actual del pentagrama
  let coeficiente=AnchoPentagramaDefault/anchoActualPentagrama
  console.log("coe "+coeficiente)
  console.log(x)


  if(izq_der==="i"){
       

    for (let key in posPentagramaIzq){
    
      if ((posPentagramaIzq[key][0]/coeficiente)<x && (posPentagramaIzq[key][1]/coeficiente)>x){
        
         return(key) 
      }
    }return "";
  }else{
    for (let key in posPentagramaDer){
      if ((posPentagramaDer[key][0]/coeficiente)<x && (posPentagramaDer[key][1]/coeficiente)>x){
       
         return(key) 
      }
    }return "";




  }
  
}

function encontrarIdDelDivNota(nota,izq_der){
  let aux;
  let notaParaMostrar=[];//acá guardo el id del div (indice 0) y el texto para mostrar(indice 1)
  
  if (!abriendo){ //si está chequeado (cerrando) el valor de X es 3 (que va a ser el subindice de donde obtiene el id del div)
    aux=3;
  }else {aux=2}
  if(izq_der==="i"){
    for (let i=0;i<PosicionesDivManoIzquierda.length;i++){
      if (PosicionesDivManoIzquierda[i][0]===nota && PosicionesDivManoIzquierda[i][aux] !==""){
        notaParaMostrar.push(PosicionesDivManoIzquierda[i][aux]);
        notaParaMostrar.push(PosicionesDivManoIzquierda[i][1]);
        
        return notaParaMostrar
      }
  
    }No_disponible();
    return"";





  }else{
    for (let i=0;i<PosicionesDivManoDerecha.length;i++){
      if (PosicionesDivManoDerecha[i][0]===nota && PosicionesDivManoDerecha[i][aux] !==""){
        notaParaMostrar.push(PosicionesDivManoDerecha[i][aux]);
        notaParaMostrar.push(PosicionesDivManoDerecha[i][1]);
        
        return notaParaMostrar
      }
  
    }No_disponible();
    return"";







  }
  
 
    
 

}
function No_disponible(){
  let noDisponibleH1=document.getElementById("nota_no_encontrada")
  noDisponibleH1.innerText="Nota no disponible";
  setTimeout(()=>{
    noDisponibleH1.innerText="";
  }, 1000)




}


const PosicionesDivManoIzquierda= [
    ["C2","Do","i_3",""] ,
    ["C#2","Do#","","i_8"] , 
    ["D2","Re", "i_33","i_30"],
    ["D#2","Re#","i_8",""],
    ["E2","Mi","i_30","i_33"],
    ["F2","Fa","i_1","i_3"],
    ["F#2","Fa#","i_4","i_1"],
    ["G2","Sol","i_5","i_29"],
    ["G#2","Sol#","i_22","i_22"],
    ["A2","La","i_26","i_32"],
    ["A#2","La#","i_17","i_17"],
    ["B2","Si","i_31","i_4"],

    ["C3","Do","i_10","i_6"],
    ["C#3","Do#","i_12","i_11"],
    ["D3","Re","i_29","i_26"],
    ["D#3","Re#","i_16","i_12"],
    ["E3","Mi","i_32","i_31"],
    ["F3","Fa","i_7","i_13"],
    ["F#3","Fa#","i_13","i_5"],
    ["G3","Sol","i_21","i_25"],
    ["G#3","Sol#","i_28","i_9"],
    ["A3","La","i_25","i_24"],
    ["A#3","La#","i_6","i_21"],
    ["B3","Si","i_24","i_20"],

    ["C4","Do","i_20","i_16"],
    ["C#4","Do#","i_9","i_19"],
    ["D4","Re","i_19","i_15"],
    ["D#4","Re#","i_18","i_7"],
    ["E4","Mi","i_15","i_14"],
    ["F4","Fa","i_11","i_10"],
    ["F#4","Fa#","i_14","i_27"],
    ["G4","Sol","i_27","i_2"],
    ["G#4","Sol#","i_2","i_23"],
    ["A4","La","i_23",""],
    ["A#4","La#","i_14",""],
    ["B4","Si","","i_18"]


]

const posPentagramaIzq={

    "C2":[52,68],
    "C#2":[75,95],
    "D2": [98,118],
    "D#2":[132,148],
    "E2":[158,172],
    "F2":[180,198],
    "F#2":[205,223],
    "G2":[229,247],
    "G#2":[256,275],
    "A2":[280,298],
    "A#2":[305,326],
    "B2":[330,354],

    "C3":[364,384],
    "C#3":[392,409],
    "D3":[413,434],
    "D#3":[440,460],
    "E3":[464,484],
    "F3":[487,507],
    "F#3":[516,535],
    "G3":[540,559],
    "G#3":[565,588],
    "A3":[592,610],
    "A#3":[619,639],
    "B3":[642,662],

    "C4":[680,700],
    "C#4":[703,728],
    "D4":[732,752],
    "D#4":[757,780],
    "E4":[783,804],
    "F4":[806,826],
    "F#4":[830,855],
    "G4":[859,879],
    "G#4":[886,906],
    "A4":[912,930],
    "B4":[935,956],


}
const posPentagramaDer={ 
  "A3":[28,75],
  "A#3":[81,103],
  "B3":[108,125],
  "C4":[129,148],
  "C#4":[157,175],
  "D4":[178,198],
  "D#4":[199,222],
  "E4":[225,242],
  "F4":[243,262],
  "F#4":[270,288],
  "G4":[291,309],
  "G#4":[314,334],

  "A4":[346,365],
  "A#4":[372,392],
  "B4":[396,412],
  "C5":[416,432],
  "C#5":[440,460],
  "D5":[462,480],
  "D#5":[485,506],
  "E5":[510,529],
  "F5":[531,549],
  "F#5":[554,576],
  "G5":[580,598],
  "G#5":[602,626],

  "A5":[636,660],
  "A#5":[665,685],
  "B5":[690,706],
  "C6":[710,728],
  "C#6":[733,754],
  "D6":[759,775],
  "D#6":[780,802],
  "E6":[806,825],
  "F6":[828,848],
  "F#6":[852,873],
  "G6":[876,895],
  "G#6":[902,922],
  "A6":[926,943],
  
  "B6":[946,965],
  





}
const PosicionesDivManoDerecha= [
  ["A3", "La","d1","d1"] ,
  ["A#3","La#","d2","d2"] , 
  ["B3", "Si","d3","d3"],
  ["C4", "Do","d6","d10"],
  ["C#4","Do#","d10","d11"],
  ["D4", "Re","d11","d6"],
  ["D#4","Re#","d5","d5"],
  ["E4", "Mi","d7","d8"],
  ["F4", "Fa","d4","d4"],
  ["F#4","Fa#","d18","d7"],
  ["G4", "Sol","d17","d18"],
  ["G#4","Sol#","d13","d17"],
  ["A4", "La","d24","d13"],
  ["A#4","La#","d8","d23"],
  ["B4", "Si","d19","d24"],
  ["C5", "Do","d30","d29"],
  ["C#5","Do#","d12","d19"],
  ["D5", "Re","d25","d30"],
  ["D#5","Re#","d14","d38"],
  ["E5", "Mi","d36","d14"],
  ["F5", "Fa","d9","d9"],
  ["F#5","Fa#","d20","d12"],
  ["G5", "Sol","d38","d36"],
  ["G#5","Sol#","d31","d20"],

  ["A5", "La","d26","d31"],
  ["A#5","La#","d23","d22"],
  ["B5", "Si","d37","d26"],
  ["C6","Do","d29","d28"],
  ["C#6","Do#","d32","d37"],
  ["D6","Re","d35","d35"],
  ["D#6","Re#","d34","d34"],
  ["E6","Mi","d28","d32"],
  ["F6","Fa","d33","d33"],
  ["F#6","Fa#","d22","d27"],
  ["G6","Sol","d27","d16"],
  ["G#6","Sol#","d21","d21"],
  ["A6","La","d16","d15"],
  ["B6","Si","d15",""],



]

function traducir_a_cifrado(nota){



  const Notas={
   
    "Do":"C",
    "Do#":"C#",
    "Re":"D",
    "Re#":"D#",
    
    "Mi":"E",
    "Fa":"F",
    "Fa#":"F#",

    "Sol":"G",
    "Sol#":"G#",
    "La":"A",
    "La#":"A#",
    


    "Si":"B"
  }


  for (let X in Notas){
    if(X===nota){
      return Notas[X]
    }



  }


}

