# -------------------------------------------------
# Image de base
# -------------------------------------------------
FROM node:20-alpine

# -------------------------------------------------
# Répertoire de travail dans le conteneur
# -------------------------------------------------
WORKDIR /app

# -------------------------------------------------
# Copier uniquement les fichiers de dépendances
# -------------------------------------------------
# - package.json  (obligatoire)
# - package-lock.json (facultatif, améliore la reproductibilité)
COPY server/package*.json ./

# -------------------------------------------------
# Installer les dépendances en mode production
# -------------------------------------------------
RUN npm install --omit=dev

# -------------------------------------------------
# Copier le reste du code serveur
# -------------------------------------------------
COPY server/ ./

# -------------------------------------------------
# Copier le front‑end statique
# -------------------------------------------------
COPY public/ ./public

# -------------------------------------------------
# Script d’entrée
# -------------------------------------------------
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# -------------------------------------------------
# Port exposé
# -------------------------------------------------
EXPOSE 3000

# -------------------------------------------------
# Variables d’environnement
# -------------------------------------------------
ENV NODE_ENV=production
ENV AUTH_TOKEN=motdepasse

# -------------------------------------------------
# Point d’entrée
# -------------------------------------------------
ENTRYPOINT ["entrypoint.sh"]
