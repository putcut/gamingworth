import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='md:w-1/2 mx-auto flex justify-between'>
      <div className='flex flex-col space-y-4'>
        <Link href='/'>
          <h1 className='text-4xl font-bold dark:text-slate-50'>
            <a className='text-inherit hover:text-inherit'>{process.env.NEXT_PUBLIC_SITE_NAME}</a>
          </h1>
        </Link>
        <p>{process.env.NEXT_PUBLIC_SITE_DESCRIPTION!}</p>
        <div className='flex space-x-4'>
          <Link href='/about'><a>About</a></Link>
          <a href='https://suzuri.jp/putcut'>Goods</a>
        </div>
      </div>
      <div>
        <h2 className='font-bold'>Subscribe</h2>
        <ul className='text-sm'>
          <li><a href='https://gamingworth.net/feed.xml'>RSS</a></li>
          <li><a href='https://podcasts.apple.com/us/podcast/gamingworth/id1680396598'>Apple Podcast</a></li>
          <li><a href='https://podcasts.google.com/feed/aHR0cHM6Ly9nYW1pbmd3b3J0aC5uZXQvZmVlZC54bWw?hl=ja'>Google Podcasts</a></li>
          <li><a href='https://open.spotify.com/show/2IIEZFfkXSvRPOlN3dgvgg'>Spotify</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar