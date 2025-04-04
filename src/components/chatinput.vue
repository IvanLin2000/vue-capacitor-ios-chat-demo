<template>
    <div class="app-container" @click="handleContainerClick">
      <!-- 頂部聊天名稱 -->
      <div class="chat-header">
        <h1>聊天室</h1>
      </div>
  
      <!-- 中間的聊天內容區域 -->
      <div class="chat-content">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message-bubble', message.isMe ? 'me' : 'other']">
          <div class="message-content">{{ message.text }}</div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>
  
      <!-- 底部輸入框 -->
      <div class="input-container">
        <input 
          type="text" 
          v-model="message" 
          placeholder="輸入訊息..."
          @focus="handleFocus"
          @blur="handleBlur"
          @click.stop
        />
        <button @click.stop>發送</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import { Keyboard } from '@capacitor/keyboard';
  
  const message = ref('');
  const keyboardHeight = ref(0);
  const isKeyboardVisible = ref(false);
  const messages = ref([
    { text: '你好！', time: '10:00', isMe: false },
    { text: '嗨！最近好嗎？', time: '10:01', isMe: true },
    { text: '還不錯，你呢？', time: '10:02', isMe: false },
    { text: '我也很好，謝謝關心！', time: '10:03', isMe: true },
    { text: '今天天氣真好', time: '10:04', isMe: false },
    { text: '是啊，適合出去走走', time: '10:05', isMe: true },
    { text: '要不要一起去公園？', time: '10:06', isMe: false },
    { text: '好啊，幾點見？', time: '10:07', isMe: true },
    { text: '下午兩點如何？', time: '10:08', isMe: false },
    { text: '沒問題，到時候見！', time: '10:09', isMe: true },
    { text: '好的，到時候見！', time: '10:10', isMe: false },
  ]);
  
  const adjustViewForKeyboard = () => {
    const inputContainer = document.querySelector('.input-container');
    if (inputContainer) {
      inputContainer.style.transform = `translateY(-${keyboardHeight.value}px)`;
    }
  };
  
  const handleFocus = async () => {
    await Keyboard.show();
  };
  
  const handleBlur = async () => {
    // 不立即隱藏鍵盤，讓點擊事件處理
  };
  
  const handleContainerClick = () => {
    if (isKeyboardVisible.value) {
      Keyboard.hide();
      const input = document.querySelector('input');
      if (input) {
        input.blur();
      }
    }
  };
  
  const scrollToBottom = () => {
    const chatContent = document.querySelector('.chat-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  };
  
  onMounted(() => {
    Keyboard.addListener('keyboardWillShow', (info) => {
      keyboardHeight.value = info.keyboardHeight;
      isKeyboardVisible.value = true;
      document.body.classList.add('keyboard-visible');
      document.documentElement.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
      adjustViewForKeyboard();
      nextTick(() => {
        scrollToBottom();
      });
    });
  
    Keyboard.addListener('keyboardWillHide', () => {
      keyboardHeight.value = 0;
      isKeyboardVisible.value = false;
      document.body.classList.remove('keyboard-visible');
      document.documentElement.style.setProperty('--keyboard-height', '0px');
      adjustViewForKeyboard();
    });
  
    nextTick(() => {
      scrollToBottom();
    });
  });
  
  onBeforeUnmount(() => {
    Keyboard.removeAllListeners();
    document.body.classList.remove('keyboard-visible');
  });
  </script>
  
  <style>
  :root {
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
    --safe-area-left: env(safe-area-inset-left);
    --safe-area-right: env(safe-area-inset-right);
    
    --header-height: 60px;
    --input-height: 68px;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: var(--safe-area-top) var(--safe-area-right) var(--safe-area-bottom) var(--safe-area-left);
  }
  
  .chat-header {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    text-align: center;
    position: sticky;
    top: var(--safe-area-top);
    z-index: 1;
    height: var(--header-height);
  }
  
  .chat-header h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .chat-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  
  .message-bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
  }
  
  .message-bubble.me {
    background-color: #4CAF50;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  
  .message-bubble.other {
    background-color: white;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  
  .message-time {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: 4px;
    text-align: right;
  }
  
  .input-container {
    display: flex;
    padding: 16px;
    background-color: white;
    border-top: 1px solid #e0e0e0;
    z-index: 1;
    height: var(--input-height);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  
  .input-container input {
    flex: 1;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    margin-right: 8px;
    font-size: 16px;
    outline: none;
    background-color: #f5f5f5;
  }
  
  .input-container button {
    padding: 12px 24px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    height: 44px;
  }
  
  .input-container button:active {
    background-color: #45a049;
  }
  
  /* 鍵盤彈出時的樣式 */
  .keyboard-visible .chat-content {
    transform: translateY(calc(-1 * var(--keyboard-height)));
    padding-bottom: calc(var(--input-height) + var(--keyboard-height) + 16px);
  }
  
  .keyboard-visible .input-container {
    transform: translateY(calc(-1 * var(--keyboard-height)));
  }
  </style>
  