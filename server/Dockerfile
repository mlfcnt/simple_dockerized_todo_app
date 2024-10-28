# Utiliser une image bun officielle comme image de base
FROM oven/bun:1

# Définir le répertoire de travail à /app
WORKDIR /app

# Copier package.json et bun.lockb
COPY package.json bun.lockb ./

# Définir la variable d'environnement pour la base de données
ENV DB_FILE_NAME=file:/app/data/simple_sqlite_db.db

# Installer les dépendances
RUN bun i

# Installer SQLite3
RUN apt-get update && apt-get install -y sqlite3

# Copier le reste de l'application
COPY . .

# Exécuter la commande drizzle-kit pour créer la base de données
RUN bunx drizzle-kit push --config=drizzle.config.ts

# Exposer le port de l'application
EXPOSE 4000

# Démarrer l'application
CMD ["bun", "run", "src/index.ts"]
