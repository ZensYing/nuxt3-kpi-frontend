// utils/facebook.ts
import type { FacebookVideoData } from '~/types/facebook';

/**
 * Extracts a Facebook video ID from various URL formats or returns the direct ID
 * @param url Facebook video URL or direct ID
 * @returns Extracted video ID or empty string if invalid
 */
export const extractVideoId = (url: string): string => {
  // Handle direct ID input
  if (/^\d+$/.test(url)) {
    return url;
  }

  // Handle various Facebook URL formats
  const patterns = [
    /facebook\.com\/watch\?v=(\d+)/,
    /facebook\.com\/.*\/videos\/(\d+)/,
    /fb\.watch\/(\d+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
};

/**
 * Validates if the input can be processed to extract a Facebook video ID
 * @param input Facebook URL or ID to validate
 * @returns boolean indicating if input is valid
 */
export const isValidVideoInput = (input: string): boolean => {
  if (!input) return false;
  return extractVideoId(input) !== '';
};

/**
 * Builds a standard Facebook video URL from a video ID
 * @param videoId Facebook video ID
 * @returns Formatted Facebook video URL
 */
export const buildFacebookVideoUrl = (videoId: string): string => {
  return `https://www.facebook.com/watch?v=${videoId}`;
};