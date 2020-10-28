console.log("Este es el analizador a patita");
/*function test (a) {
    console.log(a); 
    console.log(Math.ceil(Math.random() * 100))
    var temp = document.getElementById("texto");
    console.log(temp)   
}*/


function Scanner(Tokens, Errores){
        let Signos = new Map([['Pyc',';'],['SComa',','],['LCierra','}'],['LAbre','{'],['PCierra',')'],['PAbre','('],['SPunto','.'],['SMas','+'],['SPor','*'],['SMenos','-'],['CCierra',']'],['CAbre','['],['Xor','^']])
        let PalabrasReservadas = new Array('clase','interface','if','else','public','import','package','class','interfaz','void','int','double','char','string','boolean','for','while','system','out','println','print','do','break','continue','return','static','main','true','false','switch')
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
        let tet = ['4','cuatro']
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

                Texto(line, column, entrada, entrada[cont]) //Se manda a la funcion Numero 
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
                    Errores.push(tk_nuevo)
                    column++
                    cont++
                }
 
            }   
        }
        //se cambian los identificadores por las palabras reservadas
        PalabraReservada()
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
        //se define un texto
        function Texto(linea, columna, texto, word){
            cont++
            column++
            if (cont < entrada.length){
                if (entrada[cont] == '\"'){
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word+entrada[cont],
                        nombre: 'Texto'
                    }
                    cont++
                    column++
                    Tokens.push(tk_nuevo)
                    return
                }else if(entrada[cont] == '\n'){
                    let tk_nuevo = {
                        linea: linea,
                        columna: columna,
                        texto: word,
                        nombre: 'Error'
                    }
                    Errores.push(tk_nuevo)
                    return
                }else{
                    Texto(linea, columna, texto, word+entrada[cont])//se llama recursivamente
                }
            }else{
                let tk_nuevo = {
                    linea: linea,
                    columna: columna,
                    texto: word,
                    nombre: 'Texto'
                }
                Tokens.push(tk_nuevo)
                return
            }
        }
        //se agregan las palabras reservadas
        function PalabraReservada(){
            for(let token of Tokens){
                
                if(token.nombre == 'Identificador'){
                    
                    for(let reservada of PalabrasReservadas){
                        //console.log(reservada+'--'+token.texto.toLowerCase())
                        if (reservada == token.texto.toLowerCase()){
                            token.nombre = 'R'+reservada
                            break
                        }
                    }

                }
            }
        }
           
}


