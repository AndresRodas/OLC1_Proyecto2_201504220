# Manual Tecnico Y de Usuario

## OLC1 Seccion A
## José Andres Rodas Arrecis
###  formato markdown
>
>
>
## Introduccion y descripcion

Realizar la traducción de un lenguaje a otro puede ser algo tedioso sobre todo cuando
estamos trabajando sobre sistemas antiguos los cuales queremos replicar la
funcionalidad en otro lenguaje de programación que es más reciente o popular y del cual
encontramos mayor información y soporte técnico.

Para darle solución tenemos aquellos transpiradores que se dedican a traducir de un
lenguaje de programación a otro con el mismo nivel de dificultad para su análisis. Pero
estos están destinados a obtener un lenguaje en específico y traducirlo a únicamente otro
de salida.

## Como estudiante de la carrera de ciencias y sistemas se le pide que implemente la solución
## para crear un traductor de lenguajes en el cual tendrá como entrada un programa en un
## lenguaje fuente del cual tendrá que dar como resultado el equivalente al programa pero en 2
## lenguajes distintos. La idea central de esto es que al realizar la traducción podamos dar más
## de una opción como salida y que el usuario final pueda elegir si desea descargar
## únicamente una de las 2 opciones o incluso ambas según su necesidad.

# ANALIZADOR MANUAL y ANALIZADOR CON HERRAMIENTA

## Construccion de la lista de tokens:

## La lista de tokens se obtubo a traves de diversos estados los cuales estaban definidos por las
## expresiones regulares.

## Esta lista se le extraen los tokens de comentarios para luiego pasarselo al analisis sintactico

# Analisis sintactico
## el analisis sintactico se realizo con el metodo ll(1) para el cual se ejecuto la siguiente gramatica

INICIO	:=	Rpublic	S	INICIO									
	|	Epsilon											
													
S	:=	Rclass	Identificador	LAbre	CONTCLASS	LCierra							
	|	Rinterfaz	Identificador	LAbre	CONTINTER	LCierra							
													
CONTINTER	:=	Rpublic	TIPO	Identificador	PAbre	NEXTFUNC	PCierra	Pyc	CONTINTER				
	|	Epsilon											
													
CONTCLASS	:=	Rpublic	CCN										
	|	DECLARACION	CONTCLASS										
	|	Epsilon											
													
CCN	:=	MAIN	CONTCLASS										
	|	FUNCION	CONTCLASS										
													
MAIN	:=	Rstatic	Rvoid	Rmain	PAbre	Rstring	CAbre	CCierra	Identificador	PCierra	LAbre	INSTRUCCIONES	LCierra
													
DECLARACION	:=	Rint	Identificador	NEXTDEC									
	|	Rdouble	Identificador	NEXTDEC									
	|	Rstring	Identificador	NEXTDEC									
	|	Rchar	Identificador	NEXTDEC									
	|	Rboolean	Identificador	NEXTDEC									
													
NEXTDEC	:=	SIgual	FINDEC										
	|	Pyc											
													
FINDEC	:=	Numero	Pyc						
	|	Identificador	Pyc								
	|	Texto	Pyc	
	|	EXP Pyc						
													
FUNCION	:=	TIPO	Identificador	PAbre	NEXTFUNC	PCierra	LAbre	INSTRUCCIONES	LCierra				
													
NEXTFUNC	:=	PARAMETROS											
	|	Epsilon											
													
TIPO	:=	Rint											
	|	Rdouble											
	|	Rstring											
	|	Rchar											
	|	Rboolean											
	|	Rvoid											
													
PARAMETROS	:=	TIPO	Identificador	NEXTPARAM									
													
NEXTPARAM	:=	SComa	PARAMETROS										
	|	Epsilon											
													
INSTRUCCIONES	:=	CICLO	INSTRUCCIONES										
	|	CONTROL	INSTRUCCIONES										
	|	EXP	INSTRUCCIONES										
	|	PRINT	INSTRUCCIONES										
	|	DECLARACION	INSTRUCCIONES										
	|	Epsilon											
													
													
CICLO	:=	Rfor	PAbre	DECLARACION	Pyc	EXP	Pyc	EXP	Pyc	PCierra	LAbre	INSTRUCCIONES	LCierra
	|	Rwhile	PAbre	EXP	PCierra	LAbre	INSTRUCCIONES	LCierra					
	|	Rdo	LAbre	INSTRUCCIONES	LCierra	Rwhile	PAbre	EXP	PCierra	Pyc			
													
CONTROL	:=	Rif	PAbre	EXP	PCierra	LAbre	INSTRUCCIONES	LCierra	ELSE				
													
ELSE	:=	Relse	ELSEIF	LAbre	INSTRUCCIONES	LCierra	ELSE						
	|	Epsilon											
													
ELSEIF	:=	Rif	PAbre	EXP	PCierra								
	|	Epsilon											
													
EXP		:=	P	L'										
													
L'	:=	Or	P	L'									
	|	And	P	L'									
	|	Xor	P	L'									
	|	Epsilon											
													
P	:=	Rtrue											
	|	Rfalse											
	|	Not	EXP										
	|	R											
													
													
													
R	:=	E	R'										
													
R'	:=	SMayor	V	R'									
	|	SMenor	V	R'									
	|	SMayorIgual	V	R'									
	|	SMenorIgual	V	R'									
	|	SComp	V	R'									
	|	SDif	V	R'									
	|	Epsilon											
													
E	:=	T	E'										
													
E'	:=	SMas	SMA										
	|	SMenos	SME										
	|	Epsilon											
													
T	:=	F	T'										
													
T'	:=	SPor	F	T'									
	|	SDiv	F	T'									
	|	Epsilon											
													
F	:=	Identificador	IDN										
	|	Numero											
	|	PAbre	EXP	PCierra									
													
SMA	:=	T	E’										
	|	Smas											
													
SME	:=	T	E’										
		Smenos											
													
IDN	:=	ASIG										
	|	CALL										
	|	Epsilon											
													
ASIG	:=	SIgual	NEXTASIG	Pyc									
													
NEXTASIG	:=	Identificador											
	|	EXP											
	|	Numero											
	|	Rtrue											
	|	Rfalse											
													
CALL	:=	PAbre	NEXTCALL	PCierra	Pyc								
													
NEXTCALL	:=	RECIBE											
	|	Epsilon											
													
RECIBE	:=	Identificador	NEXTRECIBE										
	|	Numero	NEXTRECIBE										
	|	Rtrue	NEXTRECIBE										
	|	Rfalse	NEXTRECIBE										
	|	Texto	NEXTRECIBE										
													
													
NEXTRECIBE	:=	SComa	RECIBE										
	|	Epsilon											
													
PRINT	:=	Rsystem	SPunto	Rout	SPunto	SALIDA							
													
SALIDA	:=	Rprintln	PAbre	MSG	PCierra	Pyc							
	|	Rprint	PAbre	MSG	PCierra	Pyc							
													
MSG	:=	Identificador											
	|	Numero											
	|	Texto											
	|	Rtrue											
	|	Rfalse											
	|	EXP											

## Dicha gramatica fue utilizada para los dos traductores con la unica diferencia que
## para la herramienta se dejo la recursividad al momento de reconocer expresiones.




