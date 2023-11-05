<template>
  <div class="w-80 bg-background-accent text-primary text-center border-x-8 border-b-8 border-secondary rounded-b-3xl">
    <div>
      Next Country in
    </div>
    <div class="text-secondary font-bold text-center p-2 px-3 flex justify-between space-x-2">
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ formattedDays }}</span>
        <span class="text-sm">days</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ formattedHours }}</span>
        <span class="text-sm">hours</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ formattedMinutes }}</span>
        <span class="text-sm">minutes</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-4xl">{{ formattedSeconds }}</span>
        <span class="text-sm">seconds</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const targetTime = ref(Date.now() + 604800000); // one week from now
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

// leading 0 if number is < 10
const padNumber = (number) => number.toString().padStart(2, '0');

// calculate formatted time
const formattedDays = computed(() => padNumber(timeLeft.value.days));
const formattedHours = computed(() => padNumber(timeLeft.value.hours));
const formattedMinutes = computed(() => padNumber(timeLeft.value.minutes));
const formattedSeconds = computed(() => padNumber(timeLeft.value.seconds));

// refresh timer
const updateTimer = () => {
  const now = Date.now();
  const distance = targetTime.value - now;
  timeLeft.value.days = Math.floor(distance / (1000 * 60 * 60 * 24));
  timeLeft.value.hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  timeLeft.value.minutes = Math.floor((distance / (1000 * 60)) % 60);
  timeLeft.value.seconds = Math.floor((distance / 1000) % 60);
};

let intervalId;

onMounted(() => {
  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>