function Parser(Tokens){

    let result = ''
    let Producciones = new Map([
        // ['INICIO',[['Rpublic',['INICIO','S','Rpublic']],['$',['Epsilon']]]], 
        // ['S',[['Rclass',['CONTENIDO','Rclass']],['Rinterfaz',['CONTENIDO','Rinterfaz']]]],
        // ['CONTENIDO',[['Identificador',['DEF','LAbre','Identificador']]]],
        // ['DEF',[['Rclase',['LCierra','Rclase']],['Rinterface',['LCierra','Rinterface']]]]
        ['INICIO',[['Rpublic',['INICIO','S','Rpublic']],['$',['Epsilon']]]], 
        ['S',[['Rclass',['LCierra','CONTCLASS','LAbre','Identificador','Rclass']],['Rinterfaz',['LCierra','CONTINTER','LAbre','Identificador','Rinterfaz']]]],
        ['CONTINTER',[['LCierra',['Epsilon']],['Rpublic',['CONTINTER','Pyc','Pcierra','NEXTFUNC','Pabre','Identificador','TIPO','Rpublic']]]],
        ['CONTCLASS',[['LCierra',['Epsilon']],['Rpublic',['CCN','Rpublic']],['Rint',['CONTCLASS','DECLARACION']],['Rdouble',['CONTCLASS','DECLARACION']],['Rstring',['CONTCLASS','DECLARACION']],['Rchar',['CONTCLASS','DECLARACION']],['Rboolean',['CONTCLASS','DECLARACION']]]], 
        ['CCN',[['Rstatic',['CONTCLASS','MAIN']],['Rint',['CONTCLASS','FUNCION']],['Rdouble',['CONTCLASS','FUNCION']],['Rstring',['CONTCLASS','FUNCION']],['Rchar',['CONTCLASS','FUNCION']],['Rboolean',['CONTCLASS','FUNCION']]]], 
        ['MAIN',[['Rstatic',['LCierra','INSTRUCCIONES','LAbre','PCierra','Identificador','CCierra','CAbre','Rstring','PAbre','Rmain','Rvoid','Rstatic']]]],
        ['DECLARACION',[['Rint',['NEXTDEC','Identificador','Rint']],['Rdouble',['NEXTDEC','Identificador','Rdouble']],['Rstring',['NEXTDEC','Identificador','Rstring']],['Rchar',['NEXTDEC','Identificador','Rchar']],['Rboolean',['NEXTDEC','Identificador','Rboolean']]]],
        ['NEXTDEC',[['Pyc',['Pyc']],['SIgual',['FINDEC','SIgual']]]],
        ['FINDEC',[['Identificador',['Pyc','Identificador']],['Numero',['Pyc','Numero']],['Texto',['Pyc','Texto']]]], 
        ['FUNCION',[['Rvoid',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rint',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rdouble',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rstring',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rchar',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rboolean',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']]]],
        ['NEXTFUNC',[['PCierra',['Epsilon']],['Rvoid',['PARAMETROS']],['Rint',['PARAMETROS']],['Rdouble',['PARAMETROS']],['Rstring',['PARAMETROS']],['Rchar',['PARAMETROS']],['Rboolean',['PARAMETROS']]]],
        ['TIPO',[['Rvoid',['Rvoid']],['Rint',['Rint']],['Rdouble',['Rdouble']],['Rstring',['Rstring']],['Rchar',['Rchar']],['Rboolean',['Rboolean']]]],
        ['PARAMETROS',[['Rvoid',['NEXTPARAM','Identificador','TIPO']],['Rint',['NEXTPARAM','Identificador','TIPO']],['Rdouble',['NEXTPARAM','Identificador','TIPO']],['Rstring',['NEXTPARAM','Identificador','TIPO']],['Rchar',['NEXTPARAM','Identificador','TIPO']],['Rboolean',['NEXTPARAM','Identificador','TIPO']]]],
        ['NEXTPARAM',[['PCierra',['Epsilon']],['SComa',['PARAMETROS','Scoma']]]],
        ['INSTRUCCIONES',[['LCierra',['Epsilon']],['SPor',['INSTRUCCIONES','Pyc','EXP']],['SDiv',['INSTRUCCIONES','Pyc','EXP']],['SMas',['INSTRUCCIONES','Pyc','EXP']],['SMenos',['INSTRUCCIONES','Pyc','EXP']],['SMayor',['INSTRUCCIONES','Pyc','EXP']],['SMenor',['INSTRUCCIONES','Pyc','EXP']],['SMayorIgual',['INSTRUCCIONES','Pyc','EXP']],['SMenorIgual',['INSTRUCCIONES','Pyc','EXP']],['SComp',['INSTRUCCIONES','Pyc','EXP']],['SDif',['INSTRUCCIONES','Pyc','EXP']],['Not',['INSTRUCCIONES','Pyc','EXP']],['And',['INSTRUCCIONES','Pyc','EXP']],['Or',['INSTRUCCIONES','Pyc','EXP']],['Xor',['INSTRUCCIONES','Pyc','EXP']],['Rint',['INSTRUCCIONES','DECLARACION']],['Rdouble',['INSTRUCCIONES','DECLARACION']],['Rstring',['INSTRUCCIONES','DECLARACION']],['Rchar',['INSTRUCCIONES','DECLARACION']],['Rboolean',['INSTRUCCIONES','DECLARACION']],['Rfor',['INSTRUCCIONES','CICLO']],['Rwhile',['INSTRUCCIONES','CICLO']],['Rdo',['INSTRUCCIONES','CICLO']],['Rif',['INSTRUCCIONES','CONTROL']],['Rtrue',['INSTRUCCIONES','Pyc','EXP']],['Rfalse',['INSTRUCCIONES','Pyc','EXP']],['Rsystem',['INSTRUCCIONES','PRINT']]]],                
        ['CICLO',[['Rfor',['LCierra','INSTRUCCIONES','LAbre','PCierra','Pyc','EXP','Pyc','EXP','Pyc','DECLARACION','PAbre','Rfor']],['Rwhile',['LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rwhile']],['Rdo',['Pyc','PCierra','EXP','PAbre','Rwhile','LCierra','INSTRUCCIONES','LAbre','Rdo']]]],
        ['CONTROL',[['Rif',['ELSE','LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rif']]]],
        ['ELSE',[['Identificador',['Epsilon']],['Numero',['Epsilon']],['LCierra',['Epsilon']],['PAbre',['Epsilon']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['Epsilon']],['SDiv',['Epsilon']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['Not',['Epsilon']],['And',['Epsilon']],['Or',['Epsilon']],['Xor',['Epsilon']],['Rint',['Epsilon']],['Rdouble',['Epsilon']],['Rstring',['Epsilon']],['Rchar',['Epsilon']],['Rboolean',['Epsilon']] ,['Rfor',['Epsilon']],['Rwhile',['Epsilon']],['Rdo',['Epsilon']],['Rif',['Epsilon']],['Relse',['ELSE','LCierra','INSTRUCCIONES','LAbre','ELSEIF','Relse']],['Rtrue',['Epsilon']],['Rfalse',['Epsilon']]]], 
        ['ELSEIF',[['LAbre',['Epsilon']],['Rif',['ELSE','LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rif']]]],     
        ['EXP',[['Identificador',['LP','P']],['Numero',['LP','P']],['PAbre',['LP','P']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['LP','P']],['SDiv',['LP','P']],['SMas',['LP','P']],['SMenos',['LP','P']],['SMayor',['LP','P']],['SMenor',['LP','P']],['SMayorIgual',['LP','P']],['SMenorIgual',['LP','P']],['SComp',['LP','P']],['SDif',['LP','P']],['Not',['LP','P']],['And',['LP','P']],['Xor',['LP','P']],['Or',['LP','P']],['Rtrue',['LP','P']],['Rfalse',['LP','P']]]],   
        ['LP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['And',['LP','P','Or']],['Xor',['LP','P','Or']],['Or',['LP','P','Or']]]],   
        ['P',[['Identificador',['R']],['Numero',['R']],['PAbre',['R']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['R']],['SDiv',['R']],['SMas',['R']],['SMenos',['R']],['SMayor',['R']],['SMenor',['R']],['SMayorIgual',['R']],['SMenorIgual',['R']],['SComp',['R']],['SDif',['R']],['Not',['EXP','Not']],['And',['R']],['Xor',['R']],['Or',['R']],['Rtrue',['Rtrue']],['Rfalse',['Rfalse']]]],   
        ['R',[['Identificador',['RP','E']],['Numero',['RP','E']],['PAbre',['RP','E']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['RP','E']],['SDiv',['RP','E']],['SMas',['RP','E']],['SMenos',['RP','E']],['SMayor',['RP','E']],['SMenor',['RP','E']],['SMayorIgual',['RP','E']],['SMenorIgual',['RP','E']],['SComp',['RP','E']],['SDif',['RP','E']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['RP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SMayor',['RP','V','SMayor']],['SMenor',['RP','V','SMenor']],['SMayorIgual',['RP','V','SMayorIgual']],['SMenorIgual',['RP','V','SMenorIgual']],['SComp',['RP','V','SComp']],['SDif',['RP','V','SDif']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['E',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMas',['EP','T']],['SMenos',['EP','T']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['EP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SMas',['SMA','SMas']],['SMenos',['SMA','SMenos']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['T',[['Identificador',['TP','F']],['Numero',['TP','F']],['PAbre',['TP','F']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['TP','F']],['SDiv',['TP','F']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['TP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['TP','F','SPor']],['SDiv',['TP','F','SDiv']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['F',[['Identificador',['IDN','Identificador']],['Numero',['Numero']],['PAbre',['PCierra','EXP','PAbre']]]], 
        ['SMA',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMas',['SMas']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['SME',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMenos',['SMenos']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['IDN',[['PAbre',['CALL']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SIgual',['ASIG']],['Pyc',['Epsilon']],['SPor',['Epsilon']],['SDiv',['Epsilon']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['ASIG',[['SIgual',['Pyc','EXP','SIgual']]]],
        ['CALL',[['PAbre',['Pyc','PCierra','NEXTCALL','PAbre']]]],
        ['NEXTCALL',[['Identificador',['RECIBE']],['Numero',['RECIBE']],['Texto',['RECIBE']],['PCierra',['Epsilon']],['Rfalse',['RECIBE']],['Rtrue',['RECIBE']]]],
        ['RECIBE',[['Identificador',['NEXTRECIBE','Identificador']],['Numero',['NEXTRECIBE','Numero']],['Texto',['NEXTRECIBE','Texto']],['Rfalse',['NEXTRECIBE','Rfalse']],['Rtrue',['NEXTRECIBE','Rtrue']]]],
        ['NEXTRECIBE',[['PCierra',['Epsilon']],['SComa',['RECIBE','SComa']]]],
        ['PRINT',[['Rsystem',['SALIDA','Spunto','Rout','Spunto','Rsystem']]]],
        ['SALIDA',[['Rprint',['Pyc','PCierra','MSG','PAbre','Rprint']],['Rprintln',['Pyc','PCierra','MSG','PAbre','Rprintln']]]],
        ['MSG',[['Identificador',['EXP']],['Numero',['EXP']],['PAbre',['EXP']],['PCierra',['Epsilon']],['SPor',['EXP']],['SDiv',['EXP']],['SMas',['EXP']],['SMenos',['EXP']],['SMayor',['EXP']],['SMenor',['EXP']],['SMayorIgual',['EXP']],['SMenorIgual',['EXP']],['SComp',['EXP']],['SDif',['EXP']],['Not',['EXP']],['And',['EXP']],['Xor',['EXP']],['Or',['EXP']],['Rtrue',['EXP']],['Rfalse',['EXP']]]]            
    ])
    let Pila = new Array('$','INICIO') //se agrega el EOF en la pila
    let tk_nuevo = {
        linea: 0,
        columna: 0,
        texto: 0,
        nombre: '$'
    }
    Tokens.push(tk_nuevo)//se agrega el EOF en la cadena

    while (Pila.length != 0 ){
        let var1 = Pila[Pila.length-1]
        let var2 = Tokens[0].nombre
        if (var1 == var2){
            if (var1 == '$'){
                //se acepta la cadena
                result = 'LA CADENA ES VALIDA'
                console.log(result)
                break
            }else{
                Pila.pop()
                //Tokens.pop(0)
                Tokens.splice(0,1)
            }
        }else{
            Pila.pop()
            let var3 = ObtenerDato(var1, var2) //OBTENER
            Push(var3) //PUSHEAR
        }
        console.log(Pila)
        console.log(Tokens)
        if (result == 'LA CADENA ES INVALIDA'){
            break
        }
    }

    function Push(var3){
        //PUSHEAR
        if (var3 == undefined){
            //la cadena no se acepta
            result = 'LA CADENA ES INVALIDA'
            console.log(result)
            
        }else if (var3[0] == 'Epsilon'){
            return
        }else{
            for (let x of var3){
                Pila.push(x) //se agregan las producciones desglosadas a la pila
            }  
        }
    }

    function ObtenerDato(var1, var2){
        let lista = Producciones.get(var1)
        let temporal = undefined
        if (lista != undefined){
            //OBTENER
            for (let x of lista){
                if (x[0] == var2){
                    //se desglosa
                    temporal = x[1]
                }
            }
        }
        return temporal
    }
}

//imprimir
function Imprimir(Lista, str){
    console.log('Lista de '+str+':')
    for(let token of Lista){
        console.log(token.linea+', '+token.columna+', '+token.texto+', '+token.nombre)
    }
}

function Analizar(){
    let Tokens = new Array()
    let Errores = new Array()
    Scanner(Tokens, Errores);
    Imprimir(Tokens, 'Tokens')
    Imprimir(Errores, 'Errores')
    console.log('Se realizó el analisis Lexico correctamente')
    Parser(Tokens)
    console.log('Se realizó el analisis Sintactico correctamente')
}   
