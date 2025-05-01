// Create a file in your server/api directory: server/api/connection-test.ts
export default defineEventHandler((event) => {
    // Generate a small payload (about 50KB) to test download speed
    const payload = new Array(50000).fill('A').join('');
    return payload;
  })