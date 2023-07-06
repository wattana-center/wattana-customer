import { BookingDate, useDialog } from '.'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { SearchState, addMonths, bookingStyles, parseBooking } from './Utils'

import { BookingStays } from './BookingStays'
import React from 'react'
import { RoutesPath } from '@app/config'
import { SearchTextField } from './SearchTextField'
import { useRouter } from 'next/router'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const SearchBooking: React.FC = () => {
  const router = useRouter()
  const classes = bookingStyles()
  const dialog = useDialog()
  const data = useSelector((s) => s.search)
  const search = useSearch()

  const currentDate = new Date()
  const checkOutDate = new Date()
  checkOutDate.setDate(currentDate.getDate() + 1)

  const onSubmit = () => {
    if (data.checkIn == '') {
      dialog.open('กรุณาเลือกวันที่เช็คอิน', 'warning')
      return
    }

    const sd = addMonths(new Date(data.checkIn), data.month)
    search.update({ ...data, checkOut: sd.toISOString() })

    router.push({
      pathname: RoutesPath.BOOKING.INDEX,
      query: {
        ...router.query,
        name: data?.options?.value,
        label: data?.options?.label,
        lat: data?.options?.lat,
        lng: data?.options?.lng,
        checkIn: data?.checkIn,
        checkOut: sd.toISOString(),
        adults: data?.adults,
        children: data?.children,
        month: data.month
      }
    })
  }

  React.useEffect(() => {
    const param: SearchState = { ...data }
    parseBooking(router, param)
    search.update(param)
  }, [])

  return (
    <>
      <Grid container direction="row" alignItems="stretch">
        <Grid
          item
          container
          direction="column"
          md={6}
          xs={12}
          className={classes.overview}>
          <Stack spacing={1}>
            {/* <Box component="div" textOverflow="ellipsis"> */}
            <Typography
              variant="h5"
              className={classes.leftTitle}
              textOverflow="ellipsis"
              noWrap>
              ค้นหาห้องพักราคาเบาๆ
            </Typography>
            {/* </Box> */}
            <SearchTextField />
            <BookingDate />
            <BookingStays />
            <Button
              onClick={onSubmit}
              className={classes.bt}
              fullWidth
              size="large"
              variant="contained">
              ดูราคา
            </Button>
          </Stack>
        </Grid>
        <Grid
          sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}
          item
          xs={6}>
          <Grid
            container
            direction="column"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
            <Grid item>
              <Typography
                variant="h4"
                align="center"
                className={classes.rightTitle}>
                ID9 PROPERTY
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                align="center"
                variant="h4"
                className={classes.bodyText}>
                เรามีห้องพัก
                <br />
                PREMIUM <br />
                ราคาเบาๆ
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { SearchBooking }
