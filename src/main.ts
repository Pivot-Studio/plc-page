import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import route from '@/route';

createApp(App).use(route).mount('#app');
