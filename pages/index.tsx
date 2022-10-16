import path from 'path'
import fsPromise from 'fs/promises'

import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import ReactDOMServer from 'react-dom/server'

import RSS from 'rss'

import Layout from '../components/layout'
import Seo from '../components/seo'
import { PostInterface } from '../libs/PostInterface'
import { getAllFilesFrontMatter } from '../libs/mdx';

interface Props {
  posts: PostInterface[]
}

const INDEX_POST_SIZE = 10;
const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllFilesFrontMatter()

  const feedConfigPath = path.join(process.cwd(), 'feed-config.json')
  const feedConfig = await fsPromise.readFile(feedConfigPath)
  const feedConfigJson = JSON.parse(feedConfig.toString())
  const feed = new RSS({
    title: feedConfigJson.title,
    description: feedConfigJson.description,
    feed_url: feedConfigJson.feedUrl,
    site_url: feedConfigJson.siteUrl,
    managingEditor: feedConfigJson.author.name,
    webMaster: feedConfigJson.author.name,
    copyright: feedConfigJson.copyright,
    language: feedConfigJson.language,
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      'media': 'http://search.yahoo.com/mrss/'
    },
    custom_elements: [
      {'itunes:author': feedConfigJson.author.name},
      {'itunes:explicit': 'False'},
      {'itunes:image': {
        _attr: {
          href: feedConfigJson.siteUrl + '/artwork.png'
        }
      }},
      {'itunes:keywords': feedConfigJson.itunes.keywords},
      {'itunes:subtitle': feedConfigJson.itunes.subtitle},
      {'itunes.summary': feedConfigJson.description},
      {'itunes:category': [
        {_attr: {
          text: 'Leisure'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Animation & Manga'
          }
        }},
        {'itunes:category': {
          _attr: {
            text: 'Video Games'
          }
        }}
      ]},
      {'itunes:owner': [
        {'itunes:name': feedConfigJson.author.name},
        {'itunes:email': feedConfigJson.author.email}
      ]}
    ]
  })
  posts.forEach(post => {
    const description = createFeedItemDescription(post)
    feed.item({
      title: post.slug + '. ' + post.title,
      description: ReactDOMServer.renderToString(description),
      date: post.date,
      url: feedConfigJson.siteUrl + '/posts/' + post.slug,
      enclosure: {
        url: feedConfigJson.siteUrl + post.src,
        size: post.size,
        type: 'audio/mpeg'
      }
    })
  })
  fsPromise.writeFile('public/feed.xml', feed.xml())

  // const indexPosts = posts.slice(0, INDEX_POST_SIZE);
  return { props: { posts } }
}

const createFeedItemDescription = (post: PostInterface) => {
  return (
    <>
      <p>{post.description}</p>
      <ul>
        {post.feedDescriptions.map((feedDescription, index) => (
          <li key={index}>
            {feedDescription.url === undefined ?
              <>{feedDescription.text}</>
              :
              <a href={feedDescription.url}>{feedDescription.text}</a>
            }
          </li>
        ))}
      </ul>
    </>
  )
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <>
      <Seo title={process.env.NEXT_PUBLIC_SITE_NAME!} description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION!} />
      <Layout>
        <div className='pt-8 space-y-8'>
          {posts.map((post, index) => (
            <div key={index}>
              <p className='text-sm'>{post.date}</p>
              <Link href={post.slug}>
                <p className='text-3xl inline-block'><a>{post.slug}. {post.title}</a></p>
              </Link>
              <p className='pt-2'>{post.description}</p>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export { getStaticProps }
export default Home
