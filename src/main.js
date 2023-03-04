import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import "./assets/scss/main.scss";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYt7LkSg9Y-Hqc4pvshUC02IIhRHyttu4",
  authDomain: "workticketgenerator.firebaseapp.com",
  projectId: "workticketgenerator",
  storageBucket: "workticketgenerator.appspot.com",
  messagingSenderId: "354520146867",
  appId: "1:354520146867:web:4489d95c994bed0e88e1c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
