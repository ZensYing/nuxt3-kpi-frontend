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
        access_token:'EAAKCHp5sijABO2D5CMtYvV5zyLfGZBHmNWUGR5OpC7DQKKJkZAY0HBXU80KrpjSrQFcQiuLnzy0M4egPhpfuMqvbXbuDgcxrmktnftbWZAsheaPqbojDxRUzpZBuwIz3kcFRhZB7qYqW7nnS1X1rujAm2TKDZBpwF2oQGlZAGhWgZBBEIZA3jqCkw6aTcim2CY8wyhS1IOTwvhRtuDZCRT5E8USB3cCNao1y1RoPQjhIwZD'
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