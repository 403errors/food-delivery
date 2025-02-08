import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import { food_list } from '../frontend/src/assets/frontend_assets/assets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadFoodItems() {
    for (const foodItem of food_list) {
        const formData = new FormData();
        formData.append('name', foodItem.name);
        formData.append('description', foodItem.description);
        formData.append('price', foodItem.price);
        formData.append('category', foodItem.category);

        // Full path to image
        const imagePath = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'frontend_assets', foodItem.image);
        
        if (fs.existsSync(imagePath)) {
            formData.append('image', fs.createReadStream(imagePath)); // Send image as stream
        } else {
            console.warn(`Image not found: ${foodItem.image}, skipping ${foodItem.name}`);
            continue;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/food/add', formData, {
                headers: formData.getHeaders(),
            });
            console.log(`✅ Uploaded: ${foodItem.name}`);
        } catch (error) {
            console.error(`❌ Failed: ${foodItem.name}`, error.response?.data || error.message);
        }
    }
}

uploadFoodItems();