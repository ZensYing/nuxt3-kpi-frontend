/**
 * Script to generate a long-lived Facebook access token
 * 
 * Usage: 
 * 1. Make sure your .env file is set up with correct Facebook credentials
 * 2. Run with: npx tsx scripts/generateFacebookToken.ts <short-lived-token>
 */

import * as dotenv from 'dotenv';
import { exchangeForLongLivedToken, getPageAccessToken } from '../server/utils/facebookTokenManager';

// Load environment variables
dotenv.config();

async function main() {
  // Get short-lived token from command line argument
  const shortLivedToken = process.argv[2];
  
  if (!shortLivedToken) {
    console.error('Please provide a short-lived token as argument');
    console.log('Usage: npx tsx scripts/generateFacebookToken.ts <short-lived-token>');
    process.exit(1);
  }
  
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  if (!appId || !appSecret || !pageId) {
    console.error('Missing required environment variables. Please check your .env file');
    process.exit(1);
  }
  
  try {
    console.log('Exchanging for long-lived user token...');
    
    // Step 1: Exchange short-lived token for long-lived user token
    const longLivedTokenResponse = await exchangeForLongLivedToken(
      appId,
      appSecret,
      shortLivedToken
    );
    
    console.log('Long-lived user token obtained. Expires in:', Math.floor(longLivedTokenResponse.expires_in / 86400), 'days');
    
    // Step 2: Get permanent page access token
    console.log(`Getting permanent page access token for page ID: ${pageId}...`);
    const pageAccessToken = await getPageAccessToken(
      pageId,
      longLivedTokenResponse.access_token
    );
    
    console.log('\n===== RESULT =====');
    console.log('Page Access Token (never expires):');
    console.log(pageAccessToken);
    console.log('\nAdd this token to your .env file as FACEBOOK_ACCESS_TOKEN');
    
  } catch (error) {
    console.error('Error generating tokens:', error);
    process.exit(1);
  }
}

main();