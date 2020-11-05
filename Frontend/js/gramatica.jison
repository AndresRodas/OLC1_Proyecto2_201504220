/******************************EXPORTACIONES*******************************/
%{
    //const Tokens = require('./javascript');
    const Nodo = require('./nodo_arbol');
    //const Recorrer = require('./recorrer_arbol');
    /*

EXP : P LP ;

LP : Or P LP
    | And P LP
    | Xor P LP
    | ;
    
R : E RP;

RP : SMayor E RP
    | SMenor E RP
    | SMayorIgual E RP
    | SMenorIgual E RP
    | SComp E RP 
    | SDif E RP 
    | ;

E : T EP;

EP : SMas SMA
    | SMenos SME
    | ;
    
T :  F TP ;

TP : SPor F TP
    | SDiv F TP
    | ;

SMA : T EP
    | SMas ;

SME : T EP
    | SMenos ;

    */
%}
/******************************LEXICO***************************************/
%lex
%options case-sensitive
%%
\s+

"{"                     %{ return 'LAbre'; %}
"}"                     %{ return 'LCierra'%}
"("                     %{ return 'PAbre'%}
")"                     %{ return 'PCierra'%}
"++"                     %{ return 'SInc'%}
"--"                     %{ return 'SDec'%}
"+"                     %{ return 'SMas'%}
"-"                     %{ return 'SMenos'%}
"*"                     %{ return 'SPor'%}
">="                     %{ return 'SMayorIgual'%}
"<="                     %{ return 'SMenorIgual'%}
">"                     %{ return 'SMayor'%}
"<"                     %{ return 'SMenor'%}
"!="                     %{ return 'SDif'%}
"=="                     %{ return 'SComp'%}
"="                     %{ return 'SIgual'%}
"!"                     %{ return 'Not'%}
"&&"                     %{ return 'And'%}
"||"                     %{ return 'Or'%}
"^"                     %{ return 'Xor'%}

"["                     %{ return 'CAbre'%}
"]"                     %{ return 'CCierra'%}
","                     %{ return 'SComa'%}
"."                     %{ return 'SPunto'%}
";"                     %{ return 'Pyc'%}

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
"String"                  %{ return 'Rstring'%}
"boolean"                  %{ return 'Rboolean'%}
"for"                  %{ return 'Rfor'%}
"while"                  %{ return 'Rwhile'%}
"System"                  %{ return 'Rsystem'%}
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
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  %{ console.log(yytext); return 'ComentarioMulti'%}

