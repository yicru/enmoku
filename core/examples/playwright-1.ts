import { defineConfig } from '../config.ts'

export default defineConfig({
  launch: {
    options: {
      headless: false,
    },
  },
  blocks: [
    {
      type: 'goto',
      url: 'https://playwright.dev/',
    },
    {
      type: 'expect',
      title: /Playwright/,
    },
  ],
})
