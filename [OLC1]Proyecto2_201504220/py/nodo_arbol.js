class Nodo_Arbol{
    constructor(valor){
        this.id = 0;
        this.valor = valor 
        this.hijos = []
    }
    addHijo(hijo){
        this.hijos.push(hijo)
    }
}

module.exports = Nodo_Arbol