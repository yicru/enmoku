import * as path from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'
import { expect } from 'playwright/test'
import type { Config } from './types.ts'

const start = async (config: Config) => {
  const { blocks } = config

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  for await (const block of blocks) {
    if (block.type === 'goto') {
      await page.goto(block.url)
    }

    if (block.type === 'expect') {
      if ('title' in block) {
        await expect(page).toHaveTitle(block.title)
      }
      if ('url' in block) {
        await expect(page).toHaveURL(block.url)
      }
    }
  }

  await browser.close()
}

const main = async () => {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      config: {
        type: 'string',
      },
    },
    strict: true,
    allowPositionals: true,
  })

  if (!values.config) {
    console.error('config is required')
    process.exit(1)
  }

  const configPath = path.join(process.cwd(), values.config)
  const config = await import(configPath)
  await start(config.default)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
