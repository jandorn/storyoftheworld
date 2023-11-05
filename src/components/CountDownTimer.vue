<template>
  <div class="w-40 md:w-80 bg-background-accent text-primary text-center border border-x-8 border-b-8 border-secondary rounded-b-3xl">
    <div>
      Next Country in
    </div>
    <div class="text-secondary font-bold text-center p-2 px-3 flex justify-between space-x-2">
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ timeLeft.days }}</span>
        <span class="text-sm">days</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ timeLeft.hours }}</span>
        <span class="text-sm">hours</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ timeLeft.minutes }}</span>
        <span class="text-sm">minutes</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ timeLeft.seconds }}</span>
        <span class="text-sm">seconds</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const targetTime = ref(new Date().getTime() + 604800000); // one week in ms
    const timeLeft = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    function updateTime() {
      const now = new Date().getTime();
      const distance = targetTime.value - now;

      timeLeft.value.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      timeLeft.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      timeLeft.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft.value.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }

    // timer update
    let interval = null;
    onMounted(() => {
      interval = setInterval(updateTime, 1000);
    });

    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });

    return { timeLeft };
  }
};
</script>