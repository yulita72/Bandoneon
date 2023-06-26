let  notas_izq_Abriendo = document.getElementById("notasIzqA");
let notasDer=document.getElementById("notasDer")
notasDer.addEventListener("click",CapturarNotaDer);
notas_izq_Abriendo.addEventListener("click", CapturarNotaIzq);
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
  if(izq_der==="i"){
    for (let key in posPentagramaIzq){
      if (posPentagramaIzq[key][0]<x && posPentagramaIzq[key][1]>x){
        
         return(key) 
      }
    }return "";
  }else{
    for (let key in posPentagramaDer){
      if (posPentagramaDer[key][0]<x && posPentagramaDer[key][1]>x){
       
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
    ["CH2","Do#","","i_8"] , 
    ["D2","Re", "i_33","i_30"],
    ["DH2","Re#","i_8",""],
    ["E2","Mi","i_30","i_33"],
    ["F2","Fa","i_1","i_3"],
    ["FH2","Fa#","i_4","i_1"],
    ["G2","Sol","i_5","i_29"],
    ["GH2","Sol#","i_22","i_22"],
    ["A2","La","i_26","i_32"],
    ["AH2","La#","i_17","i_17"],
    ["B2","Si","i_31","i_4"],

    ["C3","Do","i_10","i_6"],
    ["CH3","Do#","i_12","i_11"],
    ["D3","Re","i_29","i_26"],
    ["DH3","Re#","i_16","i_12"],
    ["E3","Mi","i_32","i_31"],
    ["F3","Fa","i_7","i_13"],
    ["FH3","Fa#","i_13","i_5"],
    ["G3","Sol","i_21","i_25"],
    ["GH3","Sol#","i_28","i_9"],
    ["A3","La","i_25","i_24"],
    ["AH3","La#","i_6","i_21"],
    ["B3","Si","i_24","i_20"],

    ["C4","Do","i_20","i_16"],
    ["CH4","Do#","i_9","i_19"],
    ["D4","Re","i_19","i_15"],
    ["DH4","Re#","i_18","i_7"],
    ["E4","Mi","i_15","i_14"],
    ["F4","Fa","i_11","i_10"],
    ["FH4","Fa#","i_14","i_27"],
    ["G4","Sol","i_27","i_2"],
    ["GH4","Sol#","i_2","i_23"],
    ["A4","La","i_23",""],
    ["AH4","La#","i_14",""],
    ["B4","Si","","i_18"]


]

const posPentagramaIzq={

    "C2":[52,68],
    "CH2":[75,95],
    "D2": [98,118],
    "DH2":[132,148],
    "E2":[158,172],
    "F2":[180,198],
    "FH2":[205,223],
    "G2":[229,247],
    "GH2":[256,275],
    "A2":[280,298],
    "AH2":[305,326],
    "B2":[330,354],

    "C3":[364,384],
    "CH3":[392,409],
    "D3":[413,434],
    "DH3":[440,460],
    "E3":[464,484],
    "F3":[487,507],
    "FH3":[516,535],
    "G3":[540,559],
    "GH3":[565,588],
    "A3":[592,610],
    "AH3":[619,639],
    "B3":[642,662],

    "C4":[680,700],
    "CH4":[703,728],
    "D4":[732,752],
    "DH4":[757,780],
    "E4":[783,804],
    "F4":[806,826],
    "FH4":[830,855],
    "G4":[859,879],
    "GH4":[886,906],
    "A4":[912,930],
    "B4":[935,956],


}
const posPentagramaDer={ 
  "A3":[28,75],
  "AH3":[81,103],
  "B3":[108,125],
  "C4":[129,148],
  "CH4":[157,175],
  "D4":[178,198],
  "DH4":[199,222],
  "E4":[225,242],
  "F4":[243,262],
  "FH4":[270,288],
  "G4":[291,309],
  "GH4":[314,334],

  "A4":[346,365],
  "AH4":[372,392],
  "B4":[396,412],
  "C5":[416,432],
  "CH5":[440,460],
  "D5":[462,480],
  "DH5":[485,506],
  "E5":[510,529],
  "F5":[531,549],
  "FH5":[554,576],
  "G5":[580,598],
  "GH5":[602,626],

  "A5":[636,660],
  "AH5":[665,685],
  "B5":[690,706],
  "C6":[710,728],
  "CH6":[733,754],
  "D6":[759,775],
  "DH6":[780,802],
  "E6":[806,825],
  "F6":[828,848],
  "FH6":[852,873],
  "G6":[876,895],
  "GH6":[902,922],
  "A6":[926,943],
  
  "B6":[946,965],
  





}
const PosicionesDivManoDerecha= [
  ["A3", "La","d1","d1"] ,
  ["AH3","La#","d2","d2"] , 
  ["B3", "Si","d3","d3"],
  ["C4", "Do","d6","d10"],
  ["CH4","Do#","d10","d11"],
  ["D4", "Re","d11","d6"],
  ["DH4","Re#","d5","d5"],
  ["E4", "Mi","d7","d8"],
  ["F4", "Fa","d4","d4"],
  ["FH4","Fa#","d18","d7"],
  ["G4", "Sol","d17","d18"],
  ["GH4","Sol#","d13","d17"],
  ["A4", "La","d24","d13"],
  ["AH4","La#","d8","d23"],
  ["B4", "Si","d19","d24"],
  ["C5", "Do","d30","d29"],
  ["CH5","Do#","d12","d19"],
  ["D5", "Re","d25","d30"],
  ["DH5","Re#","d14","d38"],
  ["E5", "Mi","d36","d14"],
  ["F5", "Fa","d9","d9"],
  ["FH5","Fa#","d20","d12"],
  ["G5", "Sol","d38","d36"],
  ["GH5","Sol#","d31","d20"],

  ["A5", "La","d26","d31"],
  ["AH5","La#","d23","d22"],
  ["B5", "Si","d37","d26"],
  ["C6","Do","d29","d28"],
  ["CH6","Do#","d32","d37"],
  ["D6","Re","d35","d35"],
  ["DH6","Re#","d34","d34"],
  ["E6","Mi","d28","d32"],
  ["F6","Fa","d33","d33"],
  ["FH6","Fa#","d22","d27"],
  ["G6","Sol","d27","d16"],
  ["GH6","Sol#","d21","d21"],
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

