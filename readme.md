# Sisema para reunir fallecidos

Está pensado para ser usado en la [misión Lavalle del Movimiento Vida en Gracia](https://mision-mvg.blogspot.com) en la cual se hace una misa en el cementerio y se nombra a todos los fallecidos que los lugareños nos indican. Generalmente son muchos y es necesario reunir rapidamente la información y detectar y eliminar repetidos.

# Instrucciones de uso

## Parte en la que se necesita conexión a internet
1. Instalar node y git (en Windows se descargan los instaladores como con cualquier otro programa, en Android se pueden instalar utilizando Termux).
2. Clonar este repositorio e instalar dependencias.

```
git clone https://github.com/soyyo5159/fallecidos
cd fallecidos
npm install 
```

## Parte en la que **no** se necesita conexión a internet
3. Conectar el celular o PC a una red wifi. (Puede ser una red wifi de un celular que funcione como punto de acceso, incluso si el mismo no tiene conexión de datos)
4. Iniciar el servidor
```
npm start
```
5. Desde el mismo PC o celular desde el que se ejecutó ese comando, abrir en un navegador la dirección `localhost:3000` (si, es una url).
6. Luego de conectarse a la misma red wifi que el servidor, el resto se conectan por medio de la url que figura en la parte superior de la página `localhost:3000` (que debería ser algo como `192.108.0.24:3000`) (si, es una url).

# Notas
Se puede cerrar y volver a abrir el servidor sin problemas, ya que la base de datos es persistente.

La descarga del pdf puede demorar un poco en empezar.

Este es un software que no está pensado para ser seguro, sino para exponerse a una pequeña red LAN de gente bienintencionada.
