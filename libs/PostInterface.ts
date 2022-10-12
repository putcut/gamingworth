import { FrontMatterInterface } from './FrontMatterInterface';

export interface PostInterface extends FrontMatterInterface {
  slug: string
  feedDescriptions: LinkInterface[]
}

export interface LinkInterface {
  text: string
  url?: string
}