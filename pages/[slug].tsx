import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import Layout from '../components/layout'
import Seo from '../components/seo'
import MDXComponents from '../components/mdxComponents'
import TweetButton from '../components/tweetButton'
import { PostInterface } from '../libs/PostInterface'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '../libs/mdx'
import style from '../styles/Post.module.css'

interface Props {
  post: {
    mdxSource: MDXRemoteSerializeResult
    frontMatter: PostInterface
  }
  prev?: PostInterface
  next?: PostInterface
}

const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles()
  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: formatSlug(post)
        }
      }
    }),
    fallback: false
  }
}

const getStaticProps: GetStaticProps<Props> = async (context) => {
  const posts = await getAllFilesFrontMatter()
  const postIndex = posts.findIndex(post => post.slug === context.params?.slug)
  const prev = posts[postIndex + 1] || null
  const next = posts[postIndex - 1] || null
  const post = await getFileBySlug(context.params?.slug as string)
  return { props: { post, prev, next } }
}

const Post: NextPage<Props> = ({ post, prev, next }) => {
  const { mdxSource, frontMatter } = post
  const router = useRouter()
  if (!router.isFallback && !frontMatter?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Seo title={process.env.NEXT_PUBLIC_SITE_NAME!} description={frontMatter.description} />
      <Layout>
        <article className={`${style.post} space-y-8`}>
          <div className='flex space-x-2 items-center'>
            <p className='text-sm'>{frontMatter.date}</p>
            <TweetButton text={frontMatter.title} url={`${process.env.NEXT_PUBLIC_SITE_URL}/${frontMatter.slug}`} />
          </div>
          <h1 className='text-3xl dark:text-slate-50'>{frontMatter.slug}. {frontMatter.title}</h1>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </Layout>
    </>
  )
}

export { getStaticPaths, getStaticProps }
export default Post