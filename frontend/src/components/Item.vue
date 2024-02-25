<script setup>
import { onMounted, watch, ref } from 'vue';

const props = defineProps(['visible', 'code', 'exit', 'loaded'])
const product = ref(null)
const loading = ref(false)

const loadCode = async () => {
    const code = props.code();
    if (code !== null) {
        loading.value = true;
        // const resp = await fetch("https://be92-4-16-175-130.ngrok-free.app/api/product/" + code, {
        //     headers: {
        //         "ngrok-skip-browser-warning": "hi"
        //     }
        // });
        // if (resp.status !== 200) {
        //     return
        // }
        // product.value = await resp.json();
        product.value = JSON.parse(String.raw`
{"_id":"0040000513155","nova_groups_tags":["en:4-ultra-processed-food-and-drink-products"],"product_name_en":"Milk chocolate candies, milk chocolate","product_name":"Milk chocolate candies, milk chocolate","ingredients_text":"Milk chocolate (sugar, chocolate, skim milk, cocoa butter, lactose, milkfat, soy lecithin, salt, artificial and natural flavors), sugar, cornstarch, less than 1% - corn syrup, dextrin, coloring (includes yellow 5, blue 1, yellow 6, red 40, yellow 5 lake, blue 1 lake, yellow 6 lake, red 40 lake, blue 2 lake, blue 2), carnauba wax, gum acacia.","ingredients":[{"vegan":"no","ciqual_food_code":"31004","ingredients":[{"percent_max":62.96,"text":"sugar","percent_estimate":27.916666666666668,"percent_min":1.3333333333333333,"id":"en:sugar","vegetarian":"yes","vegan":"yes","ciqual_proxy_food_code":"31016"},{"id":"en:chocolate","percent_min":0,"vegetarian":"yes","percent_max":48.5,"percent_estimate":13.291666666666666,"text":"chocolate","vegan":"maybe"},{"vegan":"no","ciqual_proxy_food_code":"19051","percent_max":32.333333333333336,"percent_estimate":6.645833333333332,"text":"skim milk","percent_min":0,"id":"en:skimmed-milk","vegetarian":"yes"},{"percent_estimate":3.3229166666666643,"text":"cocoa butter","percent_max":24.25,"vegetarian":"yes","percent_min":0,"id":"en:cocoa-butter","vegan":"yes","ciqual_food_code":"16030"},{"vegetarian":"yes","id":"en:lactose","percent_min":0,"text":"lactose","percent_estimate":1.6614583333333321,"percent_max":19.4,"vegan":"no"},{"vegan":"no","text":"milkfat","from_palm_oil":"maybe","percent_estimate":0.8307291666666643,"percent_max":16.166666666666668,"vegetarian":"yes","percent_min":0,"id":"en:milkfat"},{"percent_max":13.857142857142858,"percent_estimate":0.41536458333333215,"text":"soy lecithin","id":"en:soya-lecithin","percent_min":0,"vegetarian":"yes","vegan":"yes","ciqual_food_code":"42200"},{"ciqual_food_code":"11058","vegan":"yes","vegetarian":"yes","percent_min":0,"id":"en:salt","text":"salt","percent_estimate":0.0925,"percent_max":0.185},{"percent_min":0,"id":"en:artificial-and-natural-flavors","percent_max":0.185,"text":"artificial and natural flavors","percent_estimate":0.32286458333332746}],"percent_estimate":54.5,"text":"Milk chocolate","percent_max":97,"vegetarian":"yes","id":"en:milk-chocolate","percent_min":12},{"ciqual_proxy_food_code":"31016","vegan":"yes","id":"en:sugar","percent_min":1,"vegetarian":"yes","percent_max":49,"text":"sugar","percent_estimate":23.25},{"ciqual_food_code":"9510","vegan":"yes","vegetarian":"yes","id":"en:corn-starch","percent_min":1,"percent_estimate":11.625,"text":"cornstarch","percent_max":33},{"percent":1,"percent_min":1,"id":"en:less-than","text":"less than","percent_estimate":1,"percent_max":1},{"vegan":"yes","ciqual_proxy_food_code":"31089","percent_max":1,"text":"corn syrup","percent_estimate":0.5,"percent_min":0,"id":"en:corn-syrup","vegetarian":"yes"},{"vegan":"yes","percent_max":1,"text":"dextrin","percent_estimate":0.5,"percent_min":0,"id":"en:e1400","vegetarian":"yes"},{"ingredients":[{"percent_min":0,"id":"en:includes-yellow-5","text":"includes yellow 5","percent_estimate":0.25,"percent_max":1},{"percent_min":0,"id":"en:e133","vegetarian":"yes","percent_max":0.5,"percent_estimate":0.125,"text":"blue 1","vegan":"yes"},{"text":"yellow 6","percent_estimate":0.0625,"percent_max":0.3333333333333333,"vegetarian":"yes","percent_min":0,"id":"en:e110","vegan":"yes"},{"percent_max":0.25,"percent_estimate":0.03125,"text":"red 40","id":"en:e129","percent_min":0,"vegetarian":"yes","vegan":"yes"},{"percent_estimate":0.015625,"text":"yellow 5 lake","percent_max":0.2,"vegetarian":"yes","id":"en:e102","percent_min":0,"vegan":"yes"},{"percent_min":0,"id":"en:e133","vegetarian":"yes","percent_max":0.16666666666666666,"percent_estimate":0.0078125,"text":"blue 1 lake","vegan":"yes"},{"vegan":"yes","text":"yellow 6 lake","percent_estimate":0.00390625,"percent_max":0.16666666666666666,"vegetarian":"yes","percent_min":0,"id":"en:e110"},{"vegan":"yes","id":"en:e129","percent_min":0,"vegetarian":"yes","percent_max":0.16666666666666666,"percent_estimate":0.001953125,"text":"red 40 lake"},{"vegan":"yes","percent_estimate":0.0009765625,"text":"blue 2 lake","percent_max":0.16666666666666666,"vegetarian":"yes","id":"en:e132","percent_min":0},{"vegan":"yes","vegetarian":"yes","percent_min":0,"id":"en:e132","text":"blue 2","percent_estimate":0.0009765625,"percent_max":0.16666666666666666}],"percent_min":0,"id":"en:colour","percent_max":1,"percent_estimate":0.5,"text":"coloring"},{"vegetarian":"yes","id":"en:e903","percent_min":0,"percent_estimate":0.5,"text":"carnauba wax","percent_max":1,"vegan":"yes"},{"vegan":"yes","id":"en:e414","percent_min":0,"vegetarian":"yes","percent_max":1,"text":"gum acacia","percent_estimate":7.625}],"ingredients_text_with_allergens":"Milk chocolate (sugar, chocolate, skim milk, cocoa butter, <span class=\"allergen\">lactose</span>, milkfat, <span class=\"allergen\">soy lecithin</span>, salt, artificial and natural flavors), sugar, cornstarch, less than 1% - corn syrup, dextrin, coloring (includes yellow 5, blue 1, yellow 6, red 40, yellow 5 lake, blue 1 lake, yellow 6 lake, red 40 lake, blue 2 lake, blue 2), carnauba wax, gum acacia.","ingredients_text_en":"Milk chocolate (sugar, chocolate, skim milk, cocoa butter, lactose, milkfat, soy lecithin, salt, artificial and natural flavors), sugar, cornstarch, less than 1% - corn syrup, dextrin, coloring (includes yellow 5, blue 1, yellow 6, red 40, yellow 5 lake, blue 1 lake, yellow 6 lake, red 40 lake, blue 2 lake, blue 2), carnauba wax, gum acacia.","ingredients_text_with_allergens_en":"Milk chocolate (sugar, chocolate, skim milk, cocoa butter, <span class=\"allergen\">lactose</span>, milkfat, <span class=\"allergen\">soy lecithin</span>, salt, artificial and natural flavors), sugar, cornstarch, less than 1% - corn syrup, dextrin, coloring (includes yellow 5, blue 1, yellow 6, red 40, yellow 5 lake, blue 1 lake, yellow 6 lake, red 40 lake, blue 2 lake, blue 2), carnauba wax, gum acacia.","ingredients_text_en_imported":"Milk chocolate (sugar, chocolate, skim milk, cocoa butter, lactose, milkfat, soy lecithin, salt, artificial and natural flavors), sugar, cornstarch, less than 1% - corn syrup, dextrin, coloring (includes yellow 5, blue 1, yellow 6, red 40, yellow 5 lake, blue 1 lake, yellow 6 lake, red 40 lake, blue 2 lake, blue 2), carnauba wax, gum acacia.","nutrient_levels_tags":["en:fat-in-moderate-quantity","en:saturated-fat-in-high-quantity","en:sugars-in-high-quantity","en:salt-in-low-quantity"],"food_groups":"en:sweets","brand_owner":"Mars Chocolate North America LLC","ingredients_analysis":{"en:vegan-status-unknown":["en:artificial-and-natural-flavors","en:less-than","en:includes-yellow-5"],"en:non-vegan":["en:milk-chocolate","en:skimmed-milk","en:lactose","en:milkfat"],"en:vegetarian-status-unknown":["en:artificial-and-natural-flavors","en:less-than","en:includes-yellow-5"],"en:may-contain-palm-oil":["en:milkfat"]},"data_quality_warnings_tags":["en:serving-quantity-defined-but-quantity-undefined","en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown","en:ecoscore-packaging-packaging-data-missing","en:ecoscore-production-system-no-label"],"nutriments":{"energy_serving":544,"proteins_unit":"g","sugars_value":62.96,"salt":0.185,"potassium_unit":"mg","energy-kcal_unit":"kcal","nova-group":4,"fat":18.52,"saturated-fat_value":11.11,"cholesterol_unit":"mg","trans-fat_100g":0,"fiber_100g":3.7,"fiber_serving":0.999,"fiber_unit":"g","carbohydrates_value":70.37,"fruits-vegetables-nuts-estimate-from-ingredients_serving":0,"trans-fat_serving":0,"energy-kcal_value":481,"nova-group_serving":4,"iron_100g":0,"sodium_value":74,"fat_value":18.52,"cholesterol_value":19,"calcium_100g":0.111,"fruits-vegetables-legumes-estimate-from-ingredients_serving":0,"nova-group_100g":4,"trans-fat_unit":"g","energy_value":481,"nutrition-score-fr_100g":23,"potassium_100g":0,"sugars_serving":17,"nutrition-score-fr":23,"iron_serving":0,"salt_value":185,"carbohydrates_100g":70.37,"saturated-fat":11.11,"proteins":3.7,"potassium_serving":0,"fiber_value":3.7,"sodium_serving":0.02,"carbohydrates":70.37,"saturated-fat_100g":11.11,"salt_unit":"mg","calcium_value":111,"fruits-vegetables-legumes-estimate-from-ingredients_100g":0,"proteins_serving":0.999,"iron_unit":"mg","potassium":0,"energy-kcal_value_computed":470.36,"fat_unit":"g","energy-kcal":481,"sugars":62.96,"cholesterol":0.019,"potassium_value":0,"iron_value":0,"cholesterol_100g":0.019,"salt_serving":0.05,"energy_100g":2013,"energy_unit":"kcal","fruits-vegetables-nuts-estimate-from-ingredients_100g":0,"proteins_100g":3.7,"energy-kcal_100g":481,"sodium":0.074,"fat_serving":5,"proteins_value":3.7,"trans-fat":0,"carbohydrates_serving":19,"sodium_unit":"mg","sodium_100g":0.074,"salt_100g":0.185,"saturated-fat_serving":3,"trans-fat_value":0,"energy":2013,"fiber":3.7,"calcium_serving":0.03,"calcium":0.111,"saturated-fat_unit":"g","energy-kcal_serving":130,"fat_100g":18.52,"calcium_unit":"mg","cholesterol_serving":0.00513,"carbohydrates_unit":"g","sugars_unit":"g","iron":0,"sugars_100g":62.96},"ingredients_tags":["en:milk-chocolate","en:chocolate","en:sugar","en:added-sugar","en:disaccharide","en:corn-starch","en:starch","en:less-than","en:corn-syrup","en:e1400","en:colour","en:e903","en:e414","en:skimmed-milk","en:dairy","en:milk","en:cocoa-butter","en:plant","en:cocoa","en:lactose","en:milkfat","en:oil-and-fat","en:fat","en:soya-lecithin","en:e322","en:e322i","en:salt","en:artificial-and-natural-flavors","en:includes-yellow-5","en:e133","en:e110","en:e129","en:e102","en:e132"],"additives_original_tags":["en:e322i","en:e1400","en:e102","en:e133","en:e110","en:e129","en:e132","en:e903","en:e414"],"serving_quantity":27,"_keywords":["candie","milk","confectionerie","sweet","snack","chocolate"],"serving_size":"2 PACKS (27 g)","nutrient_levels":{"saturated-fat":"high","salt":"low","fat":"moderate","sugars":"high"},"ingredients_without_ciqual_codes":["en:artificial-and-natural-flavors","en:chocolate","en:colour","en:e102","en:e110","en:e129","en:e132","en:e133","en:e1400","en:e414","en:e903","en:includes-yellow-5","en:lactose","en:less-than","en:milkfat"],"nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients":1,"nutriscore_data":{"sugars":62.96,"fruits_vegetables_nuts_colza_walnut_olive_oils_value":0,"is_beverage":0,"sugars_value":63,"is_cheese":0,"grade":"e","energy_points":6,"is_fat":0,"proteins_points":2,"is_water":0,"negative_points":26,"fruits_vegetables_nuts_colza_walnut_olive_oils_points":0,"sodium":74,"saturated_fat_value":11.1,"sodium_value":74,"fiber_points":3,"positive_points":3,"proteins_value":3.7,"sugars_points":10,"saturated_fat":11.11,"energy":2013,"fiber":3.7,"energy_value":2013,"fiber_value":3.7,"fruits_vegetables_nuts_colza_walnut_olive_oils":0,"proteins":3.7,"score":23,"saturated_fat_points":10,"sodium_points":0},"nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients":1,"pnns_groups_1":"Sugary snacks","additives_old_tags":["en:e133","en:e129","en:e102"],"food_groups_tags":["en:sugary-snacks","en:sweets"],"ecoscore_data":{"adjustments":{"threatened_species":{},"packaging":{"warning":"packaging_data_missing","value":-15,"non_recyclable_and_non_biodegradable_materials":1},"production_system":{"labels":[],"warning":"no_label","value":0},"origins_of_ingredients":{"warning":"origins_are_100_percent_unknown","values":{"it":-5,"is":-5,"sy":-5,"me":-5,"sj":-5,"ba":-5,"ch":-5,"mc":-5,"ro":-5,"fi":-5,"lu":-5,"bg":-5,"dk":-5,"li":-5,"ad":-5,"se":-5,"hr":-5,"je":-5,"ax":-5,"fo":-5,"eg":-5,"ie":-5,"us":-5,"pl":-5,"tr":-5,"al":-5,"mt":-5,"gr":-5,"cz":-5,"ee":-5,"si":-5,"nl":-5,"il":-5,"dz":-5,"im":-5,"no":-5,"ua":-5,"world":-5,"rs":-5,"sm":-5,"ma":-5,"be":-5,"lb":-5,"sk":-5,"de":-5,"ly":-5,"gi":-5,"md":-5,"xk":-5,"es":-5,"va":-5,"cy":-5,"lt":-5,"tn":-5,"hu":-5,"ps":-5,"at":-5,"lv":-5,"mk":-5,"gg":-5,"uk":-5,"fr":-5,"pt":-5},"transportation_values":{"gi":0,"ly":0,"xk":0,"md":0,"tn":0,"cy":0,"lt":0,"es":0,"va":0,"fr":0,"uk":0,"pt":0,"lv":0,"mk":0,"gg":0,"at":0,"ps":0,"hu":0,"il":0,"si":0,"ee":0,"nl":0,"cz":0,"no":0,"im":0,"dz":0,"be":0,"sm":0,"world":0,"ma":0,"rs":0,"ua":0,"de":0,"sk":0,"lb":0,"lu":0,"bg":0,"fi":0,"je":0,"hr":0,"se":0,"li":0,"ad":0,"dk":0,"ie":0,"eg":0,"ax":0,"fo":0,"al":0,"gr":0,"mt":0,"tr":0,"pl":0,"us":0,"is":0,"it":0,"ba":0,"sj":0,"me":0,"sy":0,"ch":0,"ro":0,"mc":0},"transportation_scores":{"lb":0,"de":0,"sk":0,"world":0,"rs":0,"sm":0,"ma":0,"ua":0,"be":0,"dz":0,"no":0,"im":0,"nl":0,"ee":0,"si":0,"cz":0,"il":0,"ps":0,"at":0,"hu":0,"pt":0,"fr":0,"uk":0,"gg":0,"mk":0,"lv":0,"va":0,"es":0,"tn":0,"lt":0,"cy":0,"xk":0,"md":0,"ly":0,"gi":0,"mc":0,"ro":0,"ch":0,"me":0,"sy":0,"ba":0,"sj":0,"it":0,"is":0,"tr":0,"pl":0,"us":0,"gr":0,"mt":0,"al":0,"eg":0,"fo":0,"ax":0,"ie":0,"se":0,"li":0,"ad":0,"dk":0,"je":0,"hr":0,"lu":0,"bg":0,"fi":0},"origins_from_categories":["en:unknown"],"epi_value":-5,"origins_from_origins_field":["en:unknown"],"aggregated_origins":[{"percent":100,"origin":"en:unknown"}],"epi_score":0}},"agribalyse":{"warning":"missing_agribalyse_match"},"missing":{"packagings":1,"labels":1,"agb_category":1,"origins":1},"missing_agribalyse_match_warning":1,"missing_key_data":1,"status":"unknown"},"allergens":"en:milk","last_modified_by":"org-database-usda","nutriscore":{"2021":{"score":23,"grade":"e","data":{"energy_points":6,"is_cheese":0,"sugars_value":63,"is_beverage":0,"fruits_vegetables_nuts_colza_walnut_olive_oils_value":0,"sugars":62.96,"saturated_fat_value":11.1,"sodium_value":74,"sodium":74,"fruits_vegetables_nuts_colza_walnut_olive_oils_points":0,"is_water":0,"negative_points":26,"is_fat":0,"proteins_points":2,"energy_value":2013,"saturated_fat":11.11,"energy":2013,"fiber":3.7,"proteins_value":3.7,"sugars_points":10,"positive_points":3,"fiber_points":3,"sodium_points":0,"saturated_fat_points":10,"proteins":3.7,"fiber_value":3.7,"fruits_vegetables_nuts_colza_walnut_olive_oils":0},"nutriscore_computed":1,"nutriscore_applicable":1,"category_available":1,"nutrients_available":1},"2023":{"nutrients_available":1,"nutriscore_applicable":1,"category_available":1,"nutriscore_computed":1,"data":{"is_fat_oil_nuts_seeds":0,"components":{"negative":[{"unit":"kJ","id":"energy","points_max":10,"value":2013,"points":6},{"id":"sugars","points_max":15,"points":15,"value":62.96,"unit":"g"},{"id":"saturated_fat","points":10,"points_max":10,"value":11.11,"unit":"g"},{"unit":"g","points":0,"points_max":20,"value":0.18,"id":"salt"}],"positive":[{"unit":"g","id":"fiber","value":3.7,"points_max":5,"points":1},{"unit":"%","points_max":5,"value":0,"points":0,"id":"fruits_vegetables_legumes"}]},"count_proteins":0,"positive_nutrients":["fiber","fruits_vegetables_legumes"],"positive_points":1,"is_red_meat_product":0,"positive_points_max":10,"negative_points_max":55,"negative_points":31,"is_water":0,"is_cheese":0,"count_proteins_reason":"negative_points_greater_than_or_equal_to_11","is_beverage":0},"score":30,"grade":"e"}},"ingredients_analysis_tags":["en:may-contain-palm-oil","en:non-vegan","en:vegetarian-status-unknown"],"serving_size_imported":"2 PACKS (27 g)","nutriscore_version":"2021","categories_tags":["en:snacks","en:sweet-snacks","en:confectioneries"],"nova_groups_markers":{"3":[["ingredients","en:salt"],["ingredients","en:starch"],["ingredients","en:sugar"],["categories","en:sweet-snacks"]],"4":[["additives","en:e102"],["additives","en:e110"],["additives","en:e129"],["additives","en:e132"],["additives","en:e133"],["additives","en:e1400"],["additives","en:e322"],["additives","en:e414"],["additives","en:e903"],["ingredients","en:colour"],["ingredients","en:lactose"]]},"nutriscore_tags":["e"],"allergens_hierarchy":["en:milk","en:soybeans"],"allergens_from_ingredients":"en:milk, lactose, soy lecithin","ingredients_original_tags":["en:milk-chocolate","en:sugar","en:corn-starch","en:less-than","en:corn-syrup","en:e1400","en:colour","en:e903","en:e414","en:sugar","en:chocolate","en:skimmed-milk","en:cocoa-butter","en:lactose","en:milkfat","en:soya-lecithin","en:salt","en:artificial-and-natural-flavors","en:includes-yellow-5","en:e133","en:e110","en:e129","en:e102","en:e133","en:e110","en:e129","en:e132","en:e132"],"brand_owner_imported":"Mars Chocolate North America LLC","data_quality_tags":["en:no-packaging-data","en:ingredients-percent-analysis-ok","en:ecoscore-extended-data-not-computed","en:food-groups-1-known","en:food-groups-2-known","en:food-groups-3-unknown","en:serving-quantity-defined-but-quantity-undefined","en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown","en:ecoscore-packaging-packaging-data-missing","en:ecoscore-production-system-no-label"],"ingredients_hierarchy":["en:milk-chocolate","en:chocolate","en:sugar","en:added-sugar","en:disaccharide","en:corn-starch","en:starch","en:less-than","en:corn-syrup","en:e1400","en:colour","en:e903","en:e414","en:skimmed-milk","en:dairy","en:milk","en:cocoa-butter","en:plant","en:cocoa","en:lactose","en:milkfat","en:oil-and-fat","en:fat","en:soya-lecithin","en:e322","en:e322i","en:salt","en:artificial-and-natural-flavors","en:includes-yellow-5","en:e133","en:e110","en:e129","en:e102","en:e132"]}`)
        console.log(JSON.stringify(product.value, null, 2))
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
    ).catch(() => { });
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
                        class="flex flex-row mt-4 gap-0.5 gap-y-2 overflow-auto max-w-[calc(100vw-48px)] keep-scrolling rounded">
                        <span
                            class="bg-[#F47E5F]/20 text-[#F47E5F] font-medium me-2 px-2.5 py-0.5 rounded text-nowrap shadow-inner"
                            v-for="item in product.categories_tags">{{
                                toTitleCase(item.split(":")[1].replaceAll("-", " ")) }}</span>
                    </span>
                    <div class="bg-gray-500/10 mt-3 rounded relative text-sm overflow-hidden shadow-md">
                        <div class="p-2 text-slate-800">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <!-- <div class="p-2 animate-pulse">
                            <div class="h-2 bg-gray-300 rounded-full w-full"></div>
                        </div> -->
                        <button @click="aiSummary"
                            class="rounded p-1.5 bg-emerald-500 text-white w-full rounded-t-none font-semibold">✨ Generate
                            Summary</button>
                    </div>
                    <div class="flex flex-row mt-6 items-center">
                        <div class="flex flex-col">
                            <div class="uppercase text-sm font-bold opacity-50">Nutri-score</div>
                            <div class="text-xs mt-1">Bad nutritional quality</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 ml-auto" viewBox="0 0 240 130">
                            <defs>
                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                    <path d="M-576.406-131.683h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="b" clipPathUnits="userSpaceOnUse">
                                    <path d="M-480.445-91.617h841.89V503.66h-841.89z" />
                                </clipPath>
                                <clipPath id="c" clipPathUnits="userSpaceOnUse">
                                    <path d="M-488.313-132.237h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="d" clipPathUnits="userSpaceOnUse">
                                    <path d="M-519.714-136.177h841.89V459.1h-841.89z" />
                                </clipPath>
                                <clipPath id="e" clipPathUnits="userSpaceOnUse">
                                    <path d="M-521.325-134.642h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="f" clipPathUnits="userSpaceOnUse">
                                    <path d="M-532.144-130.648h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="g" clipPathUnits="userSpaceOnUse">
                                    <path d="M-500.02-102.749h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="h" clipPathUnits="userSpaceOnUse">
                                    <path d="M-522.55-115.224h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="i" clipPathUnits="userSpaceOnUse">
                                    <path d="M-561.373-85.195h841.89v595.276h-841.89z" />
                                </clipPath>
                                <clipPath id="j" clipPathUnits="userSpaceOnUse">
                                    <path d="M-562.786-87.568h841.89v595.276h-841.89z" />
                            </clipPath>
                            <clipPath id="k" clipPathUnits="userSpaceOnUse">
                                <path d="M-537.03-102.748h841.89v595.276h-841.89z" />
                            </clipPath>
                        </defs>
                        <path fill="#fff"
                            d="M239.174 27.41c0-15.112-12.296-27.41-27.408-27.41H27.411C12.295 0 .001 12.298.001 27.41v70.768c0 15.117 12.294 27.41 27.41 27.41h162.413A31.607 31.607 0 0 0 206 130h3.118c16.568 0 30.045-12.466 30.045-27.79v-3.793l.011-.239z"
                            clip-path="url(#a)" />
                        <path fill="#00803d"
                            d="M27.411 115.826h26.252V44.318H27.41A17.647 17.647 0 0 0 9.76 61.965v36.211a17.65 17.65 0 0 0 17.65 17.65"
                            clip-path="url(#b)" />
                        <path fill="#7c7b7b"
                            d="M23.179 19.799v9.751h-3.94V12.497h3.077l7.949 10.016V12.497h3.939V29.55h-3.17z" />
                        <path fill="#7c7b7b"
                            d="M44.774 26.187c.67 0 1.24-.139 1.704-.419.465-.28.843-.653 1.13-1.117a4.72 4.72 0 0 0 .61-1.597c.122-.6.184-1.214.184-1.839v-8.719h3.937v8.72a11.894 11.894 0 0 1-.444 3.314 7.635 7.635 0 0 1-1.37 2.692 6.413 6.413 0 0 1-2.353 1.814c-.953.437-2.085.658-3.398.658-1.362 0-2.522-.23-3.484-.695-.96-.464-1.742-1.084-2.34-1.863a7.608 7.608 0 0 1-1.321-2.7 12.062 12.062 0 0 1-.422-3.22v-8.72h3.94v8.72c0 .655.063 1.282.193 1.875a4.965 4.965 0 0 0 .623 1.585c.289.463.66.832 1.116 1.103.457.274 1.022.408 1.695.408"
                            clip-path="url(#c)" />
                        <path fill="#7c7b7b"
                            d="M68.358 15.957h-5.186V29.55h-3.937V15.957h-5.212v-3.46h14.335zM70.306 29.55V12.497h7.686c.801 0 1.543.17 2.223.505.68.335 1.266.777 1.763 1.322.496.545.882 1.16 1.165 1.849.282.688.42 1.384.42 2.09a5.991 5.991 0 0 1-.742 2.906 5.283 5.283 0 0 1-2.044 2.041l3.917 6.34H80.25l-3.436-5.499h-2.569v5.5zm3.94-8.937h3.6c.464 0 .866-.216 1.203-.658.338-.441.504-1.004.504-1.692 0-.706-.192-1.265-.576-1.684-.384-.415-.801-.622-1.25-.622h-3.482zM86.638 12.497h3.94V29.55h-3.94zM93.506 21.215h7.4v3.46h-7.4z" />
                        <path fill="#7c7b7b"
                            d="m114.068 17.493-.53-.362a10.504 10.504 0 0 0-2.497-1.057 5.67 5.67 0 0 0-1.536-.214c-.675 0-1.19.119-1.551.36a1.185 1.185 0 0 0-.539 1.056l.24.722.685.514c.295.152.664.294 1.105.422.44.128.947.273 1.525.432a20.36 20.36 0 0 1 2.21.733 6.075 6.075 0 0 1 1.68.984c.464.393.822.87 1.069 1.43.247.56.373 1.234.373 2.017 0 .96-.181 1.772-.54 2.436a4.568 4.568 0 0 1-1.429 1.611 6.073 6.073 0 0 1-2.054.89 10.502 10.502 0 0 1-2.39.275 13.622 13.622 0 0 1-3.82-.565 15.906 15.906 0 0 1-1.825-.66 10.142 10.142 0 0 1-1.635-.889l1.732-3.436.647.457c.353.227.785.45 1.297.673.512.225 1.088.426 1.728.6a7.311 7.311 0 0 0 1.947.265c1.394 0 2.09-.426 2.09-1.273l-.312-.792-.865-.563a9.249 9.249 0 0 0-1.297-.47l-1.631-.481a14.214 14.214 0 0 1-2.044-.781 5.457 5.457 0 0 1-1.44-.974 3.443 3.443 0 0 1-.853-1.27 4.656 4.656 0 0 1-.275-1.682c0-.898.167-1.688.503-2.377a5.154 5.154 0 0 1 1.368-1.743 5.958 5.958 0 0 1 2.006-1.07 8.038 8.038 0 0 1 2.414-.358c.61 0 1.203.055 1.779.166a13.29 13.29 0 0 1 1.644.432 13.781 13.781 0 0 1 2.725 1.273z"
                            clip-path="url(#d)" />
                        <path fill="#7c7b7b"
                            d="M117.624 20.88c0-1.024.18-2.046.551-3.063a8.47 8.47 0 0 1 1.609-2.725 8.134 8.134 0 0 1 2.584-1.947c1.015-.496 2.172-.743 3.47-.743 1.52 0 2.842.344 3.963 1.032a6.494 6.494 0 0 1 2.498 2.69l-3.026 2.112a3.661 3.661 0 0 0-.673-1.116l-.89-.72-.995-.384-.975-.108a3.509 3.509 0 0 0-1.825.457 4.085 4.085 0 0 0-1.273 1.176 5.298 5.298 0 0 0-.755 1.633 6.845 6.845 0 0 0-.254 1.85c0 .672.102 1.321.303 1.946a5.5 5.5 0 0 0 .838 1.657c.362.479.797.86 1.309 1.141a3.5 3.5 0 0 0 1.706.42l.997-.131.995-.41.868-.72c.253-.296.463-.662.624-1.092l3.242 1.898a5.168 5.168 0 0 1-1.119 1.681 6.852 6.852 0 0 1-1.668 1.247 8.569 8.569 0 0 1-4.036 1.033c-1.183 0-2.269-.252-3.253-.755a8.27 8.27 0 0 1-2.547-2.006 9.478 9.478 0 0 1-1.668-2.833 8.993 8.993 0 0 1-.6-3.22"
                            clip-path="url(#e)" />
                        <path fill="#7c7b7b"
                            d="M141.499 29.694c-1.216 0-2.322-.247-3.315-.744a8.3 8.3 0 0 1-2.558-1.957 8.878 8.878 0 0 1-1.657-2.776 9.026 9.026 0 0 1-.59-3.216c0-1.12.204-2.202.614-3.244a8.757 8.757 0 0 1 1.704-2.751 8.34 8.34 0 0 1 2.595-1.896c1-.472 2.094-.708 3.277-.708 1.216 0 2.324.247 3.315.743a8.24 8.24 0 0 1 2.56 1.97 8.91 8.91 0 0 1 1.644 2.786 9.104 9.104 0 0 1 .576 3.171 8.791 8.791 0 0 1-.612 3.242 8.85 8.85 0 0 1-1.692 2.752 8.313 8.313 0 0 1-2.582 1.908 7.472 7.472 0 0 1-3.28.72m-4.108-8.644c0 .655.094 1.29.278 1.907.183.617.448 1.165.792 1.646a3.884 3.884 0 0 0 1.297 1.154 3.641 3.641 0 0 0 1.79.43c.689 0 1.289-.152 1.8-.457a4.11 4.11 0 0 0 1.287-1.187 5.284 5.284 0 0 0 .768-1.657 7.26 7.26 0 0 0 .252-1.885c0-.657-.093-1.295-.278-1.91a5.131 5.131 0 0 0-.803-1.634 4.01 4.01 0 0 0-1.298-1.13c-.512-.28-1.097-.419-1.754-.419-.687 0-1.287.148-1.799.444a4.094 4.094 0 0 0-1.286 1.165 5.26 5.26 0 0 0-.78 1.644 6.76 6.76 0 0 0-.266 1.889"
                            clip-path="url(#f)" />
                        <path fill="#7c7b7b"
                            d="M151.97 29.55V12.497h7.686c.8 0 1.54.17 2.222.505a5.892 5.892 0 0 1 1.765 1.322c.497.545.883 1.16 1.165 1.849a5.539 5.539 0 0 1 .42 2.09 6.16 6.16 0 0 1-.19 1.522 6.029 6.029 0 0 1-.554 1.384 5.274 5.274 0 0 1-2.041 2.041l3.917 6.34h-4.445l-3.435-5.499h-2.571v5.5zm3.939-8.937h3.603c.464 0 .865-.216 1.2-.658.338-.441.506-1.004.506-1.692 0-.706-.192-1.265-.576-1.684-.384-.415-.803-.622-1.249-.622h-3.487zM180.289 26.092v3.458h-11.987V12.497h11.768v3.46h-7.83v3.314h6.727v3.193h-6.726v3.628z" />
                        <path fill="#87bd25" d="M97.613 115.826H53.66V44.318h43.952z" />
                        <path fill="#fc0" d="M141.562 115.826h-43.95V44.318h43.95z" />
                        <path fill="#ef7d00" d="M185.515 115.826h-43.953V44.318h43.953z" />
                        <path fill="#74ab7e"
                            d="m27.522 85.165 4.854-12.702 4.666 12.702zm7.163-20.97h-4.277L17.19 96.065h6.2l2.304-6.097h13.124l2.262 6.097h6.775z" />
                        <path fill="#bdd684"
                            d="M70.609 91.26v-9.006h3.027c5.625.045 7.452 1.708 7.452 4.341 0 3.28-2.405 4.665-7.068 4.665zm0-13.441v-8.823h1.827c4.855 0 6.825 1.432 6.825 4.297 0 2.632-1.875 4.433-5.817 4.48zm2.597-13.627h-8.752v31.872h9.855c9.28 0 13.078-3.74 13.078-9.469 0-3.142-1.733-5.634-5.339-7.066 2.068-1.618 3.51-3.88 3.51-6.792 0-4.712-3.318-8.545-12.352-8.545"
                            clip-path="url(#g)" />
                        <path fill="#ffdf7d"
                            d="M120.327 63.73c-8.556 0-15.14 6.376-15.14 16.353 0 10.027 6.057 16.447 15.237 16.447 5.912 0 10.142-2.31 12.784-6.7l-4.615-3.372c-1.873 3.05-4.468 4.76-7.929 4.76-5.865 0-9.135-4.067-9.135-11.181 0-6.652 3.365-10.992 8.557-10.992 3.414 0 5.912 1.708 7.115 4.618l5.863-2.171c-1.922-4.48-5.43-7.761-12.737-7.761"
                            clip-path="url(#h)" />
                        <path fill="#fff"
                            d="M206 129.998c-16.566 0-30.043-12.466-30.043-27.788V57.936c0-15.324 13.477-27.79 30.043-27.79h3.118c16.568 0 30.045 12.466 30.045 27.79v44.274c0 15.322-13.477 27.788-30.045 27.788z"
                            clip-path="url(#i)" />
                        <path fill="#e63312"
                            d="M209.118 124.761H206c-13.7 0-24.806-10.096-24.806-22.55V57.935c0-12.455 11.106-22.551 24.806-22.551h3.118c13.702 0 24.808 10.096 24.808 22.55v44.275c0 12.455-11.106 22.551-24.808 22.551"
                            clip-path="url(#j)" />
                        <path fill="#fff"
                            d="M194.496 100.849V58.353h27.653v8.684h-16.875v7.45h11.64v8.747h-11.64v8.93h17.243v8.685z" />
                        <path fill="#f8b472"
                            d="M152.28 91.262V69.09h3.463c7.642 0 11.345 4.065 11.345 11.04 0 6.376-3.992 11.133-12.113 11.133zm3.512-27.07h-9.664v31.872h8.99c11.392 0 18.315-6.788 18.315-15.935 0-9.976-6.442-15.937-17.641-15.937"
                            clip-path="url(#k)" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</Transition></template>

<style scoped>.v-enter-active,
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
}</style>