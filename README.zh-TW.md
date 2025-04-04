# Vue Capacitor iOS 聊天模板

[English](./README.md)

專注於實現原生 iOS 般流暢體驗的 Vue + Capacitor 模板，展示如何在混合應用中實現流暢動畫和原生般體驗。

## 展示

https://raw.githubusercontent.com/IvanLin2000/vue-capacitor-ios-chat-demo/main/public/video.mp4

功能展示：
- 流暢的鍵盤動畫
- 原生般的右滑返回手勢
- 順暢的介面轉場效果

## 核心依賴

```json
"@capacitor/keyboard": "^5.0.0"
"@ionic/vue": "^7.0.0"
"@ionic/vue-router": "^7.0.0"
```

## 主要特點

- **原生級鍵盤處理**
  - 流暢的鍵盤滑動動畫
  - 輸入框跟隨鍵盤移動
  - 訊息列表自動調整位置

- **iOS 手勢支援**
  - 右滑返回功能
  - 自然動量滾動
  - 原生觸控反饋

- **UI/UX 細節**
  - 安全區域支援
  - 流暢轉場效果
  - iOS 風格元件

## 快速開始

### 環境需求
- Node.js
- npm/yarn
- Xcode (用於 iOS)

```bash
# 克隆專案
git clone https://github.com/IvanLin2000/vue-capacitor-ios-chat-demo.git
cd vue-capacitor-ios-chat-demo

# 安裝
npm install

# 開發
npm run dev

# iOS
npm run build
npx cap add ios
npx cap open ios
```

## 專案結構

```
src/
├── views/
│   └── ChatView.vue    # 主要聊天介面
├── App.vue
└── main.js
```

## 實作細節

### 鍵盤處理
模板使用 Capacitor 的 Keyboard API 實現流暢的鍵盤動畫，確保輸入框和訊息列表能自然地回應鍵盤事件。

### 導航手勢
實現了與 iOS 原生行為相匹配的右滑返回導航，為 iOS 用戶提供無縫的使用體驗。

### UI 元件
所有 UI 元件都遵循 iOS 的設計慣例和行為，包括正確的安全區域處理和原生般的動畫效果。

## 授權

MIT 