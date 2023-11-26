# Use a imagem base do Node.js versão 14
FROM node:18

WORKDIR ./src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


