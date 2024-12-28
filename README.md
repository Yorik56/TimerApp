# TimerApp

<p align="center">
  <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native" height="80"/>
  <img src="https://cdn.worldvectorlogo.com/logos/expo-1.svg" alt="Expo" height="80" style="margin: 0 20px;"/>
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" height="80"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Yarn-logo-kitten.svg/512px-Yarn-logo-kitten.svg.png" alt="Yarn" height="80" style="margin: 0 20px;"/>
</p>

<p align="center">
  <b>TimerApp</b> est une application de minuterie par intervalles entièrement personnalisable.<br/>
  Idéal pour les entraînements ou toute activité nécessitant des cycles travail/repos.<br/>
  Développée avec <b>React Native</b> et optimisée pour Android et iOS.
</p>

<p align="center">
  <a href="https://reactnative.dev/">
    <img alt="React Native" src="https://img.shields.io/badge/React%20Native-v0.76.5-blue?style=flat-square&logo=react"/>
  </a>
  <a href="https://expo.dev/">
    <img alt="Expo" src="https://img.shields.io/badge/Expo-v52.0.23-brightgreen?style=flat-square&logo=expo"/>
  </a>
  <a href="https://nodejs.org/">
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v16.20.0-green?style=flat-square&logo=node.js"/>
  </a>
  <a href="https://yarnpkg.com/">
    <img alt="Yarn" src="https://img.shields.io/badge/Yarn-1.x-blueviolet?style=flat-square&logo=yarn"/>
  </a>
</p>

---

### Points forts :

- **Cycles personnalisables** : Définissez la durée du travail, du repos et le nombre de cycles.
- **Notifications sonores** : Alertes configurables pour transitions.
- **Thème sombre intégré** : Un design moderne et agréable pour les yeux.
- **Compatible multi-plateforme** : Fonctionne sans problème sur Android et iOS.

---

### Fonctionnalités :

- **Intervalles personnalisables** : Définissez la durée du travail, du repos et le nombre de cycles.
- **Notifications sonores** : Jouez des alertes personnalisées pendant les transitions.
- **Sauvegarde des préréglages** : Enregistrez des minuteurs fréquemment utilisés pour un accès rapide.
- **Mode sombre** : Une interface sombre pour une meilleure expérience visuelle.
- **Interface minimaliste** : Une interface simple et intuitive pour une configuration rapide et un suivi facile.
- **Multi-plateforme** : Compatible Android et iOS avec un seul code.
- **Minuterie en temps réel** : Compte à rebours visuel et suivi des cycles pendant les sessions actives.

---

## Technologies utilisées

- **React Native** : Développement mobile multiplateforme.
- **Expo** : Simplifie le développement et le processus de build.
- **React Navigation** : Pour une navigation fluide entre les écrans de configuration et de minuterie.

---

## Pré-requis

### Node.js

- **Version** : Le projet utilise **Node.js v16.x**.
- Utilisez un gestionnaire comme [NVM](https://github.com/nvm-sh/nvm) pour changer de version :
  ```bash
  nvm install 16
  nvm use 16
  ```

### Yarn (Recommandé)

- **Version** : Yarn 1.x ou 2.x
- Installez Yarn globalement :
  ```bash
  npm install -g yarn
  ```

### Expo CLI

- Installez Expo CLI localement dans le projet :
  ```bash
  npx create-expo-app
  ```

---

## Installation et configuration

1. **Clonez le dépôt** :
   ```bash
   git clone <url-du-repository>
   cd TimerApp
   ```

2. **Installez les dépendances** :
   ```bash
   yarn install
   ```

3. **Lancez le serveur de développement** :
   ```bash
   yarn start
   ```

4. **Lancez l'application** :
	- Scannez le QR code dans Expo Go (Android/iOS).
	- Ou ouvrez dans un émulateur :
	  ```bash
	  yarn android
	  yarn ios      # Nécessite macOS
	  yarn web
	  ```

---

## Compilation pour la production

### APK Android

1. Compilez l'APK :
   ```bash
   expo build:android
   ```

2. Téléchargez l'APK via Expo.

### iOS Build

1. Compilez pour iOS :
   ```bash
   expo build:ios
   ```
2. Nécessite un compte développeur Apple pour générer le fichier `.ipa`.

---

## Structure du projet

```
TimerApp/
│
├── App.js                    # Point d'entrée
├── package.json              # Dépendances
├── screens/
│   ├── ConfigScreen.js       # Écran de configuration
│   └── TimerScreen.js        # Minuterie active
├── assets/                   # Fichiers statiques
└── node_modules/             # Dépendances installées
```

---

## Améliorations futures

1. **Widgets** : Gestion rapide via widgets.
2. **Statistiques** : Historique des sessions.
3. **Notifications interactives** : Ajouter des rappels automatiques.

---

## Contribution

Contribuez en 3 étapes :

1. Faites un fork.
2. Créez une branche.
3. Soumettez une PR avec une description claire.

---

## Licence

Sous licence **MIT**.