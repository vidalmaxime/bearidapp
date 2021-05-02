<template>
  <div class="bg-gradient-to-r from-primary to-secondary h-screen w-screen sm:px-8 md:px-16 sm:py-8" id="app">
    <div class="relative h-full flex flex-col bg-white shadow-xl rounded-md" @dragover="dragover" @dragleave="dragleave"
         @drop="drop">
      <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
             class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file"
             accept=".mp4,.avi,.mov"/>
      <label for="assetsFieldHandle" class="block cursor-pointer">
        <div v-if="empty && novideo"
             class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
          <i>
            <svg class="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24"
                 height="24" viewBox="0 0 24 24">
              <path
                  d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"/>
            </svg>
          </i>
          <p class="text-lg text-blue-700">Drop {{ $route.params.animal }} video to upload</p>
        </div>
        <div v-if="!empty && novideo"
             class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
          <svg class="animate-spin h-10 w-10 mr-3 bg-pink-600" viewBox="0 0 24 24">
          </svg>
        </div>
        <div v-else>

        </div>
      </label>
      <!--      <ul class="mt-4" v-if="this.filelist.length" v-cloak>-->
      <!--        <li class="text-sm p-1" v-for="file in filelist">-->
      <!--          ${ file.name }<button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
  </div>
</template>


<script src="./inference.js" lang="ts"></script>
<!--<style src="./inference.css" lang="css"></style>-->

