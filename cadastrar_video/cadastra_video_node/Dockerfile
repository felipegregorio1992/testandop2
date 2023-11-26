# Use a imagem base do Node.js versão 14
FROM node:18

WORKDIR ./src/index.js

COPY package*.json ./

RUN npm install --only=production
RUN npm install -g nodemon

COPY . .

EXPOSE 5001

CMD ["npm", "start"]


