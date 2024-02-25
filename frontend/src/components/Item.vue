<script setup>
import { onMounted, watch, ref } from 'vue';

const props = defineProps(['visible', 'code', 'exit', 'loaded'])
const product = ref(null)
const loading = ref(false)

const loadCode = async () => {
    const code = props.code();
    if (code !== null) {
        loading.value = true;
        const resp = await fetch("https://be92-4-16-175-130.ngrok-free.app/api/product/" + code, {
            headers: {
                "ngrok-skip-browser-warning": "hi"
            }
        });
        if (resp.status !== 200) {
            return
        }
        product.value = await resp.json();
        if (load !== null) {
            load()
        }
        loading.value = false;
    }
}

let load = null
const onLoad = (f) => {
    if (loading.value) {
        load = f
    } else {
        f()
    }
}

defineExpose({
    onLoad
})

watch(props.code, loadCode)

onMounted(loadCode)

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
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
                    <div class="text-xl roboto-black">{{ toTitleCase(product.product_name_en) }}</div>
                    <span class="flex flex-row mt-6 gap-0.5 gap-y-2 overflow-auto max-w-[calc(100vw-48px)] keep-scrolling">
                        <span class="bg-[#F47E5F]/20 text-[#F47E5F] text-lg font-medium me-2 px-2.5 py-0.5 rounded text-nowrap" v-for="item in product.categories_tags">{{ toTitleCase(item.split(":")[1].replaceAll("-", " ")) }}</span>
                    </span>
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