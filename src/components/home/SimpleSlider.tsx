import Slider, { Settings } from 'react-slick'

import React from 'react'
import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

interface ICustomSlide {
  index: number
  url: string
  color: string
}

const CustomSlide: React.FC<ICustomSlide> = (props) => {
  const { ...rest } = props
  const classes = useStyles()

  return (
    <div {...rest} style={{ backgroundColor: '#fff' }}>
      <div
        className={classes.images}
        style={{
          background: `url(${props.url})`,
          backgroundColor: `${props.color}`
        }}></div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    borderTop: '400px solid #339790',
    borderLeft: '5px solid #339790',
    position: 'absolute',
    [WattanaTheme.breakpoints.down('lg')]: {
      borderTop: '200px solid #339790'
    }
  },
  images: {
    height: 400,
    padding: 25,
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: 'center !important',
    backgroundSize: 'contain !important',
    [WattanaTheme.breakpoints.down('lg')]: {
      height: 200
    }
  }
}))

export function SimpleSlider(): JSX.Element {
  const route = useRouter()
  const classes = useStyles()
  const settings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div>
        <div className={classes.root}></div>
        <Slider {...settings}>
          <CustomSlide
            color="rgb(172, 222, 223)"
            url={`${route.basePath}/slick/989.png`}
            index={1}
          />
          <CustomSlide
            color="rgb(245, 242, 241)"
            url={`${route.basePath}/slick/4423.png`}
            index={2}
          />
          {/* <CustomSlide index={3} />
          <CustomSlide index={4} />
          <CustomSlide index={5} />
          <CustomSlide index={6} /> */}
        </Slider>
      </div>
    </>
  )
}

export { CustomSlide }
