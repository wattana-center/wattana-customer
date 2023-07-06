import { BookingApi, BookingResponse, OmiseApi } from '@app/apis'
import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { BookingInfoStepper } from '@app/components/bookingInfo'
import { ConfirmDetail } from '@app/components/bookingConfirm'
import { NextPage } from 'next'
import { withAuthUserTokenSSR } from 'next-firebase-auth'

type BookingConfirmProps = {
  // omiseToken: string //ชำระโดยบัตรเครดิต
  // omiseSource: string //ชำระผ่านช่องทางอื่น
  res?: BookingResponse
  status: boolean
}

const BookingConfirm: NextPage<BookingConfirmProps> = ({ status, res }) => {
  const [days, setDays] = useState(0)

  useEffect(() => {
    if (res) {
      const differenceInTime =
        new Date(res.check_in).getTime() - new Date(res.check_in).getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)
      setDays(differenceInDays + 1)
    }
  }, [res])

  return (
    <Container maxWidth="md" style={{ padding: '20px 0' }}>
      <BookingInfoStepper activeStep={2} />
      {status && res ? (
        <>
          <ConfirmDetail data={res} days={days} />
        </>
      ) : (
        <div
          style={{
            position: 'fixed',
            top: '40%',
            left: '50%',
            marginTop: '-50px',
            marginLeft: '-100px'
          }}>
          <Typography align="center">
            ไม่สามารถทำรายการได้กรุณารองใหม่
          </Typography>
        </div>
      )}
    </Container>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ params, query }) => {
    const bookingApi = new BookingApi()

    if (!params) {
      return {
        notFound: true
      }
    }
    const id = params.id as string
    const paymentType = query.paymentType as string

    const omiseApi = new OmiseApi()

    try {
      const response = await bookingApi.get<BookingResponse>(id).then((res) => {
        return res.data
      })

      //ตัดเงิน

      if (paymentType === 'BT') {
        const ureq = { ...response }
        ureq.status = 'W'
        ureq.payment_status = 'W'
        ureq.payment_type = paymentType

        console.log(ureq)

        await bookingApi.update(id, ureq).then((res) => {
          return res.data
        })
      } else {
        await omiseApi
          .charges({
            amount: `${
              response?.total_net_cost != null
                ? response.total_net_cost * 100
                : 0
            }`,
            currency: 'thb',
            card: query.omiseToken as string
          })
          .then(async (res) => {
            const ureq = { ...response }
            ureq.status = 'B'
            ureq.payment_status = 'S'
            ureq.payment_type = 'CC'
            ureq.payment_refernces = res.data

            return await bookingApi.update(id, ureq).then((res) => {
              return res.data
            })
          })
      }

      return {
        props: {
          res: response,
          status: true
        }
      }
    } catch (error) {
      console.log(error)
      return {
        props: {
          status: true
        }
      }
    }
  }
)

export default BookingConfirm
