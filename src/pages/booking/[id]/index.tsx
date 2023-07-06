import { Container, Stack } from '@mui/material'
import {
  DescriptionHotel,
  RoomHotel,
  TitleBooking
} from '@app/components/bookingDetail'
import React, { useEffect } from 'react'

import { BusinessApi } from '@app/apis'
import { BusinessGetRes } from '@app/apis/interface/business-interface'
import { HotelDispatcher } from '@app/redux-store/hotel'
import { NextPage } from 'next'
import { withAuthUserTokenSSR } from 'next-firebase-auth'

type BookingDetailProps = {
  res: BusinessGetRes
}

// const RoomHotel = dynamic(
//   () => import('@app/components/bookingDetail/RoomHotel')
// )

const BookingDetail: NextPage<BookingDetailProps> = ({ res }) => {
  const hotelDispatch = HotelDispatcher()

  useEffect(() => {
    hotelDispatch.update(res)
  }, [])

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <TitleBooking />

        <DescriptionHotel />

        <div style={{ margin: '20px 0' }} />

        <Stack direction="column" spacing={2}>
          {res.service &&
            res.service.map((v, k) => (
              <RoomHotel key={`room-card-list-${k}`} data={v} />
            ))}
        </Stack>

        {/* <div style={{ margin: '10px 0' }} /> */}
        {/* <RoomHotel /> */}
        {/* <div style={{ margin: '10px 0' }} /> */}
        {/* <RoomHotel /> */}
        <div style={{ margin: '20px 0' }} />
        {/* <ReviewHotel /> */}
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ params }) => {
  const businessRegisterApi = new BusinessApi()

  if (!params) {
    return {
      notFound: true
    }
  }
  const id = params.id as string

  const response = await businessRegisterApi
    .get<BusinessGetRes>(id)
    .then((res) => {
      return res.data
    })
    .catch(() => {
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

export default BookingDetail
