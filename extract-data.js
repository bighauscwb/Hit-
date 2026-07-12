import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function extractSnapchatData() {
  const apiKey = process.env.SNAPCHAT_API_KEY;
  const handle = process.env.SNAPCHAT_HANDLE || 'Haydogyy1';

  if (!apiKey) {
    console.error('ERROR: SNAPCHAT_API_KEY not found in .env file');
    console.error('Please create a .env file with: SNAPCHAT_API_KEY=your_new_key');
    process.exit(1);
  }

  try {
    console.log('Fetching data for handle:', handle);
    const response = await axios.get(
      `https://api.scrapecreators.com/v1/snapchat/profile?handle=${encodeURIComponent(handle)}`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );

    // Save data to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `snapchat-data-${timestamp}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(response.data, null, 2));
    console.log(`✓ Data extracted successfully and saved to: ${filename}`);
    console.log('Your data:', response.data);
    
  } catch (error) {
    console.error('✗ Failed to extract data:', error.message);
    if (error.response?.status === 401) {
      console.error('Unauthorized: Check that your API key is valid');
    }
    process.exit(1);
  }
}

extractSnapchatData();
