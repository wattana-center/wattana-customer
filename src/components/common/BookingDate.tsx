import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import React, { useRef } from 'react'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { BookingRadio } from './BookingRadio'
import { WattanaTheme } from '@app/config'
import { addMonths } from './Utils'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: WattanaTheme.palette.common.white,
    border: '1px solid #ced4da',
    transition: WattanaTheme.transitions.create(['border-color', 'box-shadow']),
    borderRadius: 4,
    padding: 6,
    overflow: 'hidden',
    minHeight: '64px'
  },
  icon: {
    color: '#666',
    fontSize: 36
  },
  textField: {
    display: 'none'
  },
  focusDiv: {
    cursor: 'pointer',
    '&:hover': {
      pointerEvents: 'fill',
      outline: 0,
      opacity: '0.5'
    }
  }
}))

type BookingDateProps = {
  small?: boolean
}

const options: Intl.DateTimeFormatOptions = {
  weekday: undefined,
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const BookingDate: React.FC<BookingDateProps> = (props) => {
  const { small = false } = props

  const data = useSelector((s) => s.search)
  const search = useSearch()

  const [startDate, setStartDate] = React.useState<Date | null>()
  const [endDate, setEndDate] = React.useState<Date | null>()
  const [open, setOpen] = React.useState<boolean>(false)

  const classes = useStyles()
  const inputClickIn = useRef<HTMLInputElement>(null)
  const inputClickOut = useRef<HTMLInputElement>(null)

  const clickInOnClick = () => {
    inputClickIn.current?.click()
  }

  const clickOutOnClick = () => {
    setOpen(true)
  }

  const handleChangeCheckIn = (newDate: Date | null) => {
    if (newDate != null) {
      search.update({ ...data, checkIn: newDate.toISOString() })
    }

    setStartDate(newDate)
  }

  const handleChangeCheckOut = (newDate: Date | null) => {
    if (newDate != null) {
      search.update({ ...data, checkOut: newDate.toISOString() })
    }

    setEndDate(newDate)
  }

  useEffect(() => {
    if (data.checkIn !== '') {
      setStartDate(new Date(data.checkIn))
    }

    if (data.checkOut !== '') {
      setEndDate(new Date(data.checkOut))
    }
  }, [data.checkIn, data.checkOut])

  return (
    <>
      <Box>
        <Grid container direction="row" className={classes.container}>
          <Grid item sm={6} xs={12} alignItems="flex-start">
            <Tooltip
              title="กรุณาเลือกวันที่เช็คอิน"
              className={classes.focusDiv}
              onClick={() => clickInOnClick()}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Icon className={classes.icon}>calendar_today</Icon>
                <Stack>
                  {startDate && typeof startDate.getDate === 'function' ? (
                    <>
                      <Typography noWrap>
                        {startDate.toLocaleDateString('th', options)}
                      </Typography>
                      <Typography noWrap>
                        {startDate.toLocaleDateString('th', {
                          weekday: 'long'
                        })}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <span>กรุณาเลือกวันที่เช็คอิน</span>
                    </>
                  )}
                </Stack>
              </Stack>
            </Tooltip>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Tooltip
              title="กรุณาเลือกวันที่เช็คเอาท์"
              className={classes.focusDiv}>
              <>
                {/* <Icon className={classes.icon}>calendar_today</Icon>
              <Stack>
                {endDate != null ? (
                  <>
                    <span>{endDate.toLocaleDateString('th', options)}</span>
                    <span>
                      {endDate.toLocaleDateString('th', { weekday: 'long' })}
                    </span>
                  </>
                ) : (
                  <>
                    <span>กรุณาเลือกวันที่เช็คเอาท์</span>
                  </>
                )}
              </Stack> */}
                {!small && <BookingRadio />}
                {small && (
                  <>
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        small && clickOutOnClick()
                      }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon className={classes.icon}>calendar_today</Icon>
                        <Stack>
                          {endDate && (
                            <>
                              <Typography noWrap>
                                {endDate.toLocaleDateString('th', options)}
                              </Typography>
                              <Typography noWrap>
                                {endDate.toLocaleDateString('th', {
                                  weekday: 'long'
                                })}
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  </>
                )}
              </>
            </Tooltip>
          </Grid>
          <div className={classes.textField}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                inputRef={inputClickIn}
                label="Checkin"
                value={startDate}
                onChange={handleChangeCheckIn}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileDatePicker
                inputRef={inputClickOut}
                label="Checkout"
                value={endDate}
                onChange={handleChangeCheckOut}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          //
        }}
        onBackdropClick={() => {
          setOpen(false)
        }}>
        <DialogContent>
          <BookingRadio />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              const sd = addMonths(new Date(data.checkIn), data.month)
              search.update({ ...data, checkOut: sd.toISOString() })
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { BookingDate }
