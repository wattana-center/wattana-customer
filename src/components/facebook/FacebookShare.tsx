import React from 'react'
// import useFacebook from './useFacebook'

interface IFacebookShare {
  url: string
}

const FacebookShare: React.FC<IFacebookShare> = (props) => {
  const { url } = props
  const facebook = true

  return (
    <>
      <div>
        {facebook && (
          <iframe
            src={`https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=large&appId=2719580855019433&width=78&height=28`}
            width="78"
            height="28"
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          // <div
          //   className="fb-share-button"
          //   data-href={url}
          //   data-layout="button_count"
          //   data-size="large">
          //   <a
          //     target="_blank"
          //     href={`https://www.facebook.com/sharer/sharer.php?u=${url}%2F&amp;src=sdkpreparse`}
          //     className="fb-xfbml-parse-ignore">
          //     แชร์
          //   </a>
          // </div>
        )}
      </div>
    </>
  )
}

export { FacebookShare }
