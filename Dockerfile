# Utiliza una imagen base con Node.js
FROM node:14.17.3

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install --force

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación (por defecto, 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación cuando el contenedor se inicie
ENTRYPOINT [ "npm" ]
CMD ["start"]