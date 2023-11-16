<template>
  <div
    :class="{'max-h-[23em] sm:max-h-[20em] w-full sm:w-[30em]': expanded, 'max-h-14 w-44': !expanded }"
    class="transition-all duration-400 ease-in-out bg-background-accent py-2 px-4 justify-between rounded-tr-xl md:rounded-t-xl"
  >
    <div class="flex text-accent font-bold text-xl cursor-pointer" @click="toggle">
      <span>Newsletter</span>
      <span v-if="!expanded">&nbsp;&uarr;</span>
      <span v-if="expanded">&nbsp;&darr;</span>
    </div>

    <div v-show="expanded" class="mt-2 flex flex-col">
      <span>
        Learning about the wold gets you <span class="text-lg font-bold">excited</span>? 🎉 <br><br>
        Once per week I send out a 5-10 minute read about a new country.
        Put your email below to get the next one! <br><br>
      </span>
      <input type="text" placeholder="Your email 📩" class="text-background w-full p-2 rounded-md border-2 border-primary focus:outline-secondary">
      <button class="bg-secondary rounded-md p-2 mt-3 focus:outline-primary mb-3">Subscribe</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const expanded = ref(false);

const toggle = () => {
  expanded.value = !expanded.value;
};
</script>
