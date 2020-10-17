console.log("Este es el analizador a patita");
/*function test (a) {
    console.log(a); 
    console.log(Math.ceil(Math.random() * 100))
    var temp = document.getElementById("texto");
    console.log(temp)   
}*/


function Scanner(){

        let Tokens = new Array()
        let entrada = document.getElementById('texto').value;
        let cont = 0
        let line = 1
        let column = 1
        let vocal = /^[A-Za-z]$/
        let id = /^[A-Za-z_0-9]$/
        let numero = /^[0-9]$/
        let numero2 = /^[0-9\.]$/
        let salto = /^[\n]/
        let space = /^[ ]/
        console.log(entrada)
        while (cont < entrada.length){
            if (vocal.test(entrada[cont]))
            {
                Tokens.push(Identificador(line, column, entrada, entrada[cont])) //Se manda a la funcion identidicador
            }
            else if (numero.test(entrada[cont]))
            {
                Tokens.push(Numero(line, column, entrada, entrada[cont])) //Se manda a la funcion Numero
            }
            else if (salto.test(entrada[cont]))
            {
                column = 1
                line++
                console.log("este es salto linea")
                cont++
            }
            else if (space.test(entrada[cont]))
            {
                column++
                console.log("este es espacio")
                cont++
            }
            else
            {
                console.log('Error lexico: '+entrada[cont]+', en la posición: '+(cont+1))
                column++
                cont++
            }
            
        }
        //se manda a imprimir los tokens generados
        ImprimirTokens(Tokens)

        //se define un identificador
        function Identificador(linea, columna, texto, word){
            cont++
            column++
            if (cont < entrada.length){
                if (id.test(entrada[cont])){
                    return Identificador(linea, columna, texto, word+entrada[cont])//se llama recursivamente y se agrega la nueva letra
                }else{
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word,
                        nombre: 'Identificador'
                    }
                    return tk_nuevo
                }
            }else{
                let tk_nuevo = {
                    linea: linea,
                    columna: columna,
                    texto: word,
                    nombre: 'Identificador'
                }
                return tk_nuevo
            }
        }

        //se define un numero
        function Numero(linea, columna, texto, word){
            cont++
            column++
            if (cont < entrada.length){
                if (numero2.test(entrada[cont])){
                    return Numero(linea, columna, texto, word+entrada[cont])//se llama recursivamente y se agrega la nueva letra
                }else{
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word,
                        nombre: 'Numero'
                    }
                    return tk_nuevo
                }
            }else{
                let tk_nuevo = {
                    linea: linea,
                    columna: columna,
                    texto: word,
                    nombre: 'Numero'
                }
                return tk_nuevo
            }
        }


}




function ImprimirTokens(Tokens){
    for(let token of Tokens){
        console.log(token.linea+', '+token.columna+', '+token.texto+', '+token.nombre)
    }
}
function Analizar(){
    Scanner();
    console.log('Se realizó el analisis correctamente')
}   
