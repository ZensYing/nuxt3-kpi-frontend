import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { videoId } = getQuery(event) as { videoId?: string };

  if (!videoId) {
    throw createError({
      statusCode: 400,
      message: 'Video ID is required',
    });
  }

  try {
    // Example: https://graph.facebook.com/{video-id}?fields=title,description,views&access_token={token}
    const response = await $fetch(`https://graph.facebook.com/v22.0/${videoId}`, {
      params: {
        fields: 'id,title,views,post_views,created_time,post_id',
        access_token:'EAAKCHp5sijABOw4qMap4t8QIccCRlZCUDPsaLrq9jxzoOaTjz1O5svFKt3yZCTKfkgbn4vukuZALPZCOCtXZAQFqit2EUP9ZAzFYc7wXAnLOZBr2KZCDlnonas2tDpOj9VsVkmfqoJ5Qlpc3wJR9CoLCRRkMRlvYEkeJgFXaDC5wVQvA3bUGJCZADTGFkPZAOLlZBPZAqk8zWZBPUeZCAbiu2t7G4o7N5rRkoO4ZBPuWYhhe4sZD'
      }
    });
    
    return response;
  } catch (error: any) {
    console.error('Facebook API error:', error);
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.response?._data?.error?.message || 'Failed to fetch video data from Facebook',
    });
  }
});