import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
// import * as firebase from "firebase";
import firebase from "firebase"
// import "firebase/auth"
// import { firebase } from '@firebase/app'
// import '@firebase/auth'
// import firebase from "firebase/app";
// import "firebase/auth";
// import store from "./store";
// import Vuex from "vuex";
const firebaseConfig = {
    apiKey: "AIzaSyAXothiXCPqwnUr1RNxjtNEgbpv8fHUI5c",
    authDomain: "bearid.firebaseapp.com",
    projectId: "bearid",
    storageBucket: "bearid.appspot.com",
    messagingSenderId: "975913142653",
    appId: "1:975913142653:web:627293806da0ffb4512414"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


createApp(App).use(router).mount('#app')
