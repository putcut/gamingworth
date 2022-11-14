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
        <Link href='/about'><a>About</a></Link>
      </div>
      <div>
        <h2 className='font-bold'>Subscribe</h2>
        <ul className='text-sm'>
          <li><a href='https://gamingworth.net/feed.xml'>RSS</a></li>
          <li><a href='https://itunes.apple.com/jp/podcast/gamingworth/id1336050155?mt=2'>Apple Podcast</a></li>
          <li><a href='https://podcasts.google.com/feed/aHR0cHM6Ly9nYW1pbmd3b3J0aC5uZXQvZmVlZC54bWw?hl=ja'>Google Podcasts</a></li>
          <li><a href='https://open.spotify.com/show/2IIEZFfkXSvRPOlN3dgvgg'>Spotify</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar