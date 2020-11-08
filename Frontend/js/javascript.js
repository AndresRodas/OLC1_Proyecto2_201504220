//variables globales
var parser = require('./gramatica')
var express = require('express')
var cors = require('cors')

//Se definen las variables globales
var Tokens = []
var Errores = []
var grafica_ast = ''
var Traduccion = ''
var id_n = 1;

var app = express()


/*********************************ANALISIS CON JISON*********************************/
function Analizar(entrada){
    console.log('JavaScript analizer run!')

    //Se definen las variables iniciales
    Tokens = [];
    Errores = [];
    let Tokens_Js = [];
    Traduccion = '';
    grafica_ast = '';
    id_n = 1

    


    //Se realiza el analisis y se guardan los tokens y errores
    let Raiz = parser.parse(entrada)
    Tokens = Raiz.tokens.slice()
    Errores = Raiz.errores.slice()
    
    //Se grafica el AST
    grafica_ast = 'digraph G { '
    Graficar(Raiz)
    

    //se realiza la traduccion al lenguaje js
    Tokens_Js = TraducirJs(Tokens)
    for(let tk of Tokens_Js){
        Traduccion += tk + ' '
    }

}

//********************************TRADUCIR A JAVASCRIPT******************************************
function TraducirJs(Tokens) {
    let Tk_Js = []
    let tk_nuevo = ''
    let flag_class = false;

    for(var i = 0; i < Tokens.length; i++){ //se recorren todos los tokens
        switch (Tokens[i].nombre) {
            case 'Identificador'://se agrega un identificador
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'LAbre':
                tk_nuevo = Tokens[i].texto+'\n\t'
                Tk_Js.push(tk_nuevo)
                if (flag_class){
                    tk_nuevo = 'constructor(){\n\n\t}\n'
                    Tk_Js.push(tk_nuevo)
                    flag_class = false;
                }
                break;
            case 'LCierra':
                tk_nuevo = Tokens[i].texto+'\n'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rpublic':
                if (Tokens[i+1].nombre != 'Rclass' && Tokens[i+1].nombre != 'Rinterface'){
                    tk_nuevo = 'function'
                    Tk_Js.push(tk_nuevo)
                    i++
                }
                break;
            case 'Rclass':
                flag_class = true
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rinterface':
                flag_class = true
                tk_nuevo = 'class'
                Tk_Js.push(tk_nuevo)
                break;
            case 'PAbre':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'PCierra':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Numero':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'ComentarioUni':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'ComentarioMulti':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'And':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Or':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break; 
            case 'Not':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Xor':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break; 

            case 'Rbreak':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Pcontinue':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break; 
            case 'Preturn':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;

            case 'Rstring':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rint':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rboolean':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rchar':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rfloat':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rdouble':
                tk_nuevo = 'var'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rmain':
                tk_nuevo = 'Main'
                Tk_Js.push(tk_nuevo)
                main = true;
                break;
            case 'Pyc':
                tk_nuevo = Tokens[i].texto+'\n\t'
                Tk_Js.push(tk_nuevo)
                break;
            case 'SIgual':
                tk_nuevo = '='
                Tk_Js.push(tk_nuevo)
                break;
            case 'SComa':
                tk_nuevo = ','
                Tk_Js.push(tk_nuevo)
                break;
            case 'SPunto':
                tk_nuevo = '.'
                Tk_Js.push(tk_nuevo)
                break;
            case 'SPor':
                tk_nuevo = '*'
                Tk_Js.push(tk_nuevo)
                break;
            case 'SDiv':
                tk_nuevo = '\/'
                Tk_Js.push(tk_nuevo)
                break;
            case 'SMas':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SMenos':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SMayor':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
            case 'SMenor':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SMayorIgual':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SMenorIgual':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SComp':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'SDif':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
                        
            case 'Rfor':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rwhile':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rdo':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            
            case 'Rtrue':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rfalse':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;   

            case 'Rif':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Relse':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;   
            case 'Texto':
                tk_nuevo = Tokens[i].texto
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rsystem':
                tk_nuevo = 'console'
                Tk_Js.push(tk_nuevo)
                break;
            case 'Rout':
                tk_nuevo = 'log'
                Tk_Js.push(tk_nuevo)
                if (Tokens[i+1].nombre == 'SPunto') i++
                break;
            default:
                break;
        }
    } 

    return Tk_Js
}

//se grafica el AST
function Graficar(nodo){
    
    if (nodo != undefined){
        if (nodo.tipo == 'Texto') nodo.valor = 'Texto'
        console.log(nodo.valor)
        if(nodo.id == 0){
            nodo.id = id_n;
            id_n ++
        }
        /*id [label= valor fillcolor="#d62728" shape="circle"]*/
        grafica_ast += nodo.id + '[label= "'+ nodo.valor + '" ];'
        //console.log(nodo.id + '[label= "'+ nodo.valor + '" ];')
        if (nodo.hijos != undefined){
            nodo.hijos.forEach(element => {
                grafica_ast += nodo.id + '->' + id_n + ';'
                //console.log(nodo.id + '->' + id_n + ';')
                Graficar(element);
            });
        }   
    }
}

// aqui se inicializa el servidor
app.use(cors())
app.use(express.json({ limit: '5mb'})) 

app.listen(3666, function () {
    console.log('Server JavaScript on port: 3666')
})

//post, nos mandan la entrada
app.post('/', async (req, res) => {
    console.log('I got a Post!')
    console.log(req.body.texto)
    Tokens = []
    await Analizar(req.body.texto)
}) 

//responder con Tokens 
app.get('/tokens', async function (req, res) {
    //aqui se le manda lo que querramos
    console.log('********************TOKENS*******************')
    console.log(Tokens)
    res.send(Tokens)
    console.log('Sending Tokens')
})

//responder con errores 
app.get('/errores', async function (req, res) {
    //aqui se le manda lo que querramos
    res.send(Errores)
    console.log('Sending Errors')
})

//responder con traduccion 
app.get('/traduccion', async function (req, res) {
    //aqui se le manda lo que querramos
    let traduc = [Traduccion]
    res.send(traduc)
    console.log('Sending Traduction')
})

//responder con grafo de dot 
app.get('/grafo', async function (req, res) {
    //aqui se le manda lo que querramos
    grafica_ast = grafica_ast + ' }'
    let traduc = [grafica_ast]
    res.send(traduc)
    console.log(traduc[0])
    console.log('Sending graph')
})