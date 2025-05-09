export interface FacebookVideoData {
    id: string;
    title: string;
    views: number;
    likes?: number; // Optional since it's not in the API response
    shares?: number; // Optional since it's not in the API response
    post_views?: number;
    post_id: string;
    thumbnailUrl: string;
    created_time: string;
    createdTime: string;
  }