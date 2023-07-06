import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { RoutesPath, WattanaTheme } from '@app/config'
import { convertContent, convertImages } from '@app/libs/convertContent'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { deepOrange } from '@mui/material/colors'
import { gtagEvent } from '@app/libs/gtag'
import { makeStyles } from '@mui/styles'

interface IHomePackageCardProps {
  id: number
  title: string
  content: string
  images?: string[]
  create_at: string
  views?: number
  number?: number
  create_by?: string
}

const useStyles = makeStyles(() => ({
  root: { width: '100%' },
  cardContent: { height: 145 },
  cardContentSlim: { height: 195, padding: 8 },
  image: { maxWidth: '100%', borderRadius: 5, margin: 'auto' },
  mediaRoot: { backgroundColor: 'lightcyan' },
  media: {
    height: 180,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundBlendMode: 'multiply',
    backgroundOrigin: 'border-box'
  },
  textWebkitBox: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  smallOrange: {
    width: WattanaTheme.spacing(3),
    height: WattanaTheme.spacing(3),
    color: WattanaTheme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  orange: {
    color: WattanaTheme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  viewsText: {
    color: '#339790'
  }
}))

const NewsCardTopview: React.FC<IHomePackageCardProps> = (props) => {
  const { title, content, id, number, views, create_at } = props
  const classes = useStyles()

  const handleOnClick = (message: string) => {
    gtagEvent({
      action: 'Click',
      category: 'Contact',
      label: message
    })
  }
  return (
    <>
      <Card className={classes.root}>
        <Link
          href={RoutesPath.NEWS.DETAIL.replace(':id', id.toString())}
          passHref={true}>
          <CardActionArea
            onClick={() => {
              handleOnClick(title)
            }}>
            <div className={classes.mediaRoot}>
              <CardMedia
                className={classes.media}
                image={convertImages(content)}
                // src={<img src={convertImages(jsonContent)} />}
                title="Contemplative Reptile"
              />
            </div>
            <CardContent className={classes.cardContent}>
              <Grid container spacing={2}>
                <Grid item container>
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item>
                      <Avatar className={classes.orange}>{number}</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography
                        display="block"
                        className={classes.textWebkitBox}
                        variant="h5"
                        align="left">
                        {title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      className={classes.textWebkitBox}
                      style={{
                        textAlign: 'justify',
                        WebkitLineClamp: 4
                      }}>
                      {convertContent(content)}
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} justifyContent="space-between">
                    <Grid item>
                      <Typography className={classes.viewsText}>
                        {create_at}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.viewsText}>
                        {views} view
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </>
  )
}

const NewsCardTopviewSlim: React.FC<IHomePackageCardProps> = (props) => {
  const { title, content, id, number, create_at, views } = props
  const classes = useStyles()
  const urlImg = convertImages(content)

  return (
    <>
      <Card className={classes.root}>
        <Link
          href={`${RoutesPath.NEWS.DETAIL.replace(':id', id.toString())}`}
          passHref={true}>
          <CardActionArea>
            <CardContent className={classes.cardContentSlim}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid
                  item
                  container
                  alignItems="center"
                  xs={4}
                  style={{ height: '170px', overflow: 'hidden' }}>
                  <Image
                    className={classes.image}
                    src={urlImg}
                    alt="Paella dish"
                  />
                </Grid>
                <Grid item container xs={8}>
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item>
                      <Avatar className={classes.smallOrange}>{number}</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography
                        display="block"
                        className={classes.textWebkitBox}
                        variant="h5"
                        align="left">
                        {title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      className={classes.textWebkitBox}
                      style={{
                        textAlign: 'justify',
                        WebkitLineClamp: 6
                      }}>
                      {convertContent(content)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} justifyContent="space-between">
                  <Grid item>
                    <Typography className={classes.viewsText}>
                      {create_at}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.viewsText}>
                      {views} view
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </>
  )
}

export { NewsCardTopview, NewsCardTopviewSlim }
