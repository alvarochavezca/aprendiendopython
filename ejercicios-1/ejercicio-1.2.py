
#le pedimos al usuario  que nos diga una frase (o varias)
frase = input("Decirme una frase y te calculo cuanto tardaria si tuviera que decirla: ")

#creamos una lista con todas las palabras de la frase (se separan cada vez que haya un espacio en blanco)
palabras_separadas = frase.split(" ")

#usamos len() para ver la cantidad  de elementos que hay en la lista
cantidad_de_palabras = len(palabras_separadas)

#en caso de que tarde mas de un minuto en decirlo, le decimos que pare un poco
if cantidad_de_palabras > 120:
    print("para flaco tampoco de pedi un testamento")
    
#calculamos cuanto tardaria en decir las palabras y se   
print(f"dijiste{cantidad_de_palabras} palabras, y tardarias {cantidad_de_palabras/2} segundos en decirlo")
print(f"dalto lo diria en {cantidad_de_palabras * 100 // 2 * 1.3 / 100} segundos en decirlo")
    
    