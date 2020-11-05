class Nodo_Arbol{
    constructor(valor, tipo){
        this.id = 0;
        this.valor = valor 
        this.tipo = tipo
        this.hijos = []
    }
    getValor(){
        this.valor
    }
    addHijo(hijo){
        this.hijos.push(hijo)
    }
}

module.exports = Nodo_Arbol