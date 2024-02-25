# Backend
For the back end, make sure to install the [Open Food Facts data export as a MongoDB](https://world.openfoodfacts.org/data). Extract the file, and run `mongorestore dump/` on the dump file. After doing so, a new database will be created within the MongoDBCompass.

Get an API key from [Google's AI Studio](https://aistudio.google.com/app/apikey) and enter it into `template.env`, and rename the file to `.env`