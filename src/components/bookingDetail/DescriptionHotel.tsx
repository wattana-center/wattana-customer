import {
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography
} from '@mui/material'
import { FIREBASE_KEY, WattanaTheme } from '@app/config'

import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { useSelector } from '@app/helpers'

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

// const na = [
//   'พิพิธภัณฑ์แมลงโลกและสิ่งมหัศจรรย์ธรรมชาติ',
//   'ถนนนิมมานเหมินทร์',
//   'ศูนย์การค้ากาดสวนแก้ว',
//   'วัดสวนดอก',
//   'เมญ่า ไลฟ์สไตล์ ช้อปปิ้ง เซ็นเตอร์',
//   'พิพิธภัณฑ์แมลงโลกและสิ่งมหัศจรรย์ธรรมชาติ',
//   'ถนนนิมมานเหมินทร์	',
//   'ศูนย์การค้ากาดสวนแก้ว'
// ]

type DescriptionHotelProps = {
  // data: BusinessGetRes
}

const DescriptionHotel: React.FC<DescriptionHotelProps> = () => {
  const data = useSelector((s) => s.hotel)
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item sm xs={12} style={{ paddingRight: 20 }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              className={classes.title}>
              {data.name}
            </Typography>
            <Stack
              style={{ margin: '20px 0' }}
              spacing={2}
              direction="row"
              alignItems="center">
              <Icon className={classes.title}>place</Icon>
              <Typography variant="h6" className={classes.title}>
                {data.address}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              style={{ minHeight: 295, maxHeight: 295, overflow: 'hidden' }}>
              {data.description}
            </Typography>
            <Divider className={classes.border} />
            <div style={{ textAlign: 'center', height: 40, width: '100%' }}>
              <Stack direction="row">
                {data.facility.map((m, k) => (
                  <div key={k} style={{ padding: 5 }}>
                    <Stack direction="column" alignItems="center">
                      <Icon className={classes.title}>
                        {m.detail.icon_name}
                      </Icon>
                      <Typography>{m.detail.name}</Typography>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            {data.nearby && data.nearby.length > 0 ? (
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.title}>
                สถานที่น่าสนใจใกล้เคียง
              </Typography>
            ) : null}

            {data.nearby &&
              data.nearby.map((v, i) => (
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  key={i}>
                  <Grid item sm={10} xs={10}>
                    <Typography variant="body1" noWrap textOverflow="ellipsis">
                      {v.name}
                    </Typography>
                  </Grid>

                  <Typography variant="body1">
                    {v.distance} {v.unit}
                  </Typography>
                </Grid>
              ))}

            {data.latitude && data.longitude ? (
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.title}>
                ตำแหน่งที่พัก
              </Typography>
            ) : null}
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Image
                alt=""
                layout="responsive"
                width="100vm"
                height="100vm"
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.latitude},${data.longitude}&zoom=12&size=400x400&key=${FIREBASE_KEY}`}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export { DescriptionHotel }
