<template>
  <div ref="scrollableDiv" class="no-scrollbar overflow-x-auto mx-2 sm:mx-0">
    <span v-for="country in countries"
          :key="country"
          :id="country.replace(/\s+/g, '')"
          class="text-primary"
          @mouseenter="() => $emit('country-hover', country)"
          @mouseleave="() => $emit('country-hover', null)">
      {{ country }} •
    </span>
    <span class="text-primary">???</span>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import countriesList from '../content/list/countries.json'

  const countries = ref(countriesList);

  const scrollableDiv = ref(null);
  onMounted(() => {
    // scroll to the end of the div
    if (scrollableDiv.value) {
      scrollableDiv.value.scrollLeft = scrollableDiv.value.scrollWidth;
    }
  });
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
