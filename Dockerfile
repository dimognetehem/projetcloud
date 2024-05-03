# Utiliser l'image de base Node.js 18.17.1
FROM node:latest

# Créer le répertoire de travail de l'application dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./
#Dockerfile

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "node", "app.js" ]
