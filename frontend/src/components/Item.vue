<script setup>
import { onMounted, watch, ref } from 'vue';
import codes from './codes.json';
console.log(codes)

const props = defineProps(['visible', 'code', 'exit', 'loaded'])
const product = ref(null)
const summary = ref("");
const loading = ref(false)

const loadCode = async () => {
    summary.value = "";
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
    try {
        return `https://images.openfoodfacts.org/images/products/${splitBarcode(product.value._id)}/front_en.${product.value.images.front_en.rev}.400.jpg`;
    } catch {
        return null
    }
}

const summaryLoading = ref(false);

function aiSummary() {
    summaryLoading.value = true;
    fetch("https://be92-4-16-175-130.ngrok-free.app/api/summary/" + product.value._id, {
        headers: {
            "ngrok-skip-browser-warning": "hi"
        }
    }).then(resp => resp.json()).then(
        data => {
            let response = data["candidates"][0]["content"]["parts"][0]["text"];
            summary.value = marked.parse(response);
            summaryLoading.value = false;
        }
    ).catch(() => {
        summaryLoading.value = false;
    });
}

function getDangerColor(text) {
    text = text.toLowerCase();
    if (text.includes("high")) {
        return "bg-red-500 ";
    } else if (text.includes("moderate")) {
        return "bg-yellow-500 ";
    } else if (text.includes("low")) {
        return "bg-green-500 ";
    }
    return "bg-gray-500 ";
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
                    <div class="flex items-center gap-4">
                        <img :src="getImage()" v-if="getImage() !== null" class="rounded-lg w-28" />
                        <div class="text-xl roboto-black">{{ toTitleCase(product.product_name_en) }}</div>
                    </div>
                    <span
                        class="flex flex-row mt-4 gap-0.5 gap-y-2 overflow-auto max-w-[calc(100vw-48px)] rounded pb-2">
                        <span
                            class="bg-[#F47E5F]/20 text-[#F47E5F] font-medium me-2 px-2.5 py-0.5 rounded text-nowrap shadow-inner"
                            v-for="item in product.categories_tags">{{
                                toTitleCase(item.split(":")[1].replaceAll("-", " ")) }}</span>
                    </span>
                    <span
                        class="flex flex-row mt-4 gap-0.5 gap-y-2 overflow-auto max-w-[calc(100vw-48px)] keep-scrolling rounded"
                        v-if="product.allergens_hierarchy && product.allergens_hierarchy.length > 0">
                        <div class="w-full bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p class="font-bold">
                                Potential Allergens
                            </p>
                            {{
                                product.allergens_hierarchy.map(item =>
                                    toTitleCase(item.split(":")[1].replaceAll("-", " "))
                                ).join(", ")
                            }}
                        </div>
                    </span>

                    <div class="bg-gray-500/10 mt-3 rounded relative text-sm overflow-hidden shadow-md">
                        <div class="p-2 text-slate-800 max-h-24 overflow-y-auto"
                            v-if="!summaryLoading && summary.length > 0" v-html="summary">
                        </div>
                        <div class="p-2 animate-pulse" v-if="summaryLoading">
                            <div class="h-2 bg-gray-300 rounded-full w-full"></div>
                        </div>
                        <button @click="aiSummary" v-if="summary.length === 0"
                            class="rounded p-1.5 bg-emerald-500 text-white w-full rounded-t-none font-semibold">✨ Generate
                            Summary</button>
                    </div>
                    <div class="flex flex-row mt-6 items-center">
                        <div class="flex flex-col">
                            <div class="uppercase text-sm font-bold opacity-50">Nutri-score</div>
                            <div class="text-xs mt-1" v-if="product.nutriscore_tags[0].toUpperCase() === 'E'">Awful
                                nutritional quality</div>
                            <div class="text-xs mt-1" v-if="product.nutriscore_tags[0].toUpperCase() === 'D'">Poor
                                nutritional quality</div>
                            <div class="text-xs mt-1" v-if="product.nutriscore_tags[0].toUpperCase() === 'C'">Bad
                                nutritional quality</div>
                            <div class="text-xs mt-1" v-if="product.nutriscore_tags[0].toUpperCase() === 'B'">Average
                                nutritional quality</div>
                            <div class="text-xs mt-1" v-if="product.nutriscore_tags[0].toUpperCase() === 'A'">Good
                                nutritional quality</div>
                        </div>
                        <img :src="'/nutriscore-' + product.nutriscore_tags[0].toLowerCase() + '.svg'"
                            class="h-12 ml-auto" />
                    </div>
                    <div class="flex flex-col mt-2 border-b-2">
                        <div class="flex flex-row border-t-2 items-center py-1 px-2" v-for="[key, level] in Object.entries(product.nutrient_levels)">{{(level === "high" ? "🙁 &nbsp;" : level === "moderate" ? "😐 &nbsp;" : level === "low" ? "😊 &nbsp;" : "") + toTitleCase(key.replaceAll("-", " ")) }} <div class="text-xs ml-auto">{{ product.nutriments[key+"_100g"] + "%" }}</div></div>
                    </div>
                    <div class="flex flex-row mt-6 items-center">
                        <div class="flex flex-col">
                            <div class="uppercase text-sm font-bold opacity-50">NOVA score</div>
                            <div class="text-xs mt-1" v-if="product['nutriments']['nova-group'] === 4">Ultra processed</div>
                            <div class="text-xs mt-1" v-if="product['nutriments']['nova-group'] === 3">Highly processed</div>
                            <div class="text-xs mt-1" v-if="product['nutriments']['nova-group'] === 2">Processed food</div>
                            <div class="text-xs mt-1" v-if="product['nutriments']['nova-group'] === 1">Low processed food</div>
                        </div>
                        <img :src="'/nova-group-' + product['nutriments']['nova-group'] + '.svg'" class="h-12 ml-auto" />
                    </div>
                    <div>
                        <ul class="list-disc" v-for="(a, i) in product.additives_original_tags">
                            <li :class="`additive-num`-i">
                                <span :class="`${getDangerColor(codes['E' + a.split('en:')[1].substr(1)].risk)} text-white rounded-lg px-2`">{{ 'E' + a.split("en:")[1].substr(1) }}</span>
                                {{ codes['E' + a.split("en:")[1].substr(1)].name }}
                            </li>
                        </ul>

                        <div class="w-full">
                            <p>Effects</p>
                            <span v-for="danger in ['high', 'moderate', 'low', 'none known']" :class="getDangerColor(danger) + 'px-1 rounded-lg m-2'">
                                {{ danger.toUpperCase() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
</style>

<!-- <style>
    .additive-num-{{i}}::before {
        content: {{ "E" + a.split("en:")[1].substr(1);
    }
</style> -->
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