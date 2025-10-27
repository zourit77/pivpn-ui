#!/usr/bin/env sh
set -e

# -------------------------------------------------
# Vérifie que le token d’authentification est présent
# -------------------------------------------------
if [ -z "$AUTH_TOKEN" ]; then
  echo "ERROR: AUTH_TOKEN not set"
  exit 1
fi

# -------------------------------------------------
# Ajoute la règle sudoers (exécutée à chaque start)
# -------------------------------------------------
# L’utilisateur node (uid 1000) pourra lancer pivpn sans mot de passe
# Cette ligne ne crée pas de fichier permanent, elle utilise visudo en mode non‑interactif
if ! grep -q "^node ALL=(root) NOPASSWD: /usr/local/bin/pivpn *" /etc/sudoers; then
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/pivpn *" >> /etc/sudoers
fi

# -------------------------------------------------
# Démarre le serveur Node
# -------------------------------------------------
exec node server.js

