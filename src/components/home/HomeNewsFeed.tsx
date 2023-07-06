import { Divider, Grid, Typography } from '@mui/material'

import Link from 'next/link'
import { NewsCard } from '../news'
import React from 'react'
import { RoutesPath } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  icons: { height: '60px' },
  imageIcon: { height: '100%' }
}))

interface IHomeNewsFeedProps {
  title: string
  subTitle: string
  data: { id: number; title: string; content: string; create_at: string }[]
}

const HomeNewsFeed: React.FC<IHomeNewsFeedProps> = (props) => {
  const classes = useStyles()
  const { title, subTitle, data } = props

  return (
    <>
      {data && (
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginBottom: 20 }}>
          <Grid item container alignItems="center" spacing={1}>
            <Grid item container xs>
              <Grid item>
                <Typography
                  variant="h6"
                  noWrap
                  color="secondary"
                  style={{ marginLeft: 10 }}>
                  <b>{title}</b>
                </Typography>
                <Typography
                  variant="h6"
                  color="secondary"
                  noWrap
                  style={{ marginLeft: 10 }}>
                  <b>{subTitle}</b>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs
              direction="row-reverse"
              alignItems="flex-end">
              <Grid item className={classes.icons}></Grid>
              <Grid item>
                <Typography variant="h6" noWrap align="right">
                  <Link href={RoutesPath.NEWS.INDEX + `?type=${title}`}>
                    อ่านต่อ
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item container spacing={1}>
            {data.map((v, k) => (
              <Grid zeroMinWidth item sm={4} xs={12} key={`news-card-${k}`}>
                <NewsCard {...v} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export { HomeNewsFeed }
