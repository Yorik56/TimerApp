# TimerApp

TimerApp is a simple, customizable interval timer designed for training or any task that requires structured work/rest cycles. The app is developed using **React Native** and optimized for both Android and iOS platforms.

---

## Features

- **Customizable Intervals**: Define the duration of work, rest, and the number of cycles.
- **Minimalist Interface**: A clean, user-friendly UI for quick setup and monitoring.
- **Cross-Platform**: Runs on both Android and iOS with the same codebase.
- **Real-Time Timer**: Visual countdown and cycle tracking during active sessions.

---

## Tech Stack

- **React Native**: For cross-platform mobile app development.
- **Expo**: To simplify the development and build process.
- **React Navigation**: For seamless navigation between configuration and timer screens.

---

## Prerequisites

Before setting up the project, ensure the following are installed:

### Node.js
- **Version**: The project was tested with **Node.js v22.12.0**. However, due to Expo's legacy CLI deprecation issues, we recommend **Node.js v14–16** for compatibility.
- If you need to downgrade Node.js, you can use a version manager like [NVM](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install 16
  nvm use 16
  ```

### Yarn (Recommended)
- **Version**: Yarn 1.x or 2.x
- Install globally:
  ```bash
  npm install -g yarn
  ```

### Expo CLI
- Install the new CLI locally in the project:
  ```bash
  npx create-expo-app
  ```

---

## Installation and Setup

### Steps to Run the App

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd TimerApp
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   # Or, if using npm:
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   yarn start
   # Or, if using npm:
   npm run start
   ```

4. **Launch the App**:
    - Use the Expo Go app to scan the QR code displayed in your terminal (Android/iOS).
    - Alternatively, open the app in an emulator:
      ```bash
	  yarn android  # For Android
	  yarn ios      # For iOS (requires macOS)
	  yarn web      # Runs in the browser
	  ```

---

## Building for Production

### **Android APK**:
1. Build the APK:
   ```bash
   expo build:android
   ```
2. Follow the instructions to download the APK file.

### **iOS Build**:
1. Build the iOS app:
   ```bash
   expo build:ios
   ```
2. Requires an Apple Developer account to generate and download the `.ipa` file.

### **EAS Build** (Recommended):
Expo's **EAS Build** is a modern and flexible alternative:
```bash
eas build
```
Follow [Expo's guide](https://docs.expo.dev/build/introduction/) for setup.

---

## Troubleshooting

### Common Issues

1. **Metro Bundler Error**:
    - Ensure the correct React Native version is installed.
    - Run `yarn start --reset-cache` to clear the Metro cache.

2. **Node Version Issue**:
    - Use Node.js 14–16 for legacy `expo-cli` or upgrade to the new CLI (`npx create-expo-app`).

3. **StyleSheet Error**:
    - Ensure `react-native-web` is properly installed if targeting the web:
      ```bash
	  yarn add react-native-web
	  ```

---

## Folder Structure

```
TimerApp/
│
├── App.js                    # Entry point
├── package.json              # Dependencies and scripts
├── screens/
│   ├── ConfigScreen.js       # Timer configuration screen
│   └── TimerScreen.js        # Active timer screen
├── assets/                   # Static assets (e.g., icons, images)
└── node_modules/             # Installed dependencies
```

---

## Future Improvements

1. **Add Sound Notifications**: Play alerts during transitions.
2. **Save Presets**: Allow users to save frequently used timers.
3. **Dark Mode**: Implement a dark theme for better usability.
4. **Statistics**: Track and visualize usage history.

---

## Contribution

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request with detailed information about your changes.

---

## License

This project is licensed under the **MIT License**.

