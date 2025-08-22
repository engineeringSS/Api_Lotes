# Usamos una imagen oficial de Node.js
FROM node:20-slim

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos de configuración y dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Exponemos el puerto en el que corre nuestra API
EXPOSE 8765

# El comando para iniciar la aplicación
CMD [ "node", "api_mapa.js" ]