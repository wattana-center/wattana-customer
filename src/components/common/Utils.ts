import { Colors, WattanaTheme } from '@app/config'

import { NextRouter } from 'next/router'
import { makeStyles } from '@mui/styles'

export type BookingOptions = {
  value: string
  label: string
  lat?: number
  lng?: number
}

export type SearchState = {
  options: BookingOptions
  checkIn: string
  checkOut: string
  adults: number | undefined
  children: number | undefined
  month: number
  otherMonth: boolean
}

export const InitializeSearchBookingState: SearchState = {
  options: {
    value: '',
    label: ''
  },
  checkIn: '',
  checkOut: '',
  adults: undefined,
  children: undefined,
  month: 1,
  otherMonth: false
}

export const parseBooking = (router: NextRouter, param: SearchState) => {
  if (router.query.checkIn != null) {
    param.checkIn = router.query.checkIn as string
  }
  if (router.query.checkOut != null) {
    param.checkOut = router.query.checkOut as string
  }
  if (router.query.adults != null) {
    const adults = parseInt(router.query.adults as string) | 0
    param.adults = adults > 0 ? adults : undefined
  }
  if (router.query.month != null) {
    const month = parseInt(router.query.month as string) | 0
    param.month = month > 0 ? month : 1
  }

  if (router.query.children != null) {
    const children = parseInt(router.query.children as string) | 0
    param.children = children > 0 ? children : undefined
  }

  if (router.query.name != null && router.query.label != null) {
    const opt: BookingOptions = {
      value: router.query.name as string,
      label: router.query.label as string
    }

    if (router.query.lat != null && router.query.lng != null) {
      opt.lat = parseInt(router.query.lat as string)
      opt.lng = parseInt(router.query.lng as string)
    }

    param.options = opt
  }
}

export function addMonths(date: Date, months: number) {
  const d = date.getDate()
  date.setMonth(date.getMonth() + +months)
  if (date.getDate() != d) {
    date.setDate(0)
  }
  return date
}

export const bookingStyles = makeStyles(() => ({
  container: {},
  overview: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: WattanaTheme.spacing(2),
    height: '100%',
    [WattanaTheme.breakpoints.up('md')]: {
      paddingLeft: WattanaTheme.spacing(2),
      paddingRight: WattanaTheme.spacing(2),
      paddingTop: WattanaTheme.spacing(2)
    },
    [WattanaTheme.breakpoints.down('lg')]: {
      paddingLeft: WattanaTheme.spacing(2),
      paddingRight: WattanaTheme.spacing(2)
    }
  },
  leftTitle: {
    [WattanaTheme.breakpoints.only('xs')]: {
      maxWidth: WattanaTheme.spacing(36)
    },
    color: Colors.primaryColor
  },
  rightTitle: {
    color: 'white'
  },
  bodyText: {
    color: 'white'
  },
  icon: {
    color: '#666',
    fontSize: 36
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 24
  }
}))
