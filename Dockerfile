# Decidir sobre que imagen correr nuestra app
FROM node:16-slim 

USER root
RUN buildDeps="g++ make python" \ 
    && apt-get update -qq \
    && apt-get install -qy --no-install-recommends curl $buildDeps

# Configura nuestro entorno de Node, tanto "production" o "development"
# Por default se configura como "production", pero docker-compose sobre escribe
# esa configuración al momento de construir las imágenes
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Configura el puerto por default a que sea el 8000
ARG PORT=8000
ENV PORT $PORT

# Muy probablemente vas a querer utilizar la última versió de npm, independientement de la 
# versión de Node que estes utilizando. Esto ayuda en velocidad y performance. Pero se
# muy especīfico en la versión que vayas a utilizar. 
RUN npm i npm@8.11.0 -g

# Instala dependencias, pero antes hay que colocarlas en una localización diferente para un
# "bind mounting" más sencillo y compatible con el desarrollo en local. 
# Debido a la naturaleza de los permisos de la carpeta /opt necesitamos crear la carpeta
# donde estará nuestro código con el usuario root y luego cambiar los persmisos al usuario node
RUN mkdir -p /opt/node_app/node_modules && chown -R node:node /opt/node_app
WORKDIR /opt/node_app

# La imagen oficial de Node provee un usuario sin privilegios de administrador como una buena
# práctica de seguridad, pero tenemos que activarlo de forma manual. Los ponemos aquí para que las 
# instalaciones de dependencias que hace npm las haga con el mismo usuario que corre la app.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY package*.json ./ 

# Instala dependencias con npm y posteriormente limpia el cache
RUN npm ci --no-optional && npm cache clean --force

# Borra binarios de instalación que ya no se van a necesitar posterior a la instalacion de dependencias
USER root 
RUN apt-get remove -y --purge --auto-remove $buildDeps \
     && rm -rf /var/lib/apt/lists/* /tmp/* /root/.node-gyp /usr/local/lib/node_modules/npm/node_modules/node-gyp
USER node

# Agrega nuestros node_modules al PATH del sistema
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY . . 

CMD ["node", "server/index.js"]
