// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));   // dossier front‑end

// Middleware d’auth (exemple très basique)
const AUTH_TOKEN = 'CHANGE_ME';
app.use((req, res, next) => {
  if (req.headers.authorization !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Liste des clients
app.get('/api/clients', (req, res) => {
  exec('pivpn -c list', (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });
    const clients = stdout.trim().split('\n').filter(l => l);
    res.json({ clients });
  });
});

// Créer un client
app.post('/api/clients', (req, res) => {
  const { name, password } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const cmd = `echo "${password || ''}" | sudo pivpn -a -n ${name}`;
  exec(cmd, (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Client ${name} créé` });
  });
});

// Révoquer un client
app.delete('/api/clients/:name', (req, res) => {
  const { name } = req.params;
  exec(`sudo pivpn -r -n ${name}`, (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Client ${name} révoqué` });
  });
});

// Télécharger le fichier .ovpn
app.get('/api/download/:name', (req, res) => {
  const file = path.join('/etc/openvpn/easy-rsa/pki/issued', `${req.params.name}.ovpn`);
  res.download(file);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
