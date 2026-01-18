diccionario = {
    "nombre" : "lucas" ,
    "apelldio" : "dalto" ,
    "subs" : 1000000
}

#nos devuevle un objeto dict_item
claves = diccionario.keys()

#obteniendo un elemento con get () (no me lanza una excepcion si no encuentra nada el programa continua)
valor_de_jajsa = diccionario.get("jajsa")
print("hola papa el programa continua")

#eliminando todo el diccionario
#diccionario.clear()

#eliminando un elemento del diccionario
diccionario.pop("subs")

#obteniendo un elemento dict_items iterable
diccionario_iterable = diccionario.items()


print(diccionario_iterable)