import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography
} from '@mui/material'

import { Business } from '@app/apis'
import React from 'react'
import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    [WattanaTheme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  details: {
    [WattanaTheme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '67%'
    }
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    [WattanaTheme.breakpoints.up('md')]: {
      height: 212,
      width: 307
    },
    [WattanaTheme.breakpoints.down('xl')]: {
      height: 212
    }
  },
  title: {
    color: '#C99400'
  },
  discount: {
    '& del': {
      color: 'red',
      textDecoration: 'none',
      position: 'relative'
    },
    '& ins': {
      color: '#C99400',
      fontSize: '32px',
      textDecoration: 'none'
    }
  }
}))

type CardHotelProps = {
  image: string
  data: Business
}

const CardHotel: React.FC<CardHotelProps> = (props) => {
  const { data } = props
  const classes = useStyles()

  return (
    <>
      <Card style={{ width: '100%' }}>
        <CardActionArea className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={props.image}
            title="Live from space album cover"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container spacing={1}>
                <Grid item md>
                  <Typography
                    component="div"
                    variant="h5"
                    className={classes.title}>
                    {data.name}
                  </Typography>
                  <Stack
                    spacing={2}
                    direction="row"
                    style={{ marginTop: 10, marginBottom: 10 }}>
                    <Icon>place</Icon>
                    <Typography variant="body1" className={classes.title}>
                      {data.address}
                    </Typography>
                  </Stack>
                  {data.facility?.map((f, k) => (
                    <Typography
                      key={`facility-${k}`}
                      variant="subtitle1"
                      color="textSecondary"
                      component="li">
                      {f.detail.name}
                    </Typography>
                  ))}
                </Grid>
                <Divider
                  sx={{ display: { xs: 'none', md: 'block' } }}
                  orientation="vertical"
                  flexItem
                  style={{ height: 180, marginLeft: 20, marginRight: 20 }}
                />
                <Grid item md={4} xs={12}>
                  <Stack spacing={2} alignItems="flex-end" direction="column">
                    <Typography component="div" variant="subtitle1" noWrap>
                      ส่วนลดจาก ID9 PROPERTY
                    </Typography>
                    <div className={classes.discount}>
                      <ins>
                        <span className="amount">฿ {data.min_cost}</span>
                      </ins>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </>
  )
}

export { CardHotel }
