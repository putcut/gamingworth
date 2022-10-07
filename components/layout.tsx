import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='border-b'>
        <Navbar />
      </div>
      <main className='xl:w-1/2 mx-auto py-8 grow'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout