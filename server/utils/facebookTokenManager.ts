import { $fetch } from 'ofetch';

/**
 * Facebook token manager to handle token exchange and refreshing
 */
export interface FacebookTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function exchangeForLongLivedToken(
  appId: string,
  appSecret: string,
  shortLivedToken: string
): Promise<FacebookTokenResponse> {
  try {
    const response = await $fetch<FacebookTokenResponse>(
      'https://graph.facebook.com/v22.0/oauth/access_token',
      {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: shortLivedToken
        }
      }
    );
    
    // Add token expiration timestamp for reference
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + response.expires_in;
    
    console.log(`Long-lived token acquired. Expires at: ${new Date(expirationTime * 1000).toISOString()}`);
    
    return response;
  } catch (error: any) {
    console.error('Failed to exchange for long-lived token:', error?.response?._data || error);
    throw error;
  }
}

export async function getPageAccessToken(
  pageId: string, 
  userAccessToken: string
): Promise<string> {
  try {
    const response = await $fetch<{ access_token: string }>(
      `https://graph.facebook.com/v22.0/${pageId}`,
      {
        params: {
          fields: 'access_token',
          access_token: userAccessToken
        }
      }
    );
    
    console.log('Page access token acquired (never expires)');
    
    return response.access_token;
  } catch (error: any) {
    console.error('Failed to get page access token:', error?.response?._data || error);
    throw error;
  }
}