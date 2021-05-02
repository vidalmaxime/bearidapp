<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="Register">
        <div class="rounded-md shadow-sm -space-y-px">
          <!--      <input type="text" placeholder="Email address" v-model="email"/>-->
          <!--      <input type="password" placeholder="Password" v-model="password"/>-->
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                   placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                   placeholder="Password">
          </div>
        </div>
        <div>
          <button type="submit" value="Register" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
            Register
          </button>
        </div>
        <div>
          <p class="mt-2 text-center text-sm text-gray-600">Have an account?
            <router-link to="/login" class ="text-black">Login Here</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { ref } from 'vue';

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(user => {
        alert(user);
      })
      .catch(err => alert(err.message));
    }

    return {
      Register,
      email,
      password
    }

  }
}

</script>

<style>

</style>