[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"] %{ console.log(yytext); return 'Texto'%}

"/"                     %{ return 'SDiv'%}

[ \t\n\r\f]             %{ /*ignorando*/ %}

<<EOF>>                 %{ return 'EOF'; %}

.                       %{  console.log('Error: '+yytext+', en linea: '+yylloc.first_line+', y col: '+yylloc.first_column);%}
/lex


%left Or And Xor Not
%left SMayor SMenor SMayorIgual SMenorIgual SDif SComp
%left SMas SMenos SInc SDec 
%left SPor SDiv
%left PAbre PCierra
%left LAbre LCierra

%start INICIO
%%

INICIO : TODO EOF {$$ = new Nodo('RAIZ','');
                $$.addHijo($1);
                //let temp = new Recorrer($$);
                
                return $$;
                };

TODO : Rpublic S  TODO {$$ = new Nodo('INICIO','');
                        $$.addHijo(new Nodo($1,'Rpublic'));
                        $$.addHijo($2);
                        $$.addHijo($3);
                        }
    | error LCierra {console.log('Error sintactico en linea: '+this._$.first_line + ', y columna: '+this._$.first_column)}
    | ;
        
S : Rclass Identificador LAbre CONTCLASS LCierra {$$ = new Nodo('S','');
                                                $$.addHijo(new Nodo($1,'Rinterfaz'));
                                                $$.addHijo(new Nodo($2,'Identificador'));
                                                $$.addHijo(new Nodo($3,'LAbre'));
                                                $$.addHijo($4);
                                                $$.addHijo(new Nodo($5,'LCierra'));
                                                }
    | Rinterfaz Identificador LAbre CONTINTER LCierra {$$ = new Nodo('S','');
                                                    $$.addHijo(new Nodo($1,'Rinterfaz'));
                                                    $$.addHijo(new Nodo($2,'Identificador'));
                                                    $$.addHijo(new Nodo($3,'LAbre'));
                                                    $$.addHijo($4);
                                                    $$.addHijo(new Nodo($5,'LCierra'));
                                                    };

CONTINTER : Rpublic TIPO Identificador PAbre NEXTFUNC PCierra Pyc CONTINTER {$$ = new Nodo('CONTINTER','');
                                                                            $$.addHijo(new Nodo($1,'Rpublic'));
                                                                            $$.addHijo($2);
                                                                            $$.addHijo(new Nodo($3,'Identificador'));
                                                                            $$.addHijo(new Nodo($4,'PAbre'));
                                                                            $$.addHijo($5);
                                                                            $$.addHijo(new Nodo($6,'PCierra'));
                                                                            $$.addHijo(new Nodo($7,'Pyc'));
                                                                            $$.addHijo($8);
                                                                            }
            | ;

CONTCLASS :  Rpublic CCN {$$ = new Nodo('CONTCLASS','');
                            $$.addHijo(new Nodo($1,'Rpublic'));
                            $$.addHijo($2);
                            }
            | DECLARACION CONTCLASS{$$ = new Nodo('CONTCLASS','');
                                    $$.addHijo($1);
                                    $$.addHijo($2);
                                    }
            | ;

CCN : MAIN CONTCLASS {$$ = new Nodo('CCN','');
                    $$.addHijo($1);
                    $$.addHijo($2);
                    }
    | FUNCION CONTCLASS{$$ = new Nodo('CCN','');
                        $$.addHijo($1);
                        $$.addHijo($2);
                        };

MAIN : Rstatic Rvoid Rmain PAbre Rstring CAbre CCierra Identificador PCierra LAbre INSTRUCCIONES LCierra {$$ = new Nodo('MAIN','');
                                                                                                        $$.addHijo(new Nodo($1,'Rstatic'));
                                                                                                        $$.addHijo(new Nodo($2,'Rvoid'));
                                                                                                        $$.addHijo(new Nodo($3,'Rmain'));
                                                                                                        $$.addHijo(new Nodo($4,'PAbre'));
                                                                                                        $$.addHijo(new Nodo($5,'Rstring'));
                                                                                                        $$.addHijo(new Nodo($6,'CAbre'));
                                                                                                        $$.addHijo(new Nodo($7,'CCierra'));
                                                                                                        $$.addHijo(new Nodo($8,'Identificador'));
                                                                                                        $$.addHijo(new Nodo($9,'PCierra'));
                                                                                                        $$.addHijo(new Nodo($10,'LAbre'));
                                                                                                        $$.addHijo($11);
                                                                                                        $$.addHijo(new Nodo($12,'LCierra'));
                                                                                                        };

DECLARACION : Rint Identificador NEXTDEC {$$ = new Nodo('DECLARACION','');
                                        $$.addHijo(new Nodo($1,'Rint'));
                                        $$.addHijo(new Nodo($2,'Identificador'));
                                        $$.addHijo($3);
                                        }
            | Rdouble Identificador NEXTDEC {$$ = new Nodo('DECLARACION','');
                                        $$.addHijo(new Nodo($1,'Rdouble'));
                                        $$.addHijo(new Nodo($2,'Identificador'));
                                        $$.addHijo($3);
                                        }
            | Rstring Identificador NEXTDEC {$$ = new Nodo('DECLARACION','');
                                        $$.addHijo(new Nodo($1,'Rstring'));
                                        $$.addHijo(new Nodo($2,'Identificador'));
                                        $$.addHijo($3);
                                        }
            | Rchar Identificador NEXTDEC {$$ = new Nodo('DECLARACION','');
                                        $$.addHijo(new Nodo($1,'Rchar'));
                                        $$.addHijo(new Nodo($2,'Identificador'));
                                        $$.addHijo($3);
                                        }
            | Rboolean Identificador NEXTDEC {$$ = new Nodo('DECLARACION','');
                                        $$.addHijo(new Nodo($1,'Rboolean'));
                                        $$.addHijo(new Nodo($2,'Identificador'));
                                        $$.addHijo($3);
                                        };

NEXTDEC : SIgual FINDEC {$$ = new Nodo('NEXT-DEC','');
                        $$.addHijo(new Nodo($1,'SIgual'));
                        $$.addHijo($2);
                        }
        | Pyc {$$ = new Nodo('NEXT-DEC','');
            $$.addHijo(new Nodo($1,'Pyc'));
            };

FINDEC : EXP Pyc {$$ = new Nodo('FIN-DEC','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,'Pyc'));
                }
        | Texto Pyc{$$ = new Nodo('FIN-DEC','');
                $$.addHijo(new Nodo($1,'Texto'));
                $$.addHijo(new Nodo($2,'Pyc'));
                };

FUNCION : TIPO Identificador PAbre NEXTFUNC PCierra LAbre INSTRUCCIONES LCierra {$$ = new Nodo('FUNCION','');
                                                                                $$.addHijo($1);
                                                                                $$.addHijo(new Nodo($2,'Identificador'));
                                                                                $$.addHijo(new Nodo($3,'PAbre'));
                                                                                $$.addHijo($4);
                                                                                $$.addHijo(new Nodo($5,'PCierra'));
                                                                                $$.addHijo(new Nodo($6,'LAbre'));
                                                                                $$.addHijo($7);
                                                                                $$.addHijo(new Nodo($8,'LCierra'));
                                                                                };

NEXTFUNC : PARAMETROS {$$ = new Nodo('NEXT-FUNC','');
                       $$.addHijo($1);
                       }
            | ;

TIPO : Rint {$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rint'));}
    | Rdouble{$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rdouble'));}
    | Rstring{$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rstring'));}
    | Rchar{$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rchar'));}
    | Rboolean{$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rboolean'));}
    | Rvoid {$$ = new Nodo('FUNCION','');
            $$.addHijo(new Nodo($1,'Rvoid'));
            };

PARAMETROS : TIPO Identificador NEXTPARAM {$$ = new Nodo('PARAMETROS','');
                                        $$.addHijo($1);
                                        $$.addHijo(new Nodo($2,''));
                                        $$.addHijo($3);
                                        };

NEXTPARAM : SComa PARAMETROS {$$ = new Nodo('NEXT-PARAM','');
                                $$.addHijo(new Nodo($1,''));
                                $$.addHijo($2);
                                }
            | ;

INSTRUCCIONES : CICLO INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo($1);
                                    $$.addHijo($2);
                                    }
                | CONTROL INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo($1);
                                    $$.addHijo($2);
                                    }
                | EXP Pyc INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo($1);
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    }
                | PRINT INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo($1);
                                    $$.addHijo($2);
                                    }
                | DECLARACION INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo($1);
                                    $$.addHijo($2);
                                    }
                | Rreturn EXP Pyc INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo($2);
                                    $$.addHijo(new Nodo($3,''));
                                    $$.addHijo($4);
                                    }
                | Rbreak Pyc INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    }
                | Rcontinue Pyc INSTRUCCIONES {$$ = new Nodo('INSTRUCCIONES','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    }
                | ;

CICLO : Rfor PAbre DECLARACION EXP Pyc EXP PCierra LAbre INSTRUCCIONES LCierra {$$ = new Nodo('CICLO','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    $$.addHijo($4);
                                    $$.addHijo(new Nodo($5,''));
                                    $$.addHijo($6);
                                    $$.addHijo(new Nodo($7,''));
                                    $$.addHijo(new Nodo($8,''));
                                    $$.addHijo($9);
                                    $$.addHijo(new Nodo($10,''));
                                    }
        | Rwhile PAbre EXP PCierra LAbre INSTRUCCIONES LCierra {$$ = new Nodo('CICLO','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    $$.addHijo(new Nodo($4,''));
                                    $$.addHijo(new Nodo($5,''));
                                    $$.addHijo($6);
                                    $$.addHijo(new Nodo($7,''));
                                    }
        | Rdo LAbre INSTRUCCIONES LCierra Rwhile PAbre EXP PCierra Pyc {$$ = new Nodo('CICLO','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    $$.addHijo(new Nodo($4,''));
                                    $$.addHijo(new Nodo($5,''));
                                    $$.addHijo(new Nodo($6,''));
                                    $$.addHijo($7);
                                    $$.addHijo(new Nodo($8,''));
                                    $$.addHijo(new Nodo($9,''));
                                    };

CONTROL : Rif PAbre EXP PCierra LAbre INSTRUCCIONES LCierra ELSE {$$ = new Nodo('CONTROL','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo(new Nodo($2,''));
                                    $$.addHijo($3);
                                    $$.addHijo(new Nodo($4,''));
                                    $$.addHijo(new Nodo($5,''));
                                    $$.addHijo($6);
                                    $$.addHijo(new Nodo($7,''));
                                    $$.addHijo($8);
                                    };

ELSE : Relse ELSEIF LAbre INSTRUCCIONES LCierra ELSE {$$ = new Nodo('ELSE','');
                                    $$.addHijo(new Nodo($1,''));
                                    $$.addHijo($2);
                                    $$.addHijo(new Nodo($3,''));
                                    $$.addHijo($4);
                                    $$.addHijo(new Nodo($5,''));
                                    $$.addHijo($6);
                                    }
        | ;

ELSEIF : Rif PAbre EXP PCierra {$$ = new Nodo('ELSEIF','');
                                $$.addHijo(new Nodo($1,''));
                                $$.addHijo(new Nodo($2,''));
                                $$.addHijo($3);
                                $$.addHijo(new Nodo($4,''));
                                }
        | ;



EXP : EXP Or EXP {$$ = new Nodo('EXP','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | EXP And EXP {$$ = new Nodo('EXP','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | EXP Xor EXP {$$ = new Nodo('EXP','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | P {$$ = new Nodo('EXP','');
                $$.addHijo($1);
                }; 

P : Not EXP {$$ = new Nodo('P','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
    | R {$$ = new Nodo('P','');
                $$.addHijo($1);
                }; 

R : R SMayor R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | R SMenor R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | R SMayorIgual R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | R SMenorIgual R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | R SComp R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | R SDif R {$$ = new Nodo('R','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | E {$$ = new Nodo('R','');
                $$.addHijo($1);
                };

E : E SMas E {$$ = new Nodo('E','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | E SMenos E {$$ = new Nodo('E','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | E SInc {$$ = new Nodo('E','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                }
    | E SDec {$$ = new Nodo('E','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                }
    | T {$$ = new Nodo('E','');
                $$.addHijo($1);
                };

T : T SPor T {$$ = new Nodo('T','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | T SDiv T {$$ = new Nodo('T','');
                $$.addHijo($1);
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                }
    | F {$$ = new Nodo('T','');
                $$.addHijo($1);
                };

F : Identificador IDN {$$ = new Nodo('F','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
    | Numero {$$ = new Nodo('F','');
                $$.addHijo(new Nodo($1,''));
                }
    | PAbre EXP PCierra {$$ = new Nodo('F','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                $$.addHijo(new Nodo($3,''));
                }
    | Rtrue {$$ = new Nodo('F','');
                $$.addHijo(new Nodo($1,''));
                }
    | Rfalse {$$ = new Nodo('F','');
                $$.addHijo(new Nodo($1,''));
                };

IDN : SIgual EXP Pyc {$$ = new Nodo('IDNT','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                $$.addHijo(new Nodo($3,''));
                }
    | PAbre NEXTCALL PCierra {$$ = new Nodo('IDNT','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                $$.addHijo(new Nodo($3,''));
                }
    | ;

NEXTCALL : RECIBE {$$ = new Nodo('NEXT-CALL','');
                $$.addHijo($1);
                }
        | ;

RECIBE : Identificador NEXTRECIBE {$$ = new Nodo('RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
        | Numero NEXTRECIBE {$$ = new Nodo('RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
        | Rtrue NEXTRECIBE {$$ = new Nodo('RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
        | Rfalse NEXTRECIBE {$$ = new Nodo('RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
        | Texto NEXTRECIBE {$$ = new Nodo('RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                };

NEXTRECIBE : SComa RECIBE {$$ = new Nodo('NEXT-RECIBE','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo($2);
                }
            | ;

PRINT : Rsystem SPunto Rout SPunto SALIDA {$$ = new Nodo('PRINT','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo(new Nodo($2,''));
                $$.addHijo(new Nodo($3,''));
                $$.addHijo(new Nodo($4,''));
                $$.addHijo($5);
                };

SALIDA : Rprint PAbre MSG PCierra Pyc {$$ = new Nodo('END-PRINT','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                $$.addHijo(new Nodo($4,''));
                $$.addHijo(new Nodo($5,''));
                } 
        | Rprintln PAbre MSG PCierra PyC {$$ = new Nodo('END-PRINT','');
                $$.addHijo(new Nodo($1,''));
                $$.addHijo(new Nodo($2,''));
                $$.addHijo($3);
                $$.addHijo(new Nodo($4,''));
                $$.addHijo(new Nodo($5,''));
                } ;

MSG : Texto {$$ = new Nodo('MSG','');
                $$.addHijo(new Nodo($1,''));
                } 
    | EXP  {$$ = new Nodo('MSG','');
                $$.addHijo($1);
                } ;
