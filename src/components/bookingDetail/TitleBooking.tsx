import { BookingDate, TextField } from '../common'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Tooltip,
  Typography
} from '@mui/material'
import { Colors, RoutesPath } from '@app/config'
import React, { useState } from 'react'
import { SearchState, parseBooking } from '../common/Utils'

import { BookingStays } from '../common/BookingStays'
import { SearchTextField } from '../common/SearchTextField'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const useStyles = makeStyles(() => ({
  icon: {
    color: Colors.grayColor,
    fontSize: 36
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 24
  }
}))

type TitleBookingProps = {
  // data: BusinessGetRes
}

const TitleBooking: React.FC<TitleBookingProps> = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string>('')

  const data = useSelector((s) => s.search)
  const hotel = useSelector((s) => s.hotel)
  const search = useSearch()
  const classes = useStyles()
  const router = useRouter()

  React.useEffect(() => {
    const param: SearchState = { ...data }
    parseBooking(router, param)
    search.update(param)
  }, [])

  React.useEffect(() => {
    let mes = 'ผู้ใหญ่ 2 คน '
    if (data.adults) {
      mes = `ผู้ใหญ่ ${data.adults} คน `
    }

    if (data.children) {
      mes += `เด็ก ${data.children} คน`
    }

    setMessage(mes)
  }, [data.adults, data.children])

  return (
    <>
      <Grid container alignItems="center" spacing={1}>
        <Grid item md={3} sm={12} xs={12}>
          <SearchTextField />
        </Grid>
        <Grid item sm xs={12}>
          <BookingDate small />
        </Grid>
        <Grid item md={2} sm xs={12}>
          <Tooltip title={message}>
            <div
              onClick={() => {
                setOpen(true)
              }}>
              <TextField
                disabled
                fullWidth
                startAdornment={
                  <Icon className={classes.icon}>supervisor_account</Icon>
                }
                placeholder={message}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item sm={2} xs={12}>
          <Button
            onClick={() => {
              router.push(RoutesPath.BOOKING.INDEX)
            }}
            className={classes.bt}
            fullWidth
            size="large"
            variant="contained">
            ดูราคา
          </Button>
        </Grid>
      </Grid>

      <Typography
        style={{
          marginTop: 10,
          marginBottom: 10
        }}>{`หน้าหลัก > ที่พักในตัวเมือง ${hotel.province} > ${hotel.name}`}</Typography>

      <Dialog
        open={open}
        onClose={() => {
          //
        }}>
        <DialogTitle>จำนวนคนเข้าพัก</DialogTitle>
        <DialogContent>
          <BookingStays />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { TitleBooking }
