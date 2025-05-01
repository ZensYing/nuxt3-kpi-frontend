
// Create a file in your server/api directory: server/api/ping.ts
export default defineEventHandler((event) => {
    // This is just a simple endpoint that returns quickly for ping tests
    return {
      timestamp: Date.now(),
      status: 'ok'
    }
  })
  