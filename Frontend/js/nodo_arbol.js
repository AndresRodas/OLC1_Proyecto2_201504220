class Nodo_Arbol{
    constructor(valor, tipo){
        this.id = 0;
        this.valor = valor 
        this.tipo = tipo
        this.hijos = []
        this.tokens = []
        this.errores = []
    }
    getValor(){
        this.valor
    }
    addHijo(hijo){
        this.hijos.push(hijo)
    }
    addTokens(token){
        this.tokens = token.slice();
    }
    addErrores(error){
        this.errores = error.slice();
    }
}

module.exports = Nodo_Arbol