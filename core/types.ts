import type { LaunchOptions } from 'playwright'

type GoToBlock = {
  type: 'goto'
  url: string
}

type ExpectTitleBlock = {
  type: 'expect'
  title: string | RegExp
}

type ExpectUrlBlock = {
  type: 'expect'
  url: string | RegExp
}

type CustomBlock = {
  type: 'custom'
}

type ExpectBlock = ExpectTitleBlock | ExpectUrlBlock

type Block = GoToBlock | ExpectBlock

export type Config = {
  launch?: {
    options?: LaunchOptions
  }
  blocks: Block[]
}
