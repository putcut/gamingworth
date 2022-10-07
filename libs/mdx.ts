import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

import { PostInterface, LinkInterface } from './PostInterface'
import { FrontMatterInterface } from './FrontMatterInterface'

const postsDirectory = path.join(process.cwd(), "posts")

export const formatSlug = (fileName: string) => {
  return fileName.replace(/\.(mdx|md)/, "")
}

export const getFiles = async () => {
  return fs.readdirSync(postsDirectory)
}

export const getFileBySlug = async (slug: string) => {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const source = fs.readFileSync(mdxPath, "utf8")
  const { data, content } = matter(source)
  const mdxSource = await serialize(content)
  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data
    } as PostInterface
  }
}

export const getAllFilesFrontMatter = async () => {
  const files = await getFiles()

  const frontMatters: PostInterface[] = []

  files.forEach(file => {
    const source = fs.readFileSync(path.join(postsDirectory, file), "utf8")
    const { data, content } = matter(source)

    // feed item description 用のオブジェクトを作る
    const descriptions: LinkInterface[] = []
    const lines = content.replace(/<MP3.*\/>/, '').replace(/\n/g, '').split('- ')
    lines.forEach((line) => {
      if (line === '') return
      const splitedForLink = line.replace(/^\[/, '').replace(/\)$/, '').split('\]\(')
      if (splitedForLink.length === 1) {
        descriptions.push({ text: splitedForLink[0]})
      }
      if (splitedForLink.length === 2) {
        descriptions.push({ text: splitedForLink[0], url: splitedForLink[1] })
      }
    })

    frontMatters.push({ ...data as FrontMatterInterface, slug: formatSlug(file), descriptions: descriptions })
  })

  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1))
}