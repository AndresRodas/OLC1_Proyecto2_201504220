
var contador=1;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');

        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
        $(pestanna1).css('width','20%');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
       
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
                theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='Tab'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    

    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=125;
    ta.rows=50;
    divp.appendChild(ta);
    contenido.appendChild(divp);
   

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
        contador --
        get_vent()
    }catch(error){}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);
    

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
    
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".java";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}

//********************************ANALIZADOR LEXICO******************************************
function Scanner(Tokens, Errores, entrada){
    let Signos = new Map([['Pyc',';'],['SComa',','],['LCierra','}'],['LAbre','{'],['PCierra',')'],['PAbre','('],['SPunto','.'],['SMas','+'],['SPor','*'],['SMenos','-'],['CCierra',']'],['CAbre','['],['Xor','^']])
    let PalabrasReservadas = new Array('interface','if','else','public','import','package','class','interfaz','void','int','double','char','string','boolean','for','while','system','out','println','print','do','break','continue','return','static','main','true','false','switch')
    let cont = 0
    let line = 1
    let column = 1
    let vocal = /^[A-Za-z]$/
    let id = /^[A-Za-z_0-9]$/
    let numero = /^[0-9]$/
    let numero2 = /^[0-9\.]$/
    let salto = /^[\n]/
    let space = /^[ ]/
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
                // let tk_nuevo = {
                //     linea: line,
                //     columna: column,
                //     texto: entrada[cont],
                //     nombre: 'Error'
                // }
                let tk_error = {
                    linea: line,
                    columna: column,
                    tipo: 'Léxico',
                    descripcion: 'El caracter: '+entrada[cont]+' no pertenece al lenguaje.'
                }
                Errores.push(tk_error)
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
//********************************ANALIZADOR SINTÁCTICO**************************************
function Parser(TokensEntrada, Errores, nodes, edges){
    let cont_graf = 1;
    let Tokens = []
    for(let token of TokensEntrada){
        Tokens.push(token)
    }
    let temporal = ''
    let result = ''
    let Producciones = new Map([
        ['INICIO',[['Rpublic',['INICIO','S','Rpublic']],['$',['Epsilon']]]], 
        ['S',[['Rclass',['LCierra','CONTCLASS','LAbre','Identificador','Rclass']],['Rinterface',['LCierra','CONTINTER','LAbre','Identificador','Rinterface']]]],
        ['CONTINTER',[['LCierra',['Epsilon']],['Rpublic',['CONTINTER','Pyc','PCierra','NEXTFUNC','PAbre','Identificador','TIPO','Rpublic']]]],
        ['CONTCLASS',[['LCierra',['Epsilon']],['Rpublic',['CCN','Rpublic']],['Rint',['CONTCLASS','DECLARACION']],['Rdouble',['CONTCLASS','DECLARACION']],['Rstring',['CONTCLASS','DECLARACION']],['Rchar',['CONTCLASS','DECLARACION']],['Rboolean',['CONTCLASS','DECLARACION']]]], 
        ['CCN',[['Rstatic',['CONTCLASS','MAIN']],['Rint',['CONTCLASS','FUNCION']],['Rdouble',['CONTCLASS','FUNCION']],['Rstring',['CONTCLASS','FUNCION']],['Rchar',['CONTCLASS','FUNCION']],['Rboolean',['CONTCLASS','FUNCION']],['Rvoid',['CONTCLASS','FUNCION']]]], 
        ['MAIN',[['Rstatic',['LCierra','INSTRUCCIONES','LAbre','PCierra','Identificador','CCierra','CAbre','Rstring','PAbre','Rmain','Rvoid','Rstatic']]]],
        ['DECLARACION',[['Rint',['NEXTDEC','Identificador','Rint']],['Rdouble',['NEXTDEC','Identificador','Rdouble']],['Rstring',['NEXTDEC','Identificador','Rstring']],['Rchar',['NEXTDEC','Identificador','Rchar']],['Rboolean',['NEXTDEC','Identificador','Rboolean']]]],
        ['NEXTDEC',[['Pyc',['Pyc']],['SIgual',['FINDEC','SIgual']]]],
        ['FINDEC',[['Identificador',['Pyc','EXP']],['Numero',['Pyc','EXP']],['Texto',['Pyc','Texto']],['PAbre',['Pyc','EXP']],['Pyc',['Epsilon']],['SPor',['Pyc','EXP']],['SDiv',['Pyc','EXP']],['SMas',['Pyc','EXP']],['SMenos',['Pyc','EXP']],['SMayor',['Pyc','EXP']],['SMenor',['Pyc','EXP']],['SMayorIgual',['Pyc','EXP']],['SMenorIgual',['Pyc','EXP']],['SComp',['Pyc','EXP']],['SDif',['Pyc','EXP']],['Not',['Pyc','EXP']],['And',['Pyc','EXP']],['Or',['Pyc','EXP']],['Xor',['Pyc','EXP']],['Rtrue',['Pyc','EXP']],['Rfalse',['Pyc','EXP']]]], 
        ['FUNCION',[['Rvoid',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rint',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rdouble',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rstring',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rchar',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']],['Rboolean',['LCierra','INSTRUCCIONES','LAbre','PCierra','NEXTFUNC','PAbre','Identificador','TIPO']]]],
        ['NEXTFUNC',[['PCierra',['Epsilon']],['Rvoid',['PARAMETROS']],['Rint',['PARAMETROS']],['Rdouble',['PARAMETROS']],['Rstring',['PARAMETROS']],['Rchar',['PARAMETROS']],['Rboolean',['PARAMETROS']]]],
        ['TIPO',[['Rvoid',['Rvoid']],['Rint',['Rint']],['Rdouble',['Rdouble']],['Rstring',['Rstring']],['Rchar',['Rchar']],['Rboolean',['Rboolean']]]],
        ['PARAMETROS',[['Rvoid',['NEXTPARAM','Identificador','TIPO']],['Rint',['NEXTPARAM','Identificador','TIPO']],['Rdouble',['NEXTPARAM','Identificador','TIPO']],['Rstring',['NEXTPARAM','Identificador','TIPO']],['Rchar',['NEXTPARAM','Identificador','TIPO']],['Rboolean',['NEXTPARAM','Identificador','TIPO']]]],
        ['NEXTPARAM',[['PCierra',['Epsilon']],['SComa',['PARAMETROS','SComa']]]],
        ['INSTRUCCIONES',[['LCierra',['Epsilon']],['Numero',['INSTRUCCIONES','Pyc','EXP']],['Identificador',['INSTRUCCIONES','Pyc','EXP']],['SPor',['INSTRUCCIONES','Pyc','EXP']],['SDiv',['INSTRUCCIONES','Pyc','EXP']],['SMas',['INSTRUCCIONES','Pyc','EXP']],['SMenos',['INSTRUCCIONES','Pyc','EXP']],['SMayor',['INSTRUCCIONES','Pyc','EXP']],['SMenor',['INSTRUCCIONES','Pyc','EXP']],['SMayorIgual',['INSTRUCCIONES','Pyc','EXP']],['SMenorIgual',['INSTRUCCIONES','Pyc','EXP']],['SComp',['INSTRUCCIONES','Pyc','EXP']],['SDif',['INSTRUCCIONES','Pyc','EXP']],['Not',['INSTRUCCIONES','Pyc','EXP']],['And',['INSTRUCCIONES','Pyc','EXP']],['Or',['INSTRUCCIONES','Pyc','EXP']],['Xor',['INSTRUCCIONES','Pyc','EXP']],['Rint',['INSTRUCCIONES','DECLARACION']],['Rdouble',['INSTRUCCIONES','DECLARACION']],['Rstring',['INSTRUCCIONES','DECLARACION']],['Rchar',['INSTRUCCIONES','DECLARACION']],['Rboolean',['INSTRUCCIONES','DECLARACION']],['Rfor',['INSTRUCCIONES','CICLO']],['Rwhile',['INSTRUCCIONES','CICLO']],['Rdo',['INSTRUCCIONES','CICLO']],['Rif',['INSTRUCCIONES','CONTROL']],['Rtrue',['INSTRUCCIONES','Pyc','EXP']],['Rfalse',['INSTRUCCIONES','Pyc','EXP']],['Rsystem',['INSTRUCCIONES','PRINT']],['Rreturn',['INSTRUCCIONES','Pyc','EXP','Rreturn']],['Rbreak',['INSTRUCCIONES','Pyc','Rbreak']],['Rcontinue',['INSTRUCCIONES','Pyc','Rcontinue']]]],
        ['CICLO',[['Rfor',['LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','Pyc','EXP','DECLARACION','PAbre','Rfor']],['Rwhile',['LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rwhile']],['Rdo',['Pyc','PCierra','EXP','PAbre','Rwhile','LCierra','INSTRUCCIONES','LAbre','Rdo']]]],
        ['CONTROL',[['Rif',['ELSE','LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rif']]]],
        ['ELSE',[['Identificador',['Epsilon']],['Numero',['Epsilon']],['LCierra',['Epsilon']],['PAbre',['Epsilon']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['Epsilon']],['SDiv',['Epsilon']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['Not',['Epsilon']],['And',['Epsilon']],['Or',['Epsilon']],['Xor',['Epsilon']],['Rint',['Epsilon']],['Rdouble',['Epsilon']],['Rstring',['Epsilon']],['Rchar',['Epsilon']],['Rboolean',['Epsilon']] ,['Rfor',['Epsilon']],['Rwhile',['Epsilon']],['Rdo',['Epsilon']],['Rif',['Epsilon']],['Relse',['ELSE','LCierra','INSTRUCCIONES','LAbre','ELSEIF','Relse']],['Rtrue',['Epsilon']],['Rfalse',['Epsilon']]]], 
        ['ELSEIF',[['LAbre',['Epsilon']],['Rif',['ELSE','LCierra','INSTRUCCIONES','LAbre','PCierra','EXP','PAbre','Rif']]]],     
        ['EXP',[['Identificador',['LP','P']],['Numero',['LP','P']],['PAbre',['LP','P']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['LP','P']],['SDiv',['LP','P']],['SMas',['LP','P']],['SMenos',['LP','P']],['SMayor',['LP','P']],['SMenor',['LP','P']],['SMayorIgual',['LP','P']],['SMenorIgual',['LP','P']],['SComp',['LP','P']],['SDif',['LP','P']],['Not',['LP','P']],['And',['LP','P']],['Xor',['LP','P']],['Or',['LP','P']],['Rtrue',['LP','P']],['Rfalse',['LP','P']]]],   
        ['LP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['And',['LP','P','And']],['Xor',['LP','P','Xor']],['Or',['LP','P','Or']]]],   
        ['P',[['Identificador',['R']],['Numero',['R']],['PAbre',['R']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['R']],['SDiv',['R']],['SMas',['R']],['SMenos',['R']],['SMayor',['R']],['SMenor',['R']],['SMayorIgual',['R']],['SMenorIgual',['R']],['SComp',['R']],['SDif',['R']],['Not',['EXP','Not']],['And',['R']],['Xor',['R']],['Or',['R']],['Rtrue',['Rtrue']],['Rfalse',['Rfalse']]]],   
        ['R',[['Identificador',['RP','E']],['Numero',['RP','E']],['PAbre',['RP','E']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['RP','E']],['SDiv',['RP','E']],['SMas',['RP','E']],['SMenos',['RP','E']],['SMayor',['RP','E']],['SMenor',['RP','E']],['SMayorIgual',['RP','E']],['SMenorIgual',['RP','E']],['SComp',['RP','E']],['SDif',['RP','E']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['RP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SMayor',['RP','E','SMayor']],['SMenor',['RP','E','SMenor']],['SMayorIgual',['RP','E','SMayorIgual']],['SMenorIgual',['RP','E','SMenorIgual']],['SComp',['RP','E','SComp']],['SDif',['RP','E','SDif']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['E',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMas',['EP','T']],['SMenos',['EP','T']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']],['Rtrue',['EP','T']],['Rfalse',['EP','T']]]],
        ['EP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SMas',['SMA','SMas']],['SMenos',['SME','SMenos']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['T',[['Identificador',['TP','F']],['Numero',['TP','F']],['PAbre',['TP','F']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['TP','F']],['SDiv',['TP','F']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']],['Rtrue',['TP','F']],['Rfalse',['TP','F']]]],
        ['TP',[['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['TP','F','SPor']],['SDiv',['TP','F','SDiv']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['F',[['Identificador',['IDN','Identificador']],['Numero',['Numero']],['PAbre',['PCierra','EXP','PAbre']],['Rtrue',['Rtrue']],['Rfalse',['Rfalse']]]], 
        ['SMA',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMas',['SMas']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['SME',[['Identificador',['EP','T']],['Numero',['EP','T']],['PAbre',['EP','T']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SPor',['EP','T']],['SDiv',['EP','T']],['SMenos',['SMenos']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        ['IDN',[['PAbre',['CALL']],['PCierra',['Epsilon']],['Pyc',['Epsilon']],['SIgual',['ASIG']],['Pyc',['Epsilon']],['SPor',['Epsilon']],['SDiv',['Epsilon']],['SMas',['Epsilon']],['SMenos',['Epsilon']],['SMayor',['Epsilon']],['SMenor',['Epsilon']],['SMayorIgual',['Epsilon']],['SMenorIgual',['Epsilon']],['SComp',['Epsilon']],['SDif',['Epsilon']],['And',['Epsilon']],['Xor',['Epsilon']],['Or',['Epsilon']]]],
        //['ASIG',[['SIgual',['Pyc','EXP','SIgual']]]],
        ['ASIG',[['SIgual',['EXP','SIgual']]]],
        ['CALL',[['PAbre',['PCierra','NEXTCALL','PAbre']]]],
        ['NEXTCALL',[['Identificador',['RECIBE']],['Numero',['RECIBE']],['Texto',['RECIBE']],['PCierra',['Epsilon']],['Rfalse',['RECIBE']],['Rtrue',['RECIBE']]]],
        ['RECIBE',[['Identificador',['NEXTRECIBE','Identificador']],['Numero',['NEXTRECIBE','Numero']],['Texto',['NEXTRECIBE','Texto']],['Rfalse',['NEXTRECIBE','Rfalse']],['Rtrue',['NEXTRECIBE','Rtrue']]]],
        ['NEXTRECIBE',[['PCierra',['Epsilon']],['SComa',['RECIBE','SComa']]]],
        ['PRINT',[['Rsystem',['SALIDA','SPunto','Rout','SPunto','Rsystem']]]],
        ['SALIDA',[['Rprint',['Pyc','PCierra','MSG','PAbre','Rprint']],['Rprintln',['Pyc','PCierra','MSG','PAbre','Rprintln']]]],
        ['MSG',[['Identificador',['EXP']],['Numero',['EXP']],['Texto',['Texto']],['PAbre',['EXP']],['PCierra',['Epsilon']],['SPor',['EXP']],['SDiv',['EXP']],['SMas',['EXP']],['SMenos',['EXP']],['SMayor',['EXP']],['SMenor',['EXP']],['SMayorIgual',['EXP']],['SMenorIgual',['EXP']],['SComp',['EXP']],['SDif',['EXP']],['Not',['EXP']],['And',['EXP']],['Xor',['EXP']],['Or',['EXP']],['Rtrue',['EXP']],['Rfalse',['EXP']]]]            
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
                Tokens.splice(0,1)
            }
        }else{
            temporal = Pila[Pila.length-1]
            Pila.pop()
            let var3 = ObtenerDato(var1, var2) //OBTENER
            
            Push(var3) //PUSHEAR
        }
        console.log('PILA')
        console.log(Pila)
    }

    function Push(var3){
        //PUSHEAR
        if (var3 == undefined){ //RECUPERACION DE ERRORES
            result = 'ERROR SINTACTICO'
            let lista = Producciones.get(temporal)
            if(temporal == temporal.toUpperCase() && lista != undefined){
                
                temporal = lista[0][0]
        
            }
            //console.log(result+', SE ESPERABA: '+temporal+', Y SE OBTUVO: '+Tokens[0].nombre+', en linea: '+Tokens[0].linea+', y columna: '+Tokens[0].columna)
            let tk_error = {
                linea: Tokens[0].linea,
                columna: Tokens[0].columna,
                tipo: 'Sintáctico',
                descripcion: 'Se esperaba: '+temporal+' y se encontró: '+Tokens[0].nombre+'.'
            }
            if (temporal != '$' ) Errores.push(tk_error)

            while (Pila[Pila.length-1] != 'CONTCLASS' && Pila[Pila.length-1] != 'CONTINTER' && Pila.length > 1){
                Pila.pop()
            }
            while (Tokens[0].nombre != 'Pyc' && Tokens.length > 1) {
                Tokens.splice(0,1) 
            }
            if (Tokens[0].nombre == 'Pyc'){
                Tokens.splice(0,1)
            }
            
        }else if (var3[0] == 'Epsilon'){
            return
        }else{
            for (let x of var3){
                Pila.push(x) //se agregan las producciones desglosadas a la pila
            }  
        }
    }

    //se extrae la produccion
    function ObtenerDato(var1, var2){
        let lista = Producciones.get(var1)
        let temporal = undefined
        if (lista != undefined){
            //OBTENER
            for (let x of lista){
                if (x[0] == var2){
                    //se desglosa
                    temporal = x[1]
                    for(let son of x[1]){
                        if(var1 != son && son != 'Epsilon'){
                            nodes.push({id: var1+cont_graf, label: var1, group: var2})
                            nodes.push({id: son+cont_graf, label: son, group: var2})
                            edges.push({from: var1+cont_graf, to: son+cont_graf}) //se agrega el enlace del grafo!!!!!!!!!!!!!!!!
                            cont_graf++
                        }   
                    }
                }
            }
        }
        return temporal
    }
}
//********************************ANALIZAR ENTRADA*******************************************
function AnalizarPatita(){

    //variable grafica
    var salida_grafo = document.getElementById('grafo');
    var grafi = 'digraph  {po -> b}'
    d3.select(salida_grafo).graphviz().renderDot(grafi);

    //entrada
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual
    ta.setSize(34, 300);

    
    
    //se declaran los arrays
    var Tokens = new Array()
    var Tokens_Parser = new Array()
    var Errores = new Array()
    var Comentarios = new Array()

    //declaracion de nodos y aristas para el grafo
    var nodes = []
    var edges = []

    //se realiza el analisis lexico
    Scanner(Tokens, Errores, contenido)

    //copiar tokens para parsear
    for(let token of Tokens){
        Tokens_Parser.push(token)
    }

    //extrayendo comentarios
    ExtraerComentarios(Tokens_Parser, Comentarios)

    //se realiza el analisis sintactico
    Parser(Tokens_Parser, Errores, nodes, edges)
    console.log('Se realizó el analisis correctamente')

    //imprimir
    Imprimir(Tokens, 'Tokens')
    Imprimir(Comentarios,'Comentarios')
    Imprimir(Errores, 'Errores')

    //realizar Grafo de analisis sintactico
    Grafo(nodes, edges)

    var TokensPython = Traducir(Tokens)
    var salida = ''
    for(let tkp of TokensPython){
        
        salida = salida + tkp.texto
    } 
    console.log(salida)
}   
//********************************TRADUCIR A PYTHON******************************************
function Traducir(Tokens) {
    let Tk_Py = []
    let contador_llave = 1
    let tk_nuevo = {
        linea: 0,
        columna: 0,
        texto: ''
    }
    let regex = /\//;
    var main = false;
    for(var i = 0; i < Tokens.length; i++){
        switch (Tokens[i].nombre) {
            case 'Identificador'://se agrega un identificador
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, Tokens[i].texto)
                Tk_Py.push(tk_nuevo)
                break;
            case 'LAbre'://
                contador_llave ++
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, ':\n')
                for(let x = 0; x < contador_llave; x++ ){
                    tk_nuevo.texto + '\t'
                }
                Tk_Py.push(tk_nuevo)
                break;
            case 'LCierra':
                contador_llave --
                break;
            case 'Rpublic':
                if (Tokens[i+1].nombre == 'Rclass' || Tokens[i+1].nombre == 'Rinterface'){
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'class')
                    Tk_Py.push(tk_nuevo)
                    Tokens.splice(i+1,1)
                }else if (Tokens[i+1].nombre == 'Rstring' || Tokens[i+1].nombre == 'Rint' || Tokens[i+1].nombre == 'Rchar' || Tokens[i+1].nombre == 'Rboolean' || Tokens[i+1].nombre == 'Rdouble' || Tokens[i+1].nombre == 'Rvoid' || Tokens[i+1].nombre == 'Rstatic'){
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'self')
                    Tk_Py.push(tk_nuevo)
                    Tokens.splice(i+1,1)
                }
                break;
            case 'PAbre':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '(')
                Tk_Py.push(tk_nuevo)
                break;
            case 'PCierra':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, ')')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Numero':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, Tokens[i].texto)
                Tk_Py.push(tk_nuevo)
                break;
            case 'ComentarioUni':
                regex = /\/\//;
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, Tokens[i].texto.replace(regex,'#'))
                Tk_Py.push(tk_nuevo)
                break;
            case 'ComentarioMulti':
                regex1 = '\/*';
                regex2 = '*\/';
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, Tokens[i].texto.replace(regex1,'\'\'\'').replace(regex2,'\'\'\''))
                Tk_Py.push(tk_nuevo)
                break;
            case 'And':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'and')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Or':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'or')
                Tk_Py.push(tk_nuevo)
                break; 
            case 'Not':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'not')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Xor':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'xor')
                Tk_Py.push(tk_nuevo)
                break; 

            case 'Rbreak':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'break')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Pcontinue':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'continue')
                Tk_Py.push(tk_nuevo)
                break; 
            case 'Preturn':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'return')
                Tk_Py.push(tk_nuevo)
                break;

            case 'Rstring':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rint':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rboolean':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rchar':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rfloat':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rdouble':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'var')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rmain':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'main')
                Tk_Py.push(tk_nuevo)
                main = true;
                break;
            case 'Pyc':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '\n')
                for(let x = 0; x < contador_llave; x++ ){
                    tk_nuevo.texto + '\t'
                }
                Tk_Py.push(tk_nuevo)
                break;
            case 'SIgual':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '=')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SComa':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, ',')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SPunto':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '.')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SPor':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '*')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SDiv':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '\/')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMas':
                if(Tokens[i+1].nombre == 'SMas' ){
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '+= 1')
                    i++
                }else{
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '+')
                }
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMenos':
                if(Tokens[i+1].nombre == 'SMenos' ){
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '-= 1')
                    i++
                }else{
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '-')
                }
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMayor':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '>')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMenor':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '<')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMayorIgual':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '>=')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SMenorIgual':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '<=')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SComp':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '==')
                Tk_Py.push(tk_nuevo)
                break;
            case 'SDif':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, '!=')
                Tk_Py.push(tk_nuevo)
                break;
                        
            case 'Rfor':
                let tk_for = ''
                let ln = Tokens[i].linea
                let col = Tokens[i].columna
                let exp1 = ''
                let exp2 = ''
                let id = ''
                while(Tokens[i].nombre != 'PCierra'){
                    if (Tokens[i].nombre == 'Identificador'){
                        id = Tokens[i].texto
                    }
                    if (Tokens[i].nombre == 'SIgual'){
                        i++
                        while(Tokens[i].nombre != 'Pyc'){
                            exp1 = exp1 + Tokens[i].texto
                            i++
                        }
                        i++
                        while(Tokens[i].nombre != 'Pyc'){
                            exp2 = exp2 + Tokens[i].texto
                                i++
                        }
                    }
                    i++
                }
                tk_for = 'for '+id+' in range ('+exp1+', '+exp2+')'
                tk_nuevo = CrearToken(ln, col, tk_for)
                Tk_Py.push(tk_nuevo)
                break;
            
            case 'Rwhile':
                let temp = i
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'while')
                Tk_Py.push(tk_nuevo)
                i++
                while(Tokens[i].nombre != 'LAbre' && Tokens[i].nombre != 'Pyc'){
                    if (Tokens[i].nombre == 'PAbre' || Tokens[i].nombre == 'PCierra') {
                        Tokens.splice(i,1);
                    }else{
                        i++
                    }
                }
                i = temp
                break;
            
            case 'Rdo':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'while True')
                Tk_Py.push(tk_nuevo)
                break;
            
            case 'Rtrue':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'true')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rfalse':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'false')
                Tk_Py.push(tk_nuevo)
                break;   

            case 'Rif':
                let temp1 = i
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'if')
                Tk_Py.push(tk_nuevo)
                i++
                while(Tokens[i].nombre != 'LAbre'){
                    if (Tokens[i].nombre == 'PAbre' || Tokens[i].nombre == 'PCierra') {
                        Tokens.splice(i,1);
                    }else{
                        i++
                    }
                }
                i = temp1
                break;
            case 'Relse':
                if(Tokens[i+1].nombre == 'Rif'){
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'elif')
                    i++
                    let temp2 = i
                    i++
                    while(Tokens[i].nombre != 'LAbre'){
                        if (Tokens[i].nombre == 'PAbre' || Tokens[i].nombre == 'PCierra') {
                            Tokens.splice(i,1);
                        }else{
                            i++
                        }
                    }
                    i = temp2
                }else{
                    tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'else')
                }
                Tk_Py.push(tk_nuevo)
                break;   
            case 'Rprint':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'print')
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rprintln':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, 'print')
                Tk_Py.push(tk_nuevo)
                break;

            case 'Texto':
                tk_nuevo = CrearToken(Tokens[i].linea, Tokens[i].columna, Tokens[i].texto)
                Tk_Py.push(tk_nuevo)
                break;
            case 'Rsystem':
                let temp3 = i
                i++
                while(Tokens[i].nombre != 'PAbre'){
                    if (Tokens[i].nombre == 'SPunto') {
                        Tokens.splice(i,1);
                    }else{
                        i++
                    }
                }
                i = temp3
                break;
            default:
                break;
        }
    } 
    
    if (main){
        let main_text = 'if __name__ = \"__main__\":\n main()'
        tk_nuevo = CrearToken(0, 0, main_text)
        Tk_Py.push(tk_nuevo)
    }

    return Tk_Py
}
//Aqui se crea un token nuevo para python
function CrearToken(line, column, text){
    let tk_nuevo = {
        linea: 0,
        columna: 0,
        texto: ''
    }
    tk_nuevo.linea = line
    tk_nuevo.columna = column
    tk_nuevo.texto = text
    return tk_nuevo
}
//extraer comentarios 
function ExtraerComentarios(Tokens, Comentarios) {
    for(i = 0;i < Tokens.length; i++){
        if(Tokens[i].nombre == 'ComentarioUni' || Tokens[i].nombre == 'ComentarioMulti'){
            let temp = Tokens.splice(i,1)
            let com = {
                linea: temp[0].linea,
                columna: temp[0].columna,
                texto: temp[0].texto,
                nombre:temp[0].nombre
            }
            //
            Comentarios.push(com)
        }
    }
}
//quitar nodos repetidos
function NodosRepetidos(nodes) {
    let nodes_rep = [];
    for(let nod of nodes){
        let flag = true;
        for(let nod_rep of nodes_rep){
            if(nod.id == nod_rep.id){
                flag = false;
            }
        }
        if (flag){
            nodes_rep.push(nod)
        }
    }
    nodes = []
    nodes = nodes_rep
    return nodes
}
//quitar edges repetidos
function EdgesRepetidos(edges) {
    let edges_rep = [];
    for(let edg of edges){
        let flag = true;
        for(let edg_rep of edges_rep){
            if(edg.from == edg_rep.from && edg.to == edg_rep.to ){
                flag = false;
            }
        }
        if (flag){
            edges_rep.push(edg)
        }
    }
    edges = []
    edges = edges_rep
    return edges
}
//imprimir
function Imprimir(Lista, str){
    console.log('Lista de '+str+':')
    if(str == 'Errores'){
        for(let error of Lista){
            console.log(error.linea+', '+error.columna+', '+error.tipo+', '+error.descripcion)
        }
        return
    }
    for(let token of Lista){
        console.log(token.linea+', '+token.columna+', '+token.texto+', '+token.nombre)
    }
}
//grafo
function Grafo(nodes, edges) { 
    nodes = NodosRepetidos(nodes)
    edges = EdgesRepetidos(edges)  
    var options = {
        layout:{
            hierarchical:{
                direction: "UD",
                sortMethod: "directed",
                shakeTowards: 'leaves'
            },
        },
        edges: {
            arrows: "to",
        },
        width:  '1000px',
        height: '1000px',
    }; 
    // create a network
    var container = document.getElementById('grafo');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var network = new vis.Network(container, data, options);

}