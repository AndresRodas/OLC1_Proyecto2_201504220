var id_n = 1;
class RecorrerArbol{
    constructor(nodo){
        this.Graficar(nodo)
    }
    Imprimir(nodo){
        if (nodo != undefined){
            console.log(nodo.valor)
            nodo.hijos.forEach(element => {
                this.Imprimir(element);
            });
        } 
    }
    Graficar(nodo){
        if (nodo != undefined){
            if(nodo.id == 0){
                nodo.id = id_n;
                id_n ++
            }
            /*id [label= valor fillcolor="#d62728" shape="circle"]*/
            console.log(nodo.id + '[label= "'+ nodo.valor + '" fillcolor="green" shape="circle"];')
            
            
            nodo.hijos.forEach(element => {
                console.log(nodo.id + '->' + id_n + ';')
                this.Graficar(element);
            });
        }
    }
}

module.exports = RecorrerArbol