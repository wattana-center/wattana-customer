import { BookingApi, BookingResponse } from '@app/apis'
import { BookingSummary, PaymentInfo } from '@app/components/bookingPayment'
import { Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { BookingInfoStepper } from '@app/components/bookingInfo'
import { NextPage } from 'next'
import { withAuthUserTokenSSR } from 'next-firebase-auth'

declare global {
  interface Window {
    OmiseCard: any
  }
}

type BookingPaymentProps = {
  res: BookingResponse
}

const BookingPayment: NextPage<BookingPaymentProps> = ({ res }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'))

  const [days, setDays] = useState(0)

  useEffect(() => {
    const differenceInTime =
      new Date(res.check_out).getTime() - new Date(res.check_in).getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    setDays(differenceInDays + 1)
  }, [res])

  return (
    <Container maxWidth="lg" style={{ padding: '20px 0' }}>
      <BookingInfoStepper activeStep={1} />
      <Grid
        container
        spacing={2}
        direction={matches ? 'column-reverse' : 'row'}>
        <Grid item sm={7} xs={12}>
          <PaymentInfo amount={res.total_net_cost} />
        </Grid>
        <Grid item sm={5} xs={12}>
          <BookingSummary days={days} data={res} />
        </Grid>
      </Grid>
    </Container>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ params }) => {
  const bookingApi = new BookingApi()

  if (!params) {
    return {
      notFound: true
    }
  }

  const id = params.id as string

  const response = await bookingApi
    .get<BookingResponse>(id)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e)
      return undefined
    })

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      res: response
    }
  }
})

export default BookingPayment
