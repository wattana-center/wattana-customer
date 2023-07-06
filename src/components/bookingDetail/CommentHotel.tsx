import { Divider, Grid, Typography } from '@mui/material'

import React from 'react'
import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      height: 593
    }
  },
  media: {
    height: 593
  },
  title: {
    color: '#C99400'
  },
  border: {
    borderColor: '#C99400',
    marginTop: 20,
    marginBottom: 20
  }
}))

type CommentHotelProps = {
  lastColumn?: boolean
}

const CommentHotel: React.FC<CommentHotelProps> = (props) => {
  const { lastColumn = false } = props
  const classes = useStyles()

  return (
    <>
      <Grid container>
        <Grid item xs={4} container direction="column">
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              9.9
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              ดีเยี่ยม
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={8} container direction="column">
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Johnny
            </Typography>
          </Grid>
          <Grid item>
            <Typography>รีวิวเมื่อ 14 มีนาคม 2019</Typography>
          </Grid>
          <Grid item>
            <Typography>
              This is a designer house next to a beautiful beach! Very spacious
              enough to accommodate 3 families. You have to ask Mr. Yota to buy
              the local premium beef and pork, no regret!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {!lastColumn && <Divider style={{ margin: '10px 0' }} />}
    </>
  )
}

export { CommentHotel }
