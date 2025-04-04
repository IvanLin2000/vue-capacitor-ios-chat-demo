<script setup>
import { useRouter } from 'vue-router'
import { IonPage, IonContent } from '@ionic/vue'

const router = useRouter()

const people = [
  { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Diana', avatar: 'https://i.pravatar.cc/150?img=4' },
]

const goToChat = (name) => {
  router.push({ path: '/chat', query: { name } })
}
</script>


<template>
  <ion-page>
		<ion-content class="ion-padding" :fullscreen="false">
			<div class="chat-list">
				<div v-for="(person, index) in people" :key="index" class="chat-item">
					<button @click="goToChat(person.name)" class="chat-button">
						<div class="chat-item-content">
							<img :src="person.avatar" alt="avatar" class="avatar" />
							<span class="name">{{ person.name }}</span>
						</div>
					</button>
				</div>
			</div>
		</ion-content>
  </ion-page>
</template>



<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: env(safe-area-inset-top);
  margin: 0 auto;
}

.chat-item {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.chat-item:last-child {
  border-bottom: none;
}

.chat-button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: transparent;
  outline: none;
  border-radius: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: none;
}

.chat-item-content {
  display: flex;
  align-items: center;
  width: 100%;
	background: transparent;
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
	
}

.name {
  font-size: 16px;
  font-weight: bold;
}
</style>
