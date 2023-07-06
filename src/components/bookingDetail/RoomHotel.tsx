import {
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography
} from '@mui/material'
import { Colors, RoutesPath, WattanaTheme } from '@app/config'

import { BusinessService } from '@app/apis'
import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { useBookingConfirm } from '@app/redux-store/booking'
import { useRouter } from 'next/router'
import { useSelector } from '@app/helpers'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      height: 260
    }
  },
  title: {
    color: Colors.primaryColor
  },
  border: {
    borderColor: Colors.primaryColor,
    marginTop: 20,
    marginBottom: 20
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 16
  },
  img: {
    [WattanaTheme.breakpoints.up('sm')]: {
      height: 230,
      width: '100%'
    },

    [WattanaTheme.breakpoints.down('lg')]: {
      width: '100%'
    }
  }
}))

const des = [
  'รวม ในราคาห้องพักแล้ว',
  'ภาษีมูลค่าเพิ่ม (VAT) 7%',
  'เซอร์วิสชาร์จของที่พัก 10%',
  'ไม่สามารถคืนเงินได้',
  'ไม่รวมอาหารเช้า'
]

type RoomHotelProps = {
  data: BusinessService
}

const RoomHotel: React.FC<RoomHotelProps> = ({ data }) => {
  const classes = useStyles()
  const router = useRouter()

  const search = useSelector((s) => s.search)
  const bookingConfirm = useSelector((s) => s.bookingConfirm)

  const bookingDispatcher = useBookingConfirm()

  const onHandleBooking = (service: number) => {
    const children = parseInt(router.query.children as string) | 0
    const adults = parseInt(router.query.adults as string) | 0
    const businessId = router.query.id as string
    const serverId = service

    bookingDispatcher.update({
      ...bookingConfirm,
      business_id: parseInt(businessId),
      server_id: serverId,
      check_in: search.checkIn,
      check_out: search.checkOut,
      adults: adults < 1 ? 1 : adults,
      children: children < 1 ? 1 : children,
      month: search.month
    })

    router.push(RoutesPath.BOOKING.INFO.replace('{id}', businessId))
  }

  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item sm xs={12} spacing={2}>
          <Grid item sm xs={12}>
            <div style={{ width: '100%', height: 60 }}>
              <Image
                alt=""
                layout="responsive"
                width="100%"
                height="100%"
                src={
                  data.images != null
                    ? data.images[0].src
                    : `/images/no_image_available.jpeg`
                }
              />
            </div>
          </Grid>
          <Grid item sm xs={12}>
            <Typography
              variant="h5"
              className={classes.title}
              style={{ marginBottom: 40 }}
              component="div">
              {data.name}
            </Typography>
            {des.map((v, i) => (
              <Typography key={i} gutterBottom variant="body2" component="li">
                {v}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          container
          item
          sm={4}
          xs={12}
          direction="column"
          justifyContent="space-around">
          <Grid item container direction="column" alignItems="center">
            <Stack spacing={2} direction="row">
              <Icon>people_outline</Icon>
              <Typography variant="body1" noWrap>
                {data.stays} ผู้เข้าพัก
              </Typography>
            </Stack>
            {data.beds.map((b, k) => (
              <Stack spacing={2} direction="row" key={`beds-list-text-${k}`}>
                <Icon>bed</Icon>
                <Typography variant="body1" noWrap>
                  {b.number | 1} {b.type}
                </Typography>
              </Stack>
            ))}
          </Grid>
          <Divider />
          <Grid item container direction="column" alignItems="center">
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-around"
              alignItems="center">
              <Grid item>
                <Stack spacing={2} direction="column">
                  <Typography variant="inherit" noWrap>
                    {data.default_cost} ฿ ต่อเดือน
                  </Typography>
                  <Typography variant="h6" noWrap className={classes.title}>
                    ราคา {data.default_cost * search.month} ฿
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    onHandleBooking(data.id)
                  }}
                  className={classes.bt}
                  fullWidth
                  size="medium"
                  variant="contained">
                  จอง
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export { RoomHotel }
