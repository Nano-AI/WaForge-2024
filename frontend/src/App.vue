<script setup>
import Item from './components/Item.vue';
import Loader from './components/Loader.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

const camera = ref(null);

const status = ref("Scan a food barcode");
const quality = ref(100);
const latest = ref(null);
const blurryLatest = ref(null);

const top = ref(30);
const left = ref(50);
const scale = ref(0.9);

watch(quality, (quality) => {
  if (quality <= 14 && blurryLatest.value !== latest.value) {
    status.value = "Blurry image. Try adjusting angle."
  } else {
    status.value = "Scan a food barcode"
  }
})

let barcodeInt = null;

onMounted(async () => {
  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 2530 },
      height: { ideal: vh * 1.83 },
      // ACTIVATE PWA
      // facingMode: {
      //   exact: 'environment'
      // }
    },
    audio: false
  })

  let dist = 0;

  camera.value.srcObject = stream;
  camera.value.play();

  const [track] = stream.getVideoTracks();
  const imageCapture = new ImageCapture(track);

  const capabilities = track.getCapabilities();
  const settings = track.getSettings();

  if (!capabilities.focusDistance) {
    return;
  }

  const input = document.querySelector('input[type="range"]');
  input.min = capabilities.focusDistance.min;
  input.max = capabilities.focusDistance.max;
  input.step = capabilities.focusDistance.step;
  input.value = settings.focusDistance;
  input.oninput = async event => {
    try {
      dist = input.value
    } catch (err) {
      console.error("applyConstraints() failed: ", err);
    }
  };
  input.parentElement.hidden = false;

  setInterval(async () => {
    await track.applyConstraints({
      focusMode: "manual",
      focusDistance: dist
    });
  }, 1000);

  const barcodeDetector = new BarcodeDetectorPolyfill({ formats: ['upc_e', 'upc_a', 'itf', 'ean_8', 'ean_13', 'code_93', 'code_39', 'code_128'] });
  const findLatest = async () => {
    const barcodes = await barcodeDetector.detect(camera.value)
    if (barcodes.length > 0) {
      if (barcodes[0].quality > 14) {
        latest.value = barcodes[0].rawValue;
        scan()
      } else {
        blurryLatest.value = barcodes[0].rawValue;
      }
      quality.value = barcodes[0].quality;
    }
  }

  barcodeInt = setInterval(findLatest, 50);
})

onUnmounted(() => {
  clearInterval(barcodeInt)
})

const itemVisible = ref(false)

// REMOVE IN LIVE
latest.value = "02289902"

const item = ref(null)

const scan = () => {
  if (latest.value !== null) {
    loading.value = true;
    item.value.onLoad(() => {
      setTimeout(() => {
        loading.value = false;
        itemVisible.value = true;
      }, 1000)
    })
  }
}

const loading = ref(false);

watch(loading, (loading) => {
  if (loading) {
    camera.value.pause()
  } else {
    camera.value.play()
  }
})

const exit = () => {
  itemVisible.value = false;
}

</script>

<template>
  <input type="range" class="absolute top-0 left-0 z-[99]">
  <Item :visible="itemVisible" :code="() => latest" :exit="exit" ref="item"></Item>
  <div class="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
    <Transition name="loader">
      <Loader v-if="loading"></Loader>
    </Transition>
  </div>
  <video autoplay class="w-screen h-screen absolute bg-black pointer-events-none" ref="camera"></video>
  <!-- <div class="absolute top-[2%] h-[7vh] px-3 flex w-full">
    <img src="/logo.svg" class="h-[7vh]"/>
  </div> -->
  <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 666.98 215.76"
    class="h-[10vh] absolute"
    :style="'top: ' + top + '%; left: ' + left + '%; transform: translate(-50%, -50%) scale(' + scale + ');'">
    <line class="cls-1" x1="304.56" y1="107.79" x2="364" y2="107.79" />
    <line class="cls-1" x1="333.5" y1="78.97" x2="333.5" y2="136.6" />
    <path class="cls-1" d="m661.2,59.85V23.15s-3.3-16-17.65-17.65h-35.71" />
    <path class="cls-1" d="m5.88,155.9v36.7s3.3,16,17.65,17.65h35.71" />
    <path class="cls-1" d="m661.48,155.59v36.7s-3.3,16-17.65,17.65h-35.71" />
    <path class="cls-1" d="m5.5,60.1V23.4S8.8,7.4,23.15,5.75h35.71" />
  </svg>
  <div class="h-32 flex flex-col items-center justify-center absolute bottom-0 w-full">
    <div class="bg-black/60 text-white py-1 px-2 text-xs rounded-full font-semibold">{{ status }}</div>
    <div class="flex-1 flex flex-row items-center justify-center gap-12 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-8 h-8 focus:scale-90 transition-all"
        viewBox="0 0 256 256">
        <path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"></path>
        <path
          d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z">
        </path>
      </svg>
      <button class="relative flex items-center justify-center group" @click="scan">
        <div class="rounded-full bg-emerald-500 w-10 h-10"></div>
        <div class="rounded-full border-emerald-500/50 border-2 w-12 h-12 absolute group-focus:scale-95 transition-all">
        </div>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-8 h-8 focus:scale-90 transition-all"
        viewBox="0 0 256 256">
        <path
          d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
          opacity="0.2"></path>
        <path
          d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z">
        </path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.cls-1 {
  fill: none;
  stroke: rgba(82, 222, 176, 0.6);
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 11px;
}

.loader-enter-active,
.loader-leave-active {
  transition: scale 0.25s ease;
}

.loader-enter-from,
.loader-leave-to {
  scale: 0;
}
</style>