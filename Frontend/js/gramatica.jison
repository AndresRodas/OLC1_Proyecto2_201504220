/******************************EXPORTACIONES*******************************/
%{
    const Nodo = require('./nodo_arbol');
    //const Tokens = require('./Tokens');
    tk_tokens = []
    tk_errores = []
%}
/******************************LEXICO***************************************/
%lex
%options case-sensitive
%%
\s+

"{"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'LAbre'}); return 'LAbre'; %}
"}"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'LCierra'}); return 'LCierra'%}
"("                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'PAbre'}); return 'PAbre'%}
")"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'PCierra'}); return 'PCierra'%}
"++"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SInc'}); return 'SInc'%}
"--"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SDec'}); return 'SDec'%}
"+"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMas'}); return 'SMas'%}
"-"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMenos'}); return 'SMenos'%}
"*"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SPor'}); return 'SPor'%}
">="                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMayorIgual'}); return 'SMayorIgual'%}
"<="                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMenorIgual'}); return 'SMenorIgual'%}
">"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMayor'}); return 'SMayor'%}
"<"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SMenor'}); return 'SMenor'%}
"!="                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SDif'}); return 'SDif'%}
"=="                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SComp'}); return 'SComp'%}
"="                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SIgual'}); return 'SIgual'%}
"!"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Not'}); return 'Not'%}
"&&"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'And'}); return 'And'%}
"||"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Or'}); return 'Or'%}
"^"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Xor'}); return 'Xor'%}
"["                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'CAbre'}); return 'CAbre'%}
"]"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'CCierra'}); return 'CCierra'%}
","                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SComa'}); return 'SComa'%}
"."                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SPunto'}); return 'SPunto'%}
";"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Pyc'}); return 'Pyc'%}
"interface"             %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rinterfaz'}); return 'Rinterfaz'%}
"if"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rif'}); return 'Rif'%}
"else"                  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Relse'}); return 'Relse'%}
"public"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rpublic'}); return 'Rpublic'%}
"import"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rimport'}); return 'Rimport'%}
"package"               %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rpackage'}); return 'Rpackage'%}
"class"                 %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rclass'}); return 'Rclass'%}
"interfaz"              %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rinterfaz'}); return 'Rinterfaz'%}
"void"                  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rvoid'}); return 'Rvoid'%}
"int"                   %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rint'}); return 'Rint'%}
"double"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rdouble'}); return 'Rdouble'%}
"char"                  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rchar'}); return 'Rchar'%}
"String"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rstring'}); return 'Rstring'%}
"boolean"               %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rboolean'}); return 'Rboolean'%}
"for"                   %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rfor'}); return 'Rfor'%}
"while"                 %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rwhile'}); return 'Rwhile'%}
"System"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rsystem'}); return 'Rsystem'%}
"out"                   %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rout'}); return 'Rout'%}
"println"               %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rprintln'}); return 'Rprintln'%}
"print"                 %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rprint'}); return 'Rprint'%}
"do"                    %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rdo'}); return 'Rdo'%}
"break"                 %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rbreak'}); return 'Rbreak'%}
"continue"              %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rcontinue'}); return 'Rcontinue'%}
"return"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rreturn'}); return 'Rreturn'%}
"static"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rstatic'}); return 'Rstatic'%}
"main"                  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rmain'}); return 'Rmain'%}
"true"                  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rtrue'}); return 'Rtrue'%}
"false"                 %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rfalse'}); return 'Rfalse'%}
"switch"                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Rswitch'}); return 'Rswitch'%}

[0-9]+("."[0-9]+)?\b      %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Numero'}); return 'Numero'%}
[a-zA-Z]([a-zA-Z_0-9])*   %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Identificador'}); return 'Identificador'%}

"//"[\n]*                %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'ComentarioUni'});%}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'ComentarioMulti'}); %}

[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"] %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'Texto'}); return 'Texto'%}

"/"                     %{ tk_tokens.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext,nombre:'SDiv'}); return 'SDiv'%}

[ \t\n\r\f]             %{ /*ignorando*/ %}

<<EOF>>                 %{ return 'EOF'; %}

.                       %{  tk_errores.push({linea:yylloc.first_line, columna:yylloc.first_column,texto:yytext});%}
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
                $$.addTokens(tk_tokens);
                $$.addErrores(tk_errores);
                return $$;
                };

TODO : Rpublic S  TODO {$$ = new Nodo('INICIO','');
                        $$.addHijo(new Nodo($1,'Rpublic'));
                        $$.addHijo($2);
                        $$.addHijo($3);
                        }
    | LCierra {console.log('Error sintactico en linea: '+this._$.first_line + ', y columna: '+this._$.first_column)}
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
        | Rprintln PAbre MSG PCierra Pyc {$$ = new Nodo('END-PRINT','');
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
