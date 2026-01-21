#creando un diccionario con dict()
diccionario = dict(nombres="lucas",apellido="dalto")

#las listas no pueden ser claves y usamos frozenset para meter conjuntos
diccionario = {frozenset(["dalto","rancio"]):"JAJAJA"}

#creando diccionarios con fromkeys() valor por defecto: none
diccionario = dict.fromkeys(["nombre","apellido"])

#creando diccionarios con fromkeys() cambiando el valor por defecto por "no se"
diccionario = dict.fromkeys(["nombre","apellido"],"no se")


print(diccionario)