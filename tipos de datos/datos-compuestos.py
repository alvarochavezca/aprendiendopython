
#creando una lista (se pueden modificar)
lista = ["Lucas Dalto","Soy Dalto",True,1.85, "Soy Dalto"]

#creando una tupla (no se pueden modificar)
tupla = ("Lucas Dalto","Soy Dalto",True,1.85, "Soy Dalto")

#esto es valido
lista[3] = "maquinola"

#esto no
#tupla[3] = "maquinola"


#creando un conjunto (set) (no se accede a elementos por su indice,no almacena datos duplicados)
conjunto = {"Lucas Dalto","Soy Dalto",True,1.85, "Soy Dalto"}

#print(conjunto [3]) -> no puede acceder al elemento

#creando un diccionario (dict) (la estructura es key : value y separamos con comas)
diccionario = {
    "nombre" : "Lucas Dalto",
    "canal" : "Soy Dalto",
    "esta_emocionado" : True,
    "altura" : 1.85,
    "dato_duplicado" : "Soy Dalto"  
    
}

print(diccionario["altura"] + 2)
print(lista[1])


lista[1] = "Soy Anderson"
print(lista)