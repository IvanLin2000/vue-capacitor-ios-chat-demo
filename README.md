# Vue Capacitor iOS Chat Demo

[繁體中文](./README.zh-TW.md)

A Vue + Capacitor template focusing on native iOS-like smooth interactions, especially for chat interfaces. This template demonstrates how to achieve fluid animations and native-like experience in hybrid apps.

## Demo

![Image](https://github.com/user-attachments/assets/7933c2aa-b91c-4a41-868c-4dc5b0be51d4)

## Core Dependencies

```json
"@capacitor/keyboard": "^5.0.0"
"@ionic/vue": "^7.0.0"
"@ionic/vue-router": "^7.0.0"
```

## Key Features

- **Native-like Keyboard Handling**
  - Smooth keyboard slide animations
  - Input field follows keyboard movement
  - Message list auto-adjusts with keyboard

- **iOS Gesture Support**
  - Right-edge swipe to go back
  - Natural momentum scrolling
  - Native-like touch feedback

- **UI/UX Details**
  - Safe area aware layout
  - Smooth transitions
  - iOS-style components

## Quick Start

### Prerequisites
- Node.js
- npm/yarn
- Xcode (for iOS)

```bash
# Clone
git clone https://github.com/IvanLin2000/vue-capacitor-ios-chat-demo.git
cd vue-capacitor-ios-chat-demo

# Install
npm install

# Dev
npm run dev

# iOS
npm run build
npx cap add ios
npx cap open ios
```

## Project Structure

```
src/
├── views/
│   └── ChatView.vue    # Main chat interface
├── App.vue
└── main.js
```

## Implementation Details

### Keyboard Handling
The template implements smooth keyboard animations using Capacitor's Keyboard API, ensuring the input field and message list respond naturally to keyboard events.

### Navigation Gestures
Right-edge swipe navigation is implemented to match iOS's native behavior, providing a seamless experience for iOS users.

### UI Components
All UI components are designed to respect iOS conventions and behaviors, including proper safe area handling and native-like animations.

## License

MIT
