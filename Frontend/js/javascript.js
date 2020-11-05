var parser = require('./gramatica')
var entrada = 'public class ClaseUno { public void Funcion () { int num; } }'
//var valores = []
var id_n = 1;

/*********************************ANALISIS CON JISON*********************************/
function AnalizarJison(){
    //variable grafica
    var salida_grafo = document.getElementById('grafo');
    var grafi = 'digraph  {po -> b}'
    d3.select(salida_grafo).graphviz().renderDot(grafi);

    //entrada
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;

    //console.log(parser.parse(entrada))
    Graficar(parser.parse(contenido))
}

//se grafica el AST
function Graficar(nodo){
    if (nodo != undefined){
        if(nodo.id == 0){
            nodo.id = id_n;
            id_n ++
        }
        /*id [label= valor fillcolor="#d62728" shape="circle"]*/
        console.log(nodo.id + '[label= "'+ nodo.valor + '" ];')
        if (nodo.hijos != undefined){
            nodo.hijos.forEach(element => {
                console.log(nodo.id + '->' + id_n + ';')
                Graficar(element);
            });
        }   
    }
}
