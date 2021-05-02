<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import home from './views/home/home.vue'
import {onBeforeMount} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import firebase from 'firebase';
export default {
  name: 'app',
  setup () {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user)=>{
        if (!user) {
          router.replace('/login');
        } else if (route.path === "/login" || route.path === "/register") {
          router.replace('/')
        }
      });
    });
  },
  components: {
    home
  }
}
</script>
