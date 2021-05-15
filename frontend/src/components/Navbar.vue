<template>
    <nav class="bg-gradient-to-r from-primary to-secondary">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <p class="px-3 py-2 rounded-md font-medium text-white ">
                 Welcome, {{ name }}
                </p>
              </div>
            </div>
            <div class="relative flex items-center justify-center ">
              <img class="h-8 w-auto" src="../assets/bear.png"
                   alt="Bear">
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button class="px-3 py-2 rounded-md text-sm font-medium text-white  hover:bg-green-500" @click="Logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>

</template>

<script>

import firebase from "firebase";
import {onBeforeMount, ref} from "vue";

export default {
  name: 'navbar',
  computed: {},
  setup () {

    const name = ref("");
    onBeforeMount(()=> {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value= user.email.split("@")[0];
      }
    });

    const Logout = () => {
      firebase
          .auth()
          .signOut()
          .then(() => console.log("Signed out"))
          .catch(err=> alert(err.message));
    }

    return {
      name,
      Logout
    }
  },
};
</script>

<style>
</style>