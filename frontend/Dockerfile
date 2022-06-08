FROM node
RUN npm i npm@8.11.0 -g
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./ 
RUN npm ci --no-optional && npm cache clean --force
COPY . . 
CMD ["npm", "start"]
