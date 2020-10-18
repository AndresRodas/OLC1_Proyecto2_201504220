console.log("Este es el analizador a patita");
/*function test (a) {
    console.log(a); 
    console.log(Math.ceil(Math.random() * 100))
    var temp = document.getElementById("texto");
    console.log(temp)   
}*/


function Scanner(){

        let Tokens = new Array()
        let Signos = new Map([['PComa',';'],['SComa',','],['LCierra','}'],['LAbre','{'],['PCierra',')'],['PAbre','('],['SPunto','.'],['SMas','+'],['SPor','*'],['SMenos','-'],['CCierra',']'],['CAbre','['],['SXor','^']])
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
            if (vocal.test(entrada[cont]))//Se manda a la funcion identidicador
            {
                Tokens.push(Identificador(line, column, entrada, entrada[cont])) //Se manda a la funcion identidicador
            }
            else if (numero.test(entrada[cont]))//Se manda a la funcion Numero
            {
                Tokens.push(Numero(line, column, entrada, entrada[cont])) //Se manda a la funcion Numero
            }
            else if (salto.test(entrada[cont]))//aqui se reconoce el salto de linea
            {
                column = 1
                line++
                cont++
            }
            else if (space.test(entrada[cont]))//aqui se reconoce el espacio
            {
                column++
                cont++
            }
            else if (entrada[cont] == '\/'){//signo de division, comentario unilinea o multilinea
                if (entrada[cont+1] == '\/'){
                    //ir a comentario unilinea
                    cont++
                    Tokens.push(ComentarioUni(line, column, entrada, '\/\/')) //Se manda a la funcion Numero
                }else if (entrada[cont+1] == '*'){
                    //ir a comentario multilinea
                    cont++
                    Tokens.push(ComentarioMulti(line, column, entrada, '\/*')) //Se manda a la funcion Numero
                }else{
                    //se guarda el div y se sigue
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '\/',
                        nombre: 'SDiv'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '\"'){//texto o error
                if (entrada[cont+1] == '\/'){
                    //ir a comentario unilinea
                    cont++
                    Tokens.push(ComentarioUni(line, column, entrada, '\/\/')) //Se manda a la funcion Numero
                }else if (entrada[cont+1] == '*'){
                    //ir a comentario multilinea
                    cont++
                    Tokens.push(ComentarioMulti(line, column, entrada, '\/*')) //Se manda a la funcion Numero
                }else{
                    //se guarda el div y se sigue
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '\/',
                        nombre: 'SDiv'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }


            else if (entrada[cont] == '&' && entrada[cont+1] == '&'){//operador and
                let tk_nuevo = {
                    linea: line,
                    columna: column,
                    texto: '&&',
                    nombre: 'And'
                }
                Tokens.push(tk_nuevo)
                cont+=2
                column+=2
            }
            else if (entrada[cont] == '!'){//signo not que
                if (entrada[cont+1] == '='){//signo diferente que
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '!=',
                        nombre: 'SDif'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//igual 
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '!',
                        nombre: 'Not'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '|' && entrada[cont+1] == '|'){//operador or
                let tk_nuevo = {
                    linea: line,
                    columna: column,
                    texto: '||',
                    nombre: 'Or'
                }
                Tokens.push(tk_nuevo)
                cont+=2
                column+=2
            }
            else if (entrada[cont] == '>'){//signo mayor que
                if (entrada[cont+1] == '='){//mayor o igual que
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '>=',
                        nombre: 'SMayorIgual'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//mayor que
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '>',
                        nombre: 'SMayor'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '<'){//signo menor que
                if (entrada[cont+1] == '='){//menor o igual que
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '<=',
                        nombre: 'SMenorIgual'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//menor que
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '<',
                        nombre: 'SMenor'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '='){//signo igual que
                if (entrada[cont+1] == '='){//signo doble igual
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '==',
                        nombre: 'SComp'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//igual 
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '=',
                        nombre: 'SIgual'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '+'){//signo mas
                if (entrada[cont+1] == '+'){//incremento
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '++',
                        nombre: 'SInc'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//mas
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '+',
                        nombre: 'SMas'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }
            else if (entrada[cont] == '-'){//signo menos
                if (entrada[cont+1] == '-'){//decremento
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '--',
                        nombre: 'SDec'
                    }
                    Tokens.push(tk_nuevo)
                    cont+=2
                    column+=2
                }else{//menos
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: '-',
                        nombre: 'SMenos'
                    }
                    Tokens.push(tk_nuevo)
                    cont++
                    column++
                }
            }




            else{ //aqui caen los errores y signos
                let isSign = false
                for(let clave of Signos.keys()){
                    let valor = Signos.get(clave)
                    if (entrada[cont] == valor){//si es signo
                        let tk_nuevo = {
                            linea: line,
                            columna: column,
                            texto: valor,
                            nombre: clave
                        }
                        Tokens.push(tk_nuevo)
                        cont++
                        column++
                        isSign = true
                        break
                    }

                }
                if (!isSign){//si es error
                    let tk_nuevo = {
                        linea: line,
                        columna: column,
                        texto: entrada[cont],
                        nombre: 'Error'
                    }
                    Tokens.push(tk_nuevo)
                    column++
                    cont++
                }
 
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
        //se define un comentario unilinea
        function ComentarioUni(linea, columna, texto, word) {
            cont++
            column++
            if (cont < entrada.length){
                if (entrada[cont] == '\n'){//se sale del comentario
                    column = 1
                    line++
                    cont++
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word,
                        nombre: 'ComentarioUni'
                    }
                    return tk_nuevo
                }else{
                    return ComentarioUni(linea, columna, texto, word+entrada[cont])//se sigue en el comentario
                }
            }else{
                let tk_nuevo = {
                    linea: linea,
                    columna: columna,
                    texto: word,
                    nombre: 'ComentarioUni'
                }
                return tk_nuevo
            }
        }
        //se define un comentario multilinea
        function ComentarioMulti(linea, columna, texto, word) {
            cont++
            column++
            if (cont < entrada.length){
                if (entrada[cont] == '*' && entrada[cont+1] == '\/'){//se sale del comentario
                    cont+=2
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word+'*\/',
                        nombre: 'ComentarioMulti'
                    }
                    return tk_nuevo
                }else if (entrada[cont] == '\n') {
                    column = 0
                    line++
                    return ComentarioMulti(linea, columna, texto, word+entrada[cont])//se sigue en el comentario
                } else{
                    return ComentarioMulti(linea, columna, texto, word+entrada[cont])//se sigue en el comentario
                }
            }else{
                let tk_nuevo = {
                    linea: linea,
                    columna: columna,
                    texto: word,
                    nombre: 'ComentarioMulti'
                }
                return tk_nuevo
            }
        }



        //imprimir token
        function ImprimirTokens(Tokens){
            for(let token of Tokens){
                console.log(token.linea+', '+token.columna+', '+token.texto+', '+token.nombre)
            }
        }
}


function Analizar(){
    Scanner();
    console.log('Se realizó el analisis correctamente')
}   
