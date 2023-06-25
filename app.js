let  notas_izq_Abriendo = document.getElementById("notasIzqA");
notas_izq_Abriendo.addEventListener("click", CapturarNotaIzq);
let DivManoIzq=document.getElementById("mano_izq")
let notasManoIzq=DivManoIzq.querySelectorAll(".nota")




function CapturarNotaIzq(ev){
  let notasPintadas=document.querySelectorAll(".rojo")
  notasPintadas.forEach(el=>{
    el.classList.remove("rojo");
    el.innerText="";
  })
  var x = ev.clientX - ev.target.offsetLeft;
  var y = ev.clientY - ev.target.offsetTop;
  
  let notaSeleccionada=retornarNota(x)
  
  if (notaSeleccionada !=="") {
    let IdNota=encontrarIdDelDivNota(notaSeleccionada);
    if (IdNota!=""){
     document.getElementById(IdNota[0]).classList.add("rojo")
     document.getElementById(IdNota[0]).innerText=IdNota[1];

    }
    
  } 
 
 
}



function retornarNota(x){ //retorna el nombre de la nota seleccionada en la partitura
  for (let key in posicionesPentagrama){
    if (posicionesPentagrama[key][0]<x && posicionesPentagrama[key][1]>x){
       return(key) 
    }
  }return "";
}

function encontrarIdDelDivNota(nota){
  let aux;
  let notaParaMostrar=[];//acá guardo el id del div (indice 0) y el texto para mostrar(indice 1)
  let TogleButton=document.getElementById("toggle");
  if (TogleButton.checked){ //si está chequeado (cerrando) el valor de X es 3 (que va a ser el subindice de donde obtiene el id del div)
    aux=3;
  }else {aux=2}
  for (let i=0;i<PosicionesDivManoIzquierda.length-1;i++){
    if (PosicionesDivManoIzquierda[i][0]===nota && PosicionesDivManoIzquierda[i][aux] !==""){
      notaParaMostrar.push(PosicionesDivManoIzquierda[i][aux]);
      notaParaMostrar.push(PosicionesDivManoIzquierda[i][1]);
      return notaParaMostrar
    }

  }return"";
 
    
 

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
    ["CH3","DO#","i_12","i_11"],
    ["D3","Re","i_29","i_26"],
    ["DH3","Re#","i_16","i_12"],
    ["E3","Mi","i_32","i_31"],
    ["F3","Fa","i_7","i_13"],
    ["FH3","Fa#","i_13","i_5"],//fijarse que hago porque hay dos mi 
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
    ["AH4","La#","i_14",""]
    ["B4","Si","","i_18"]


]

const posicionesPentagrama={

    "C2":[52,68],
    "CH2":[85,95],
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
    "B4":[935,956]






}