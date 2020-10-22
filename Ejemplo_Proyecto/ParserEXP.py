class ParserEXP:
    def __init__(self):
        self.counter = 0
        self.tabla = { 
            'E' : { 'PAbre' : "XT", 'Numero' : "XT" }, 
            'X' : { 'Signo' : "XT+", 'PCierra' : None, '$' : None },
            'T' : { 'PAbre' : "ZF", 'Numero' : "ZF" },
            'Z' : { 'SPor' : "ZF*", 'Signo' : None, 'PCierra' : None, '$' : None },
            'F' : { 'PAbre' : ")E(", 'Numero' : "i" } 
            }
        self.pila = ['$','E']
        self.Errores = []


    def obtenerMatrix(self, produccion, token):
        try:
            return self.tabla[produccion][token]
        except: 
            print("ERROR SINTACTICO")
            return "MALO"
    
    def pushear(self, producciones):
        lista = list(producciones)
        for l in lista:
            if l == "(":
                self.pila.append('PAbre')
            elif l == ")":
                self.pila.append('PCierra')
            elif l == "i":
                self.pila.append('Numero')
            elif l == "+":
                self.pila.append('Signo')
            elif l == "\-":
                self.pila.append('Signo')
            elif l == "\/":
                self.pila.append('Signo')
            elif l == "*":
                self.pila.append('SPor')
            else:
                self.pila.append(l)
 
    def Analizar(self,tokens):
        tokens.append([0,0,'$',0])
        while len(self.pila) -1 >= 0:
            self.counter = len(self.pila) -1
            var1 = self.pila[self.counter]  
            var2 = tokens[0][2]
            if var1 == var2:
                if var1 == "$":
                    # print("------------------------------------------------PILA------------------------------------------------")
                    # print(self.pila)
                    # print("------------------------------------------------BUFFER------------------------------------------------")
                    # print(tokens)
                    return True
                elif var1 == "Numero" or var1 == "PAbre" or var1 == "PCierra" or var1 == "Signo" or var1 == "SPor":
                    self.pila.pop()
                    del tokens[0]
                    # print("------------------------------------------------PILA------------------------------------------------")
                    # print(self.pila)
                    # print("------------------------------------------------BUFFER------------------------------------------------")
                    # print(tokens)
            else:
                self.pila.pop()
                val = self.obtenerMatrix(var1, var2)
                
                if val == "MALO":
                    return False
                elif val != None:
                    self.pushear(val)
            #     print("------------------------------------------------PILA------------------------------------------------")
            #     print(self.pila)
            #     print("------------------------------------------------BUFFER------------------------------------------------")
            #     print(tokens)

            # print("***********************************************************************************************************************")
