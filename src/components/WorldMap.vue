<template>
  <div id="country-name" 
    class="absolute text-lg text-center capitalize px-2 bg-background bg-opacity-50 rounded-xl top-[6.6em] md:top-[4.8em] left-1/2 transform -translate-x-1/2 z-10"
  >
    {{ countryName }}
  </div>
  <svg 
    ref="svgElement" 
    class="min-h-[calc(100vh-2em)] sm:min-h-[calc(100vh-3em)]" 
    @mouseover="onHover" 
    @mouseout="onLeave">
  </svg>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import * as d3 from "d3";
import { zoom as d3Zoom } from "d3-zoom";

const svgContent = ref('');
const svgElement = ref(null);

const currentZoomLevel = ref(1);

const countryName = ref('');

onMounted(async () => {
  try {
    const response = await fetch(new URL('../assets/World.svg', import.meta.url).href);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    svgContent.value = await response.text();
    initializeZoom();
  } catch (error) {
    console.error("Fehler beim Laden der SVG:", error);
  }
});

const initializeZoom = () => {
  const svg = d3.select(svgElement.value);
  const g = svg.append("g").html(svgContent.value);

  const viewBox = [0, 0, 2754, 1398];

  svg.attr("viewBox", viewBox.join(' '));

  const onZoom = (event) => {
    g.attr("transform", event.transform);
    currentZoomLevel.value = event.transform.k;

    // Adjust the opacity of circles based on zoom level
    if (currentZoomLevel.value < 3) {
      g.selectAll("circle").style("display", null);
    } else {
      g.selectAll("circle").style("display", "none");
    }
  };

  const zoom = d3Zoom()
    .scaleExtent([1, 30])
    .translateExtent([[0, 0], [viewBox[2], viewBox[3]]])
    .on("zoom", onZoom);

  svg.call(zoom);
}

const onHover = (event) => {
  let selector;
  if (event.target.tagName === 'path' || event.target.tagName === 'circle') {
    const groupId = event.target.parentNode.id;
    const pathId = event.target.id;
    if (groupId) {
      selector = `#${groupId} path, #${groupId} circle`;
      countryName.value = document.querySelector(`#${groupId} > title`)?.textContent || '';
    } else if (pathId) {
      selector = `#${pathId}`;
      countryName.value = document.querySelector(`#${pathId} > title`)?.textContent || '';
    }

    if (selector) {
      gsap.to(selector, {
        transformOrigin: "50% 50%",
        duration: 0.2,
        ease: "power1.out",
        fill: "#F38BA3"
      });
    }
  }
}

const onLeave = (event) => {
  let selector, fillColor;
  if (event.target.tagName === 'path' || event.target.tagName === 'circle') {
    const groupId = event.target.parentNode.id;
    const pathId = event.target.id;
    if (groupId) {
      selector = `#${groupId} path, #${groupId} circle`;
      fillColor = event.target.tagName === 'path' ? "#F9F4DA" : "#c0c0c0";
    } else if (pathId) {
      selector = `#${pathId}`;
      fillColor = event.target.tagName === 'path' ? "#F9F4DA" : "#c0c0c0";
    }

    if (selector) {
      gsap.to(selector, {
        transformOrigin: "50% 50%",
        duration: 0.2,
        ease: "power1.out",
        fill: fillColor
      });
    }
  }
}
</script>