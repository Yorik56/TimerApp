# TimerApp

<p align="center">
  <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native" height="80"/>
  <img src="https://cdn.worldvectorlogo.com/logos/expo-1.svg" alt="Expo" height="80" style="margin: 0 20px;"/>
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" height="80"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Yarn-logo-kitten.svg/512px-Yarn-logo-kitten.svg.png?20220521160407" alt="Yarn" height="80" style="margin: 0 20px;"/>
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

### Points forts :

- **Cycles personnalisables** : Définissez la durée du travail, du repos et le nombre de cycles.
- **Notifications sonores** : Alertes configurables pour transitions.
- **Thème sombre intégré** : Un design moderne et agréable pour les yeux.
- **Compatible multi-plateforme** : Fonctionne sans problème sur Android et iOS.

## Fonctionnalités

- **Intervalles personnalisables** : Définissez la durée du travail, du repos et le nombre de cycles.
- **Notifications sonores** : Jouez des alertes personnalisées pendant les transitions.
- **Sauvegarde des préréglages** : Enregistrez des minuteurs fréquemment utilisés pour un accès rapide.
- **Mode sombre** : Une interface sombre pour une meilleure expérience visuelle.
- **Interface minimaliste** : Une interface simple et intuitive pour une configuration rapide et un suivi facile.
- **Multi-plateforme** : Compatible Android et iOS avec un seul code.
- **Minuterie en temps réel** : Compte à rebours visuel et suivi des cycles pendant les sessions actives.

## Technologies utilisées

- **React Native** : Développement mobile multiplateforme.
- **Expo** : Simplifie le développement et le processus de build.
- **React Navigation** : Pour une navigation fluide entre les écrans de configuration et de minuterie.

## Pré-requis

Avant de configurer le projet, assurez-vous d'avoir installé:

### Node.js

- **Version** : Le projet a été testé avec **Node.js v22.12.0**. Cependant, en raison de problèmes de compatibilité avec
  l'ancien CLI d'Expo, nous recommandons **Node.js v14–16**.
- Pour changer de version de Node.js, utilisez un gestionnaire de versions comme [NVM](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install 16
  nvm use 16
  ```

### Yarn (Recommandé)

- **Version** : Yarn 1.x ou 2.x
- Installez-le globalement:
  ```bash
  npm install -g yarn
  ```

### Expo CLI

- Installez le nouveau CLI localement dans le projet:
  ```bash
  npx create-expo-app
  ```

## Installation et configuration

### Étapes pour exécuter l'application

1. **Clonez le dépôt** :
   ```bash
   git clone <url-du-repository>
   cd TimerApp
   ```

2. **Installez les dépendances** :
   ```bash
   yarn install
   # Ou avec npm :
   npm install
   ```

3. **Lancez le serveur de développement** :
   ```bash
   yarn start
   # Ou avec npm :
   npm run start
   ```

4. **Lancez l'application** :
	- Utilisez l'application Expo Go pour scanner le QR code affiché dans votre terminal (Android/iOS).
	- Ou ouvrez l'application dans un émulateur:
	  ```bash
	  yarn android  # Pour Android
	  yarn ios      # Pour iOS (nécessite macOS)
	  yarn web      # Exécute dans un navigateur
	  ```

## Compilation pour la production

### **APK Android** :

1. Compilez l'APK:
   ```bash
   expo build:android
   ```
2. Suivez les instructions pour télécharger le fichier APK.

### **Build iOS** :

1. Compilez l'application iOS:
   ```bash
   expo build:ios
   ```
2. Nécessite un compte développeur Apple pour générer et télécharger le fichier `.ipa`.

### **EAS Build** (Recommandé) :

Utilisez **EAS Build** d'Expo pour une solution moderne et flexible:

```bash
eas build
```

Suivez [le guide d'Expo](https://docs.expo.dev/build/introduction/) pour la configuration.

## Dépannage

### Problèmes courants

1. **Erreur Metro Bundler** :
	- Assurez-vous d'avoir la bonne version de React Native installée.
	- Réinitialisez le cache Metro:
	  ```bash
	  yarn start --reset-cache
	  ```

2. **Problème de version de Node** :
	- Utilisez Node.js v14–16 pour l'ancien CLI d'Expo ou migrez vers le nouveau CLI:
	  ```bash
	  npx create-expo-app
	  ```

3. **Erreur avec StyleSheet** :
	- Assurez-vous que `react-native-web` est correctement installé si vous ciblez le web:
	  ```bash
	  yarn add react-native-web
	  ```

## Structure du projet

```
TimerApp/
│
├── App.js                    # Point d'entrée
├── package.json              # Dépendances et scripts
├── screens/
│   ├── ConfigScreen.js       # Écran de configuration du minuteur
│   └── TimerScreen.js        # Écran actif du minuteur
├── assets/                   # Assets statiques (icônes, images)
└── node_modules/             # Dépendances installées
```

## Améliorations futures

1. **Statistiques** : Ajouter un suivi et une visualisation de l'historique d'utilisation.
2. **Widgets** : Permettre une gestion rapide des minuteurs via des widgets sur l'écran d'accueil.
3. **Fonctionnalités avancées de notification** : Ajouter des notifications interactives ou des rappels pour démarrer
   une session.

## Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Faites un fork du dépôt.
2. Créez une nouvelle branche.
3. Soumettez une pull request avec des informations détaillées sur vos modifications.

## Licence

Ce projet est sous licence **MIT**.

