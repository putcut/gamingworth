import { VscTwitter } from 'react-icons/vsc'

type Props = {
  text: string
  url: string
}

const TweetButton = (props: Props) => {
  const { text, url } = props
  const _url = new URL('https://twitter.com/intent/tweet')
  _url.searchParams.set('text', text)
  _url.searchParams.set('url', url)
  return (
    <a
      className='px-2 bg-twitter text-sm text-white rounded hover:bg-twitterHover hover:text-white'
      href={_url.toString()}
    >
      <VscTwitter className='inline' />
      <span className='pl-1 align-middle'>Tweet</span>
    </a>
  )
}

export default TweetButton