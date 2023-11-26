# Use a imagem oficial do Node.js como imagem base
FROM node:19

# Defina o diretório de trabalho no contêiner
WORKDIR src/app

# Copie o arquivo package.json e package-lock.json (ou yarn.lock) para o contêiner
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie todos os arquivos do aplicativo para o contêiner
COPY . .

# Construa o aplicativo React
RUN npm run build

# Expõe a porta 3001 para o aplicativo
EXPOSE 3000

# Inicia o servidor web para servir o aplicativo React
CMD ["npm", "start"]

