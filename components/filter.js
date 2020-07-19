import Instagram from 'components/ig'
import Snapchat from 'components/snapchat'

export default function Filter({ mediaType, mediaUrl, name, description, id, platforms, poster }) {
  let media = null
  if (mediaType === 'image') {
    media = <img src={mediaUrl} className="w-full" />
  } else {
    // video
    media = (
      <video loop muted autoPlay className="w-full" poster={poster}>
        <source src={mediaUrl} type="video/mp4" />
      </video>
    )
  }
  const platformIds = Object.keys(platforms)
  return (
    <div key={id} className="my-4">
      {media}
      <h2 className="font-bold text-2xl text-left">{name}</h2>
      <div className="flex flex-col lg:flex-row mb-2 lg:mb-0">
        <span className="font-bold mr-2">Platforms:&nbsp;</span>
        <div className="flex flex-row space-between">
          {platformIds.map(platformId => {
            const platformUrl = platforms[platformId]
            if (platformId === 'instagram') {
              return (
                <a href={platformUrl} className="order-1 mr-2" target="_blank" rel="noopener noreferrer">
                  <Instagram width={25} />
                </a>
              )
            } else if (platformId === 'snapchat') {
              return (
                <a href={platformUrl} className="order-2 mr-2" target="_blank" rel="noopener noreferrer">
                  <Snapchat width={25} />
                </a>
              )
            } else {
              return (<></>)
            }
          })}
        </div>
      </div>
      {
        description.split('\\n').map(paragraph => (
          <p className="text-justify text-base mb-4 lg:mt-2">
            {paragraph}
          </p>
        ))
      }
    </div>
  )
}