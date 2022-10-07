import Head from 'next/head'

type Props = {
  title: string
  description?: string
}

const Seo = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default Seo