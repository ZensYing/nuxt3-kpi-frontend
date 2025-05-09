// Types for Facebook Video API responses
export interface FacebookVideoStats {
    id: string;
    title: string;
    description?: string;
    created_time: string;
    thumbnail_url: string;
    views: number;
    engagement: {
      likes: number;
      comments: number;
      shares: number;
    };
    duration: number;
  }
  
  // Types for our application state
  export interface VideoTrackingState {
    videos: FacebookVideoStats[];
    isLoading: boolean;
    error: string | null;
    dateRange: {
      start: string;
      end: string;
    };
  }