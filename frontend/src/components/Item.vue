<script setup>
const props = defineProps(['visible', 'code', 'exit'])

// const visible = ref(props.visible)
// const code = ref(props.code)
</script>

<template>
    <Transition :duration="300">
        <div class="bg-black/60 w-screen h-screen absolute top-0 left-0 z-[999] flex" v-if="visible">
            <div class="flex-1 bg-white inner shadow-inner p-4 flex flex-col">
                <button @click="exit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="opacity-70 w-6 h-6" viewBox="0 0 256 256">
                        <path
                            d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z">
                        </path>
                    </svg>
                </button>
                <div class="flex flex-col mt-3 flex-1 px-1.5 overflow-y-auto">
                    <div class="text-xl roboto-black">title here</div>
                    
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active .inner,
.v-leave-active .inner {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.v-enter-from .inner,
.v-leave-to .inner {
    transform: translateY(90%);
    opacity: 0.5;
}
</style>