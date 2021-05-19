<template>
  <navbar></navbar>
  <br>
  <div class="home">

    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
          integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous">

    <div v-if="started && !finished">
      <div class="container mx-auto flex justify-center items-center ">
        <img class="h-72 w-auto px-4" :src="imageOne"
             alt="Bear1">


        <img class="h-72 w-auto px-4" :src="imageTwo"
             alt="Bear2">
      </div>
      <br>
      <div class="container mx-auto flex flex-col justify-center items-center ">

        <!--    <div>-->
        <!--      <label class="block text-sm font-medium text-gray-700 justify-start">Same bear ?</label>-->
        <!--      <button class="bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-300 focus:ring-white">-->
        <!--        Yes-->
        <!--      </button>-->
        <!--      <button class="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-300 focus:ring-white">-->
        <!--        No-->
        <!--      </button>-->
        <!--    </div>-->

        <div @click="decision = !decision">
          <label class="block text-sm font-medium text-gray-700 justify-start">Same bear ?</label>
          <div class="w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
               :class="{ 'bg-green-500': decision}">
            <div class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out"
                 :class="{ 'translate-x-6': decision}"></div>
          </div>
        </div>
        <br>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confidence</label>
          <input class="rounded-full overflow-hidden appearance-none bg-gray-300 h-10 w-128  outline-none slider-thumb"
                 type="range" min="1" max="100" step="1" v-model="confidence"/>
        </div>
        <br>
        <div>
          <!--      <label class="block text-sm font-medium text-gray-700">Do you know the exact identity ?</label>-->
          <!--      <div class="mt-1 relative rounded-md shadow-sm">-->
          <!--        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">-->
          <!--        </div>-->
          <!--        <input v-model="bear_name" type="text" name="identity" id="identity" class="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="Aardvark" />-->
          <!--      </div>-->
          <button @click="nextImage()"
                  class="border-2 border-green-500 rounded-lg px-3 py-2 text-green-600 cursor-pointer hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
            Next
          </button>
        </div>

      </div>
    </div>
    <div v-else-if="!started &&!finished &&paused"
         class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
  <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style="
    top: 50%;
">
    <i class="fas fa-circle-notch fa-spin fa-5x"></i>
  </span>
    </div>
    <div class="min-h-screen flex items-center justify-center  sm:px-6 lg:px-8"
         v-else-if="!started && !finished && !paused">
      <button @click="startExperiment()"
              class=" mx-auto  flex w-64 h-16 justify-center items-center bg-green-500 hover:bg-green-400 text-white  sm:text-2xl text-3xl font-bold py-2 px-4 rounded-lg focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-300 focus:ring-white">
        Start
      </button>
    </div>
    <div v-else-if="finished">
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img class="lg:w-36 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero"
               src="../../assets/bear.png">
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-8xl text-10xl mb-4 font-medium text-gray-900">All done :)</h1>
            <h2 class="title-font sm:text-2xl text-3xl mb-4 font-medium text-gray-900">Thanks {{ name }} !</h2>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script src="./home.js" lang="js"></script>

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {

  input[type="range"]::-webkit-slider-thumb {
    width: 2em;
    -webkit-appearance: none;
    appearance: none;
    height: 2rem;
    cursor: pointer;
    background: #FFF;
    box-shadow: -415px 0 0 400px #10B981, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 50%;

  }

  input[type="range"] {
    width: 400px;
  }

}
</style>

