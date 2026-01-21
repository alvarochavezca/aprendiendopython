#creando un conjunto con set()
conjunto = set(["dato 1"])

#metiendo un conjunto dentro de otro conjunto
conjunto1 = frozenset(["dato 1", "dato 2 "])
conjunto2 = {conjunto1,"dato 3"}
print(conjunto2)

#teoria de conjuntos

conjunto1 = {1,3,5,7}
conjunto2 = {1,3,7}

#verificando si es un subconjunto
resultado = conjunto2.issubset(conjunto1)
resultado = conjunto2 <= conjunto1

#verificando si  es un superconjunto
resultado = conjunto2.issubset(conjunto1)
resultado = conjunto2 > conjunto1

#verificar si hay algun numero en comun
resultado = conjunto2.isdisjoint(conjunto1)

print(resultado)