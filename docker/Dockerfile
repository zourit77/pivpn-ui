# -------------------------------------------------
# Image de base
# -------------------------------------------------
FROM node:20-alpine

# -------------------------------------------------
# Crée un répertoire de travail
# -------------------------------------------------
WORKDIR /app

# -------------------------------------------------
# Copie les sources du serveur
# -------------------------------------------------
COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

# -------------------------------------------------
# Copie le front‑end (servi statiquement)
# -------------------------------------------------
COPY public/ ./public

# -------------------------------------------------
# Ajoute le script d’entrée
# -------------------------------------------------
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# -------------------------------------------------
# Expose le port de l’API (et du front‑end)
# -------------------------------------------------
EXPOSE 3000

# -------------------------------------------------
# Variable d’environnement par défaut
# -------------------------------------------------
ENV NODE_ENV=production
ENV AUTH_TOKEN=CHANGE_ME   # à remplacer ou à injecter via .env

# -------------------------------------------------
# Point d’entrée
# -------------------------------------------------
ENTRYPOINT ["entrypoint.sh"]

