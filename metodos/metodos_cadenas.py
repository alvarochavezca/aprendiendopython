cadena1 = "Hola,Maquina,Como,Estas"
cadena2 = "bienvenido maquinola"

#convierte a u mayusculas
mayusc = cadena1.upper() 

#convierte a minusuculas
minusc = cadena1.lower()

#primera letra en mayuscula
primera_letra_mayusc = cadena1.capitalize()

#buscamos una cadena en otra cadena, si no hay conincidencia devuelve -1
busqueda_find = cadena1.find("o")

#buscamos una cadena en otra cadena, si no hay una coincidencia lanza una excepcion
busqueda_index = cadena1.index("o")

#si es numerico, devolvemos true, sino devolvemos false
es_numerico = cadena1.isnumeric()

#si es alfanumerico devolvemos true, sino devolvemos false
es_alfanumerico = cadena1.isalpha()

#contamos las coincidencias de una cadena dentro de otra cadena, devuelve la cantidad de conincidencias
contar_conincidencia = cadena1.count("a")

#contamos cuantos caracteres tiene una cadena
contar_caracteres = len(cadena1)

#verificamos si una cadena empieza con otra cadena dada, si es asi devuelve true
empieza_con = cadena1.startswith("hola")

#verificamos si una cadena termina con otra cadena dada, si es asi devuelve true
termina_con = cadena1.endswith("hola")

#si el valor 1, se encuentra en la cadena original, remplaza el valor 1 de la misma, por el valor 2
cadena_nueva = cadena1.replace(","," ")

#separar cadenas con la cadena que le pasemos
cadena_separada = cadena1.split(",")

print(cadena_separada[0])