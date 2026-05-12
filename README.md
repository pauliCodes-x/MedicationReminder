# 💊 Medication Reminder App

Aplicación móvil desarrollada con React Native + Expo.

Permite registrar usuarios y administrar recordatorios simples de medicación utilizando almacenamiento local y notificaciones.

---

## 🚀 Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Expo Notifications

---

## 📱 Funcionalidades

### 🔐 Autenticación
- Registro de usuario
- Login local
- Validación simple de credenciales
- Persistencia con AsyncStorage

### 💊 Medicaciones
- Agregar medicaciones
- Mostrar lista de medicaciones
- Eliminar medicaciones
- Persistencia local

### 🔔 Notificaciones
- Recordatorios locales utilizando expo-notifications
- Notificación automática luego de crear una medicación

---

## 📂 Estructura del proyecto

```txt
MedicationReminder/
│
├── components/
│   └── MedicationCard.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── screens/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   └── AddMedicationScreen.tsx
│
├── navigation/
│   └── AppNavigator.tsx
│
├── App.tsx
└── package.json

## ⚙️ Requisitos

Tener instalado:

- Node.js
- npm
- Expo CLI
- Android Studio (opcional para emulador)

---

## 📥 Instalación

npx expo install expo-notifications
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-screens react-native-safe-area-context

npx expo start