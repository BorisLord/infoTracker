# Utiliser l'image officielle Node.js LTS basée sur Alpine
FROM node:lts-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer 'serve' globalement pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port que 'serve' utilisera
EXPOSE 3000

# Lancer l'application en mode production
CMD ["serve", "-s", "dist"]
