/******************************EXPORTACIONES*******************************/
%{
    const Tokens = require('./javascript');
    
%}
/******************************LEXICO***************************************/
%lex
%options case-insensitive
%%
\s+

"{"                     %{ Tokens.push(yylloc.first_line) ; console.log('adsd'); return 'LAbre'; %}
"}"                     %{ return 'LCierra'%}
"("                     %{ return 'PAbre'%}
")"                     %{ return 'PCierra'%}
"+"                     %{ return 'SMas'%}
"-"                     %{ return 'SMenos'%}
"/"                     %{ return 'SDiv'%}
"*"                     %{ return 'SPor'%}
">"                     %{ return 'SMayor'%}
"<"                     %{ return 'SMenor'%}
">="                     %{ return 'SMayorIgual'%}
"<="                     %{ return 'SMenorIgual'%}
"="                     %{ return 'SIgual'%}
"!"                     %{ return 'Not'%}
"++"                     %{ return 'SInc'%}
"--"                     %{ return 'SDec'%}
"&&"                     %{ return 'And'%}
"||"                     %{ return 'Or'%}
"^"                     %{ return 'Xor'%}
"!="                     %{ return 'SDif'%}
"=="                     %{ return 'SComp'%}
"["                     %{ return 'CAbre'%}
"]"                     %{ return 'CCierra'%}
","                     %{ return 'SComa'%}
"."                     %{ return 'SPunto'%}

"interface"             %{ return 'Rinterfaz'%}
"if"                    %{ return 'Rif'%}
"else"                  %{ return 'Relse'%}
"public"                %{ return 'Rpublic'%}
"import"                %{ return 'Rimport'%}
"package"               %{ return 'Rpackage'%}
"class"                 %{ return 'Rclass'%}
"interfaz"              %{ return 'Rinterfaz'%}
"void"                  %{ return 'Rvoid'%}
"int"                  %{ return 'Rint'%}
"double"                  %{ return 'Rdouble'%}
"char"                  %{ return 'Rchar'%}
"string"                  %{ return 'Rstring'%}
"boolean"                  %{ return 'Rboolean'%}
"for"                  %{ return 'Rfor'%}
"while"                  %{ return 'Rwhile'%}
"system"                  %{ return 'Rsystem'%}
"out"                  %{ return 'Rout'%}
"println"                  %{ return 'Rprintln'%}
"print"                  %{ return 'Rprint'%}
"do"                  %{ return 'Rdo'%}
"break"                  %{ return 'Rbreak'%}
"continue"                  %{ return 'Rcontinue'%}
"return"                  %{ return 'Rreturn'%}
"static"                  %{ return 'Rstatic'%}
"main"                  %{ return 'Rmain'%}
"true"                  %{ return 'Rtrue'%}
"false"                  %{ return 'Rfalse'%}
"switch"                  %{ return 'Rswitch'%}

[0-9]+("."[0-9]+)?\b      %{ return 'Numero'%}
[a-zA-Z]([a-zA-Z_0-9])*   %{ return 'Identificador'%}

"//"[\n]*                %{ yytext.substr(1,yyleng); return 'ComentarioUni'%}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  %{ yytext; return 'ComentarioMulti'%}

[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"] %{ yytext; return 'Texto'%}

[ \t\n\r\f]             %{ /*ignorando*/ %}

<<EOF>>                 %{ return 'EOF'; %}

.                       %{  console.log('Error: '+yytext+', en linea: '+yylloc.first_line+', y col: '+yylloc.first_column);                        %}
/lex

%start INICIO
%%

INICIO : TODO EOF ;

TODO : Rpublic S  TODO
        | ;
        
S : Rclass Identificador LAbre CONTCLASS LCierra
    | Rinterfaz Identificador LAbre CONTINTER LCierra ;

CONTINTER : Identificador ;

CONTCLASS : Identificador ;