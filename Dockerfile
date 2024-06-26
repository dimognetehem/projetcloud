# Utiliser l'image de base Node.js dernière version
FROM node:latest

# Créer le répertoire de travail de l'application dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./
#Dockerfile

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "node", "app.js" ]
