import {
  BookingInfoDetail,
  BookingInfoStepper
} from '@app/components/bookingInfo'

import { Container } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { useSelector } from '@app/helpers'
import { withAuthUser } from 'next-firebase-auth'

type BookingInfoProps = {
  // res: BusinessGetRes
}

const BookingInfo: NextPage<BookingInfoProps> = () => {
  const data = useSelector((s) => s.hotel)
  return (
    <Container maxWidth="lg" style={{ padding: '20px 0' }}>
      <BookingInfoStepper />
      <div style={{ margin: '10px 0' }}></div>
      <BookingInfoDetail data={data} />
    </Container>
  )
}

// export const getServerSideProps = withAuthUserTokenSSR()(async () => {
//   //
// })

export default withAuthUser()(BookingInfo)
