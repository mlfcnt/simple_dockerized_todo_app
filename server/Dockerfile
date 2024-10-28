# Utiliser une image bun officielle comme image de base
FROM oven/bun:1

# Définir le répertoire de travail à /app
WORKDIR /app

# Copier package.json et bun.lockb
COPY package.json bun.lockb ./

# Installer les dépendances
RUN bun i

# Copier le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["bun", "run", "src/index.ts"]