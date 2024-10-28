FROM node:18-alpine

WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application avec la variable d'environnement
RUN npm run build

# Installer 'serve' pour servir les fichiers construits
RUN npm install -g serve

# Exposer le port de l'application
EXPOSE 4000

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "4000"]
