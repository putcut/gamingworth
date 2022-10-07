import { FrontMatterInterface } from "./FrontMatterInterface";

export interface PostInterface extends FrontMatterInterface {
  slug: string
  descriptions: LinkInterface[]
}

export interface LinkInterface {
  text: string
  url?: string
}