import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface ILinkFooter {
  text: string
  href: string
}

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'inherit'
  },
  text: {
    color: 'rgba(255,255,255,.5)'
  }
}))

const LinkFooter: React.FC<ILinkFooter> = (props) => {
  const { text } = props

  const classes = useStyles()

  return (
    <>
      <Typography className={classes.text}>{text}</Typography>
    </>
  )
}

export { LinkFooter }
