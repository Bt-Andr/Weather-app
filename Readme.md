# App Météo en Temps Réel

Une application web moderne affichant la météo actuelle et les prévisions sur 5 jours, utilisant l'API OpenWeatherMap. Développée en HTML, CSS et JavaScript vanilla, elle met en avant des compétences en intégration d'APIs REST, gestion d'erreurs, interface responsive avec CSS Grid/Flexbox, et fonctionnalités avancées comme la géolocalisation et le mode sombre.

![Capture d'écran de l'app](meteo.png)(meteo_darkMode.png) <!-- Remplace par une vraie image si tu en as une -->

## 🚀 Fonctionnalités

- **Météo actuelle** : Température, icône, description, humidité, vent, pression, lever/coucher du soleil.
- **Prévisions sur 5 jours** : Grille interactive avec températures et descriptions.
- **Géolocalisation automatique** : Détection GPS pour charger la météo sans saisie.
- **Toggle unités** : Basculement entre Celsius et Fahrenheit.
- **Mode sombre** : Thème clair/sombre avec persistance via localStorage.
- **Stockage local** : Sauvegarde de la dernière ville recherchée.
- **Gestion d'erreurs** : Messages spécifiques pour API invalide, ville introuvable, etc.
- **Interface moderne** : Design responsive, animations de fade-in, spinner de chargement.
- **PWA (Progressive Web App)** : Installable, cache offline pour une expérience app-like.

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique et accessible.
- **CSS3** : Mise en page avec Grid/Flexbox, variables CSS pour thèmes, transitions.
- **JavaScript (ES6+)** : Fetch API pour appels asynchrones, géolocalisation, localStorage, service worker.
- **API Externe** : [OpenWeatherMap](https://openweathermap.org/) (clé gratuite requise).
- **Outils** : Manifest.json pour PWA, service worker pour cache.

## 📦 Installation et Configuration

1. **Clone ou télécharge le repo** : git clone https://github.com/ton-username/weather-app.git
cd weather-app

2. **Obtiens une clé API gratuite** :
- Inscris-toi sur [OpenWeatherMap](https://openweathermap.org/).
- Va dans "API Keys" et copie ta clé.
- Remplace `'YOUR_API_KEY'` dans `app.js` par ta clé réelle.

3. **Ouvre l'app** :
- Double-clique sur `index.html` ou sers via un serveur local (ex: `python -m http.server`).
- Pour PWA, utilise un serveur HTTPS (requis pour la géolocalisation/installation).

## 🎯 Utilisation

- **Recherche** : Entre une ville et clique "Rechercher".
- **Géolocalisation** : Autorise le GPS au premier chargement pour météo auto.
- **Toggle unités** : Clique "°F" pour Fahrenheit.
- **Mode sombre** : Clique l'icône lune/soleil en haut.
- **Offline** : Les fichiers sont cachés ; recharge pour météo récente si connecté.

## 📸 Captures d'Écran

- **Mode Clair** : Interface lumineuse avec météo Paris.
- **Mode Sombre** : Thème sombre activé.
- **Mobile** : Design responsive sur téléphone.

## 🚀 Déploiement

- **GitHub Pages** : Push le code, active Pages dans Settings > Pages.
- **Netlify/Vercel** : Drag-and-drop le dossier pour déploiement instantané.
- Lien démo : [https://ton-site.netlify.app](https://ton-site.netlify.app)  <!-- Remplace par ton lien -->

## 🤝 Contribution

Contributions bienvenues ! Fork le repo, crée une branche, et soumets une PR. Respecte les bonnes pratiques (commits clairs, tests si possible).

## 📄 Licence

MIT License - Libre d'utilisation pour projets personnels/éducatifs.

## 👨‍💻 Auteur

[Ton Nom] - [Ton LinkedIn/GitHub] - [Ton Email]

---

*Projet réalisé pour enrichir un portfolio de développement web front-end.*

