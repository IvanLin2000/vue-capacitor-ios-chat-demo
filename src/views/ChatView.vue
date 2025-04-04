<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { Keyboard } from '@capacitor/keyboard';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const chatName = route.query.name || 'Chat';

const messages = ref([
	{
		text: 'Hey! How\'s your day going?',
		sender: 'other',
		timestamp: '10:00'
	},
	{
		text: 'Pretty good! Just had some amazing coffee',
		sender: 'me',
		timestamp: '10:01'
	},
	{
		text: 'Oh nice! What kind of coffee?',
		sender: 'other',
		timestamp: '10:02'
	},
	{
		text: 'A caramel latte with extra foam, it was perfect!',
		sender: 'me',
		timestamp: '10:03'
	},
	{
		text: 'That sounds delicious! I might get one later too',
		sender: 'other',
		timestamp: '10:04'
	},
	{
		text: 'You should! The weather is perfect for a warm drink',
		sender: 'me',
		timestamp: '10:05'
	},
	{
		text: 'True! It\'s been so chilly lately',
		sender: 'other',
		timestamp: '10:06'
	},
	{
		text: 'Yeah, I had to dig out my winter coat yesterday',
		sender: 'me',
		timestamp: '10:07'
	},
	{
		text: 'Same here! Do you have any weekend plans?',
		sender: 'other',
		timestamp: '10:08'
	},
	{
		text: 'Not much, probably just relax and catch up on some shows',
		sender: 'me',
		timestamp: '10:09'
	},
	{
		text: 'Sounds like a perfect weekend to me!',
		sender: 'other',
		timestamp: '10:10'
	}
]);

const newMessage = ref('');
const keyboardHeight = ref(0);
const contentRef = ref(null);

const handleKeyboardWillShow = (info) => {
	keyboardHeight.value = info.keyboardHeight;
};

const handleKeyboardWillHide = () => {
	keyboardHeight.value = 0;
};

const goBack = () => {
	router.back();
};

onMounted(() => {
	Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
	Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);
});

onUnmounted(() => {
	Keyboard.removeAllListeners();
});
</script>

<template>
	<ion-page>
		<ion-content :fullscreen="false" class="ion-padding" ref="contentRef">
			<div class="header">
				<button class="back-button" @click="goBack">
					<div> < </div>
				</button>
				<h1 class="chat-title">{{ chatName }}</h1>
			</div>

			<div class="messages-container" :style="{ transform: `translateY(-${keyboardHeight}px)` }">
				<div v-for="(message, index) in messages" :key="index" 
					 :class="['message', message.sender === 'me' ? 'my-message' : 'other-message']">
					<div class="message-content">
						{{ message.text }}
					</div>
					<div class="message-time">
						{{ message.timestamp }}
					</div>
				</div>
			</div>

			<div class="input-container" :style="{ transform: `translateY(-${keyboardHeight}px)` }">
				<input
					v-model="newMessage"
					placeholder="Type a message..."
				/>
			</div>
		</ion-content>
	</ion-page>
</template>

<style scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 60px;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding: 0 16px;
	padding-top: env(safe-area-inset-top);
	z-index: 1000;
	border-bottom: 1px solid #e0e0e0;
}

.back-button {
	background: none;
	border: none;
	padding: 8px;
	margin-right: 16px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #007bff;
}

.chat-title {
	margin: 0;
	font-size: 18px;
	font-weight: 600;
	color: #333;
}

.messages-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 0 16px;
	padding-bottom: calc(56px + env(safe-area-inset-bottom));
	margin-top: calc(60px + env(safe-area-inset-top));
	min-height: calc(100vh - calc(60px + env(safe-area-inset-top)) - calc(56px + env(safe-area-inset-bottom)));
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	transition: transform 0.3s ease;
	will-change: transform;
}

.message {
	max-width: 70%;
	padding: 10px;
	border-radius: 10px;
	margin: 5px 0;
}

.my-message {
	align-self: flex-end;
	background-color: #007bff;
	color: white;
	margin-right: 8px;
}

.other-message {
	align-self: flex-start;
	background-color: #f1f1f1;
	color: black;
	margin-left: 8px;
}

.message-time {
	font-size: 0.7em;
	opacity: 0.7;
	margin-top: 5px;
}

.input-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	padding: 8px 16px;
	padding-bottom: calc(8px + env(safe-area-inset-bottom));
	background-color: white;
	border-top: 1px solid #e0e0e0;
	transition: transform 0.3s ease;
	will-change: transform;
}

input {
	flex: 1;
	height: 40px;
	padding: 0 16px;
	border: 1px solid #e0e0e0;
	border-radius: 20px;
	font-size: 16px;
	outline: none;
	background-color: #f1f1f1;
}
</style>
