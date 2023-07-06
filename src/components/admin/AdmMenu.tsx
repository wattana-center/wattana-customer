import {
  Card,
  CardActionArea,
  CardContent,
  Icon,
  Typography
} from '@mui/material'

import Link from 'next/link'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#339790',
    color: '#f0fcf0',
    width: 180,
    textAlign: 'center',
    height: '100%'
  },
  icon: {
    fontSize: 70,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

interface IAdmMenu {
  text?: string
  faicon?: string
  href: string
}

export const AdmMenu: React.FC<IAdmMenu> = (props) => {
  const { text, faicon, href } = props
  const classes = useStyles()
  return (
    <>
      <Link href={href} passHref>
        <Card className={classes.root}>
          <CardActionArea>
            {faicon && <Icon className={classes.icon}>{faicon}</Icon>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {text ? text : 'Unknow'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}
