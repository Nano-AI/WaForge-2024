const request = require('request');
const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');

app.use(express.json());

const PORT = process.env.PORT || 3000;
// const DB_URL = process.env.DB_URL;
const DB_URL = "mongodb://0.0.0.0:27017\?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5";

const client = new MongoClient(DB_URL);

const database = client.db('off');
const products = database.collection('products');

const filtered_products = ['nova_groups_tags', 'product_name_en', 'product_name', 'ingredients_text', 'ingredients', 'ingredients_text_with_allergens', 'ingredients_text_en', 'ingredients_text_with_allergens_en', 'ingredients_text_en_imported', 'nutrient_levels_tags', 'food_groups', 'brand_owner', 'ingredients_analysis', 'data_quality_warnings_tags', 'nutriments', 'ingredients_tags', 'additives_original_tags', 'additives_original_tags', 'serving_quantity', '_keywords', 'serving_size', 'nutrient_levels', 'ingredients_without_ciqual_codes', 'nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients', 'allergens_tags ', 'nutriscore_data', 'nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients', 'pnns_groups_1', 'additives_old_tags', 'food_groups_tags', 'ecoscore_data', 'ingredients_text_with_allergens', 'allergens', 'last_modified_by', 'nutriscore', 'ingredients_analysis_tags', 'ingredients_text_en', 'serving_size_imported', 'nutriscore_version', 'categories_tags', 'ingredients_text_with_allergens_en', 'nova_groups_markers', 'nutriscore_tags', 'allergens_hierarchy', 'allergens_from_ingredients', 'ingredients_original_tags', 'brand_owner_imported', 'data_quality_tags', 'ingredients_hierarchy'];

async function get(id) {
  try {
    const query = {"_id": id};
    const result = await products.findOne(query);
    return result;
  } finally {
    // await client.close();
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

async function getDetails(id) {
  let data = await get(id);
  let output = {};
  for (let field in filtered_products) {
    output[filtered_products[field]] = data[filtered_products[field]];
  }
  return output;
}

app.get('/api/product/:id', (req, res) => {
  let id = req.params.id;
  getDetails(id).then((result) => {
    res.json(result);
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Error getting product. ' });
  });
});

app.get('/api/summary/:id', (req, res) => {
  let id = req.params.id;
  getDetails(id).then((result) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": process.env.SUMMARY_PRETEXT + " " + JSON.stringify(result) 
            }
          ]
        }
      ]
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GENERATIVE_API_KEY, requestOptions)
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(error => res.status(500).json({"message" : error})); 
  }).catch((error) => {
    res.status(500).json({ message: 'Error getting product.' });
  });
});
