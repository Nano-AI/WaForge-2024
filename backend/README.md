# Backend
For the back end, make sure to install the [Open Food Facts data export as a MongoDB](https://world.openfoodfacts.org/data), and place it a folder named `models` within the backend folder, such that the structure looks similar to this:
```
- backend 
  |-> models
    |-> products.bson
    |-> products.meta.json
```

Get an API key from [Google's AI Studio](https://aistudio.google.com/app/apikey) and enter it into `template.env`, and rename the file to `.env`