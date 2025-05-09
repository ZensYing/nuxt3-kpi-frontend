import { defineEventHandler, getQuery, createError } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { videoId } = getQuery(event) as { videoId?: string };

  if (!videoId) {
    throw createError({
      statusCode: 400,
      message: 'Video ID is required',
    });
  }

  try {
    // Use the access token from runtime config
    const accessToken = config.facebook?.accessToken;
    
    if (!accessToken) {
      throw createError({
        statusCode: 500,
        message: 'Facebook access token not configured',
      });
    }
    
    // Fetch video data from Facebook Graph API
    const response = await $fetch(`https://graph.facebook.com/v22.0/${videoId}`, {
      params: {
        fields: 'id,title,views,post_views,created_time,post_id',
        access_token: accessToken
      }
    });
    
    return response;
  } catch (error: any) {
    console.error('Facebook API error:', error);
    
    // Handle specific Facebook API errors
    if (error?.response?._data?.error?.code === 190) {
      console.error('Access token expired or invalid');
    }
    
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.response?._data?.error?.message || 'Failed to fetch video data from Facebook',
    });
  }
});