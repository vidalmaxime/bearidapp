<template>
  <navbar></navbar>
  <br>
  <div class="home">

    <div v-if="started">
    <div class="container mx-auto flex justify-center items-center ">
      <img class="h-72 w-auto px-4" :src="image_one"
           alt="Bear1" >


    <img class="h-72 w-auto px-4" :src="image_two"
         alt="Bear2">
    </div>
  <br>

  <div class="container mx-auto flex flex-col justify-center items-center ">

    <div>
      <label class="block text-sm font-medium text-gray-700 justify-start">Same bear ?</label>
      <button class="bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-300 focus:ring-white">
        Yes
      </button>
      <button class="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-300 focus:ring-white">
        No
      </button>
    </div>
    <br>
    <div>
      <label class="block text-sm font-medium text-gray-700">Confidence</label>
    <input class="rounded-lg overflow-hidden appearance-none bg-gray-300 h-3 w-128" type="range" min="1" max="100" step="1" v-model="value"/>
    </div>
    <br>
      <div>
      <label class="block text-sm font-medium text-gray-700">Do you know the exact identity ?</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        </div>
        <input v-model="bear_name" type="text" name="identity" id="identity" class="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="Aardvark" />
      </div>
        <button @click="nextImage()" class="mx-auto my-5 flex justify-center items-center bg-green-500 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-300 focus:ring-white"> Next </button>
    </div>

  </div>

  </div>
    <div v-else>
      <button @click="startExperiment()" class=" mx-auto my-5 flex justify-center items-center bg-green-500 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-300 focus:ring-white"> Start</button>
    </div>
  </div>
</template>

<script src="./home.js" lang="js"></script>

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {

  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: pointer;
    background: #FFF;
    box-shadow: -405px 0 0 400px #00bd5c;
    border-radius: 50%;

  }
}
</style>

