import { Paper } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

interface IFacebookPage {
  width: number
  height: number
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 500,
    width: '100%',
    backgroundColor: '#F3F3F3'
  }
}))

const FacebookPage: React.FC<IFacebookPage> = (props) => {
  const classes = useStyles()
  let { width, height } = props

  width = width - 8
  height = height - 26
  return (
    <>
      <Paper style={{}} variant="outlined" className={classes.root}>
        <iframe
          src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbuddyclubs%2F&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2719580855019433`}
          width={width}
          height={height}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </Paper>
    </>
  )
}

export { FacebookPage }
