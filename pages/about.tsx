import type { NextPage } from 'next'

import Layout from '../components/layout'
import Seo from '../components/seo'

const About: NextPage = () => {
  return (
    <>
      <Seo title={process.env.NEXT_PUBLIC_SITE_NAME!} description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION!} />
      <Layout>
        <article className='space-y-4'>
          <h1 className='text-3xl dark:text-slate-50'>About</h1>
          <p>GamingWorthは、ゲーム(esports)のことを中心に好きなことを話すPodcastです。ゲームの他に、アニメやマンガなど、オタクが日々を過ごす中で気になった話題などを取り上げて話しています。</p>
          <div className='space-y-4'>
            <h2 className='text-2xl'>話し手</h2>
            <div className='space-y-2'>
              <h3 className='text-xl'><a href='https://twitter.com/putcutt'>putcut</a></h3>
              <p>Podcast企画者、運営者。主に進行役。</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl'><a href='https://twitter.com/hukuzoumoguro'>mozk</a></h3>
              <p>主に聞き役。</p>
            </div>
          </div>

        </article>
      </Layout>
    </>
  )
}

export default About