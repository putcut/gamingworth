import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='w-1/2 mx-auto py-4 flex justify-between'>
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
          <li><a>RSS</a></li>
          <li><a>Apple Podcast</a></li>
          <li><a>Google Podcasts</a></li>
          <li><a>Spotify</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar