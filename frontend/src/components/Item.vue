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

function splitBarcode(str) {
    if (str == undefined || str.length < 10) {
        return str;
    }
    let stuff = str.match(/.{1,3}/g);
    let o = "";
    for (let i = 0; i < stuff.length - 1; i++) {
        o += stuff[i];
        if (i < stuff.length - 2) {
            o += "/";
        }
    }
    o += stuff[stuff.length - 1];
    return o;
}

function getImage() {
    return `https://images.openfoodfacts.org/images/products/${splitBarcode(product.value._id)}/front_en.${product.value.images.front_en.rev}.400.jpg`;
}

function aiSummary() {
    fetch("https://be92-4-16-175-130.ngrok-free.app/api/summary/" + product.value._id, {
        headers: {
            "ngrok-skip-browser-warning": "hi"
        }
    }).then(resp => resp.json()).then(
        data => {
            let response = data["candidates"][0]["content"]["parts"][0]["text"];
            document.getElementById("ai-generated").innerHTML = marked.parse(response);
        }
    ).catch(() => {});
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
                    <div class="flex">
                        <div class="text-xl roboto-black mr-4">{{ toTitleCase(product.product_name_en) }}</div>
                        <img :src="getImage()" class="rounded-lg w-36" />
                    </div>
                    <div>
                        <button @click="aiSummary" class="rounded-lg p-3 w-full my-4" style="background-color: #ACBD81;">Generate AI</button>
                        <p id="ai-generated">

                        </p>
                    </div>
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