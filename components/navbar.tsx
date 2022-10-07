import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='w-1/2 mx-auto py-4 flex flex-col'>
      <Link href='/'>
        <h1 className='text-4xl font-bold'><a className='text-inherit hover:text-inherit'>GamingWorth</a></h1>
      </Link>
      <div className='pt-4 flex justify-between'>
        <div className='flex flex-col space-y-2'>
          <p>GamingWorthは、ゲーム(esports)のことを中心に好きなことを話すPodcastです。</p>
          <Link href='/about'><a>About</a></Link>
        </div>
        <div>
          <h2 className='font-bold'>Subscribe</h2>
          <ul className='text-sm'>
            <li><a>RSS</a></li>
            <li><a>Apple Podcast</a></li>
            <li><a>Google Podcasts</a></li>
            <li><a>Spotify</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar