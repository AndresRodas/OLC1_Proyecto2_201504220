//***************************VARIABLES GLOBALES********************

var TextoTraducido = ''
var NombreArchivo = ''

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



function TraducirJavascript(){
    NombreArchivo = '.js'
    let tk = []
    let err = []
    let trd = ''
    let grf = ''

    //Definicion de la entrada
    var ta = document.getElementById(get_vent());
    var contenido = ta.value; 
    //Variables de inicio
    let send = { texto: contenido }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(send)
    }

    //Peticiones post
    fetch('http://localhost:3666', options)

    setTimeout(function () {
        
        console.log('Pasaron dos segundos')
        //Peticiones get: Tokens
        fetch('http://localhost:3666/tokens')
        .then(response => response.json() )
        .then(data =>  {
            console.log('LISTA DE TOKENS')
            console.log(data)
            tk = data.slice()
            //hay que imprimir los tokens en la consola
            TokensTable(tk)
        }).catch(err =>  console.log(err))

        //Peticiones get: Traduccion
        fetch('http://localhost:3666/errores')
        .then(response => response.json() )
        .then(data =>  {
            console.log('LISTA DE ERRORES')
            console.log(data)
            err = data.slice()
            ConsolaJs(err)
            ErrorsTable(err)

        }).catch(err =>  console.log(err))

        //Peticiones get: Errores
        fetch('http://localhost:3666/traduccion')
        .then(response => response.json() )
        .then(data =>  {
            console.log('TRADUCCION A JAVASCRIPT')
            trd = data[0]
            TextoTraducido = trd
        }).catch(err =>  console.log(err))

        //Peticiones get: grafo
        fetch('http://localhost:3666/grafo')
        .then(response => response.json() )
        .then(data =>  {
            console.log('GRAFO')
            grf = data[0]
            var salida_grafo = document.getElementById('grafo');
            d3.select(salida_grafo).graphviz().renderDot(grf); 
        }).catch(err =>  console.log(err))

    },1000);
    alert("Se realizó el analisis y traduccion a Javascript");
}

function TraducirPython(){
    NombreArchivo = '.py'
    let tks = []
    let err = []
    let tra = ''
    let grf = ''
    //Definicion de la entrada
    var ta = document.getElementById(get_vent());
    var contenido = ta.value; 
    //Variables de inicio
    let send = { texto: contenido }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(send) 
    }

    //Peticiones post
    fetch('http://localhost:3667', options)

    setTimeout(function () {
        //Peticiones get: Tokens
        fetch('http://localhost:3667/tokens')
        .then(response => response.json() )
        .then(data =>  {
            console.log('LISTA DE TOKENS')
            console.log(data)
            tks = data.slice()
            //tokens a la tabla
            TokensTable(tks)
        }).catch(err =>  console.log(err))
    
        //Peticiones get: Traduccion
        fetch('http://localhost:3667/traduccion')
        .then(response => response.json() )
        .then(data =>  {
            console.log('TRADUCCION A PYTHON')
            tra = data[0]
            TextoTraducido = tra
        }).catch(err =>  console.log(err))
    
        //Peticiones get: Errores
        fetch('http://localhost:3667/errores')
        .then(response => response.json() )
        .then(data =>  {
            console.log('LISTA DE ERRORES')
            console.log(data)
            err = data.slice()
            ConsolaPy(err)
            ErrorsTable(err)
        }).catch(err =>  console.log(err))
    
        //Peticiones get: grafo
        fetch('http://localhost:3667/grafo')
        .then(response => response.json() )
        .then(data =>  {
            console.log('LISTA DE NODOS')
            grf = data[0]
            console.log('***************************************')
            console.log(grf)
            var salida_grafo = document.getElementById('grafo');
            d3.select(salida_grafo).graphviz().renderDot(grf); 
        }).catch(err =>  console.log(err))
    
    },1000);
    alert("Se realizó el analisis y traduccion a Python");

}

function TokensTable(Tokens) {
    let cont = 1
    let element = document.getElementById('tabla_token')
    let inner = `
        <tr>
            <td><b>NO.</b></td>
            <td><b>FILA</b></td>
            <td><b>COLUMNA<b/></td>
            <td><b>TIPO</b></td>
            <td><b>DESCRIPCION</b></td>
        </tr>
    `;
    for(let tk of Tokens){
        inner += `
        <tr>
            <td>${cont}</td>
            <td>${tk.linea}</td>
            <td>${tk.columna}</td>
            <td>${tk.nombre}</td>
            <td>${tk.texto}</td> 
        </tr>
    `;
    cont ++
    } 
    element.innerHTML = inner
}

function ErrorsTable(Errores) {
    let cont = 1
    let element = document.getElementById('tabla_error')
    let inner = `
        <tr>
            <td><b>NO.</b></td>
            <td><b>TIPO ERROR</b></td>
            <td><b>FILA</b></td>
            <td><b>COLUMNA<b/></td>
            <td><b>DESCRIPCION</b></td>
        </tr>
    `;
    for(let err of Errores){
        inner += `
        <tr>
            <td>${cont}</td>
            <td>${err.tipo}</td>
            <td>${err.linea}</td>
            <td>${err.columna}</td>
            
            <td>${err.descripcion}</td> 
        </tr>
    `;
    cont ++
    } 
    element.innerHTML = inner
}

function ConsolaJs(Error) {
    let element = document.getElementById('consol_js')
    let inner = ''
    element.innerHTML = '~$ Esta es la consola de JavaScript.'
    for(let err of Error){
        inner += '~$ Error '+err.tipo+' en la linea '+err.linea+' y columna '+err.columna+', '+err.descripcion+'\n'
    }
    element.innerHTML = inner
}

function ConsolaPy(Error) {
    let element = document.getElementById('consol_py')
    let inner = ''
    element.innerHTML = '~$ Esta es la consola de Pyhton.'
    for(let err of Error){
        inner += '~$ Error '+err.tipo+' en la linea '+err.linea+' y columna '+err.columna+', '+err.descripcion+'\n'
    }
    element.innerHTML = inner
}

function DescargarTraduccion() {
    console.log(TextoTraducido+NombreArchivo)
    let contenido = TextoTraducido;
    let name = NombreArchivo

    if(name == '' || contenido == ''){
        alert('Aun no se ha realizado ninguna traduccion!')
        return
    }

    var formato=get_vent().replace("textarea","")

    var nombre = 'output_'+formato+name


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