var parser = require('./gramatica')
var entrada = 'public class & ClaseUno { clase }'
var errores = []
var valores = []

console.log('************************INICIO******************************')
errores.push(parser.parse(entrada))
console.log(valores)
console.log('*************************FIN********************************')

class Tokens{
    constructor(){
        this.Tokens = []
    }
    getToken(){
        this.Tokens
    }
    addToken(linea, columna, texto, name){
        let new_tk = {
            line: linea,
            column: columna,
            text: texto,
            tipo: name
        }
        this.Tokens.push(new_tk)
    }
    toString(){
        console.log('HERE')
        for(let token of this.Tokens){
            console.log(token)
        }
    }
}

module.exports = valores
