import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { convertContent, convertImages } from '@app/libs/convertContent'

import Link from 'next/link'
import React from 'react'
import { RoutesPath } from '@app/config'
import { makeStyles } from '@mui/styles'

interface IHomePackageCardProps {
  id: number
  title: string
  content: string
  images?: string
  create_at: string
}

const useStyles = makeStyles({
  root: {},
  media: {
    height: 200
  }
})

const NewsCard: React.FC<IHomePackageCardProps> = (props) => {
  const { title, content, id } = props
  const classes = useStyles()

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent style={{ height: 360 }}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                  variant="h5"
                  align="left">
                  {title}
                </Typography>
              </Grid>
              <CardMedia
                className={classes.media}
                image={convertImages(content)}
                title="Contemplative Reptile"
              />
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'justify',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                  {convertContent(content)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div style={{ marginRight: 0, marginLeft: 'auto' }}>
            <Link
              passHref={true}
              href={RoutesPath.NEWS.DETAIL.replace(':id', id.toString())}>
              <Button size="small" color="secondary">
                อ่านต่อ
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </>
  )
}

export { NewsCard }
