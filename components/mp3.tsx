type MP3Props = {
  src: string
}

const MP3 = (props: MP3Props) => {
  const { src } = props
  return (
    <audio
      src={src}
      preload='auto'
      controls
    />
  )
}

export default MP3