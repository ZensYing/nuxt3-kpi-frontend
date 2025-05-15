// server/api/reports.ts
import { defineEventHandler, createError } from 'h3'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  try {
    // Fetch the HTML content from the target website
    const response = await axios.get('https://reports.business-cambodia.com/')
    const html = response.data
    
    // Parse the HTML using cheerio
    const $ = cheerio.load(html)
    
    // Extract report data
    // Note: You'll need to adjust these selectors based on the actual structure of the website
    const reports: {
      id: number
      title: string
      description: string
      imageUrl: string
      link: string
      date: string
    }[] = []
    
    $('.report-card, .article-item').each((i, el) => {
      const title = $(el).find('.title, h2, h3').text().trim()
      const description = $(el).find('.description, .excerpt, p').text().trim()
      const imageUrl = $(el).find('img').attr('src') || ''
      const link = $(el).find('a').attr('href') || ''
      
      // Only add items that have at least a title
      if (title) {
        reports.push({
          id: i + 1,
          title,
          description,
          imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://reports.business-cambodia.com${imageUrl}`,
          link: link.startsWith('http') ? link : `https://reports.business-cambodia.com${link}`,
          date: new Date().toISOString().split('T')[0] // Fallback date if not available from scraping
        })
      }
    })
    
    return {
      success: true,
      reports
    }
  } catch (error) {
    console.error('Error fetching reports:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch reports from business-cambodia.com'
    })
  }
})