import { BusinessApi, BusinessGetAllRes } from '@app/apis'
import { Container, Grid } from '@mui/material'
import { FilterHotels, ListHotels } from '@app/components/booking'

import { Banner } from '@app/components/common'
import { NextPage } from 'next'
import React from 'react'
import { WattanaTheme } from '@app/config'
import { withAuthUserTokenSSR } from 'next-firebase-auth'

type BookingProps = {
  res?: BusinessGetAllRes
}

const Booking: NextPage<BookingProps> = ({ res }) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Banner />
        </Grid>
        <Grid item>
          <Container
            maxWidth="lg"
            style={{
              paddingTop: WattanaTheme.spacing(2),
              paddingBottom: WattanaTheme.spacing(2)
            }}>
            <Grid container spacing={4}>
              <Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <FilterHotels />
              </Grid>
              <Grid item sm={9} xs={12}>
                {res && <ListHotels data={res} />}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

const parseRequest = (query: any, param: any) => {
  try {
    if (query.checkIn != null && typeof query.checkIn === 'string') {
      const e = new Date(query.checkIn)
      param.start_date = e.toISOString().split('T')[0]
    }

    if (query.checkOut != null && typeof query.checkOut === 'string') {
      const e = new Date(query.checkOut)
      param.end_date = e.toISOString().split('T')[0]
    }

    if (query.name != null && typeof query.name === 'string') {
      param.name = query.name
    }

    if (query.page != null && typeof query.page === 'string') {
      param.page = query.page
    }

    if (query.pagesize != null && typeof query.pagesize === 'string') {
      param.pagesize = query.pagesize
    }

    if (query.start_date != null && typeof query.start_date === 'string') {
      param.start_date = query.start_date
    }

    if (query.end_date != null && typeof query.end_date === 'string') {
      param.end_date = query.end_date
    }

    if (query.lat != null && typeof query.lat === 'string') {
      param.lat = query.lat
    }

    if (query.lng != null && typeof query.lng === 'string') {
      param.lng = query.lng
    }
  } catch (error) {}

  return param
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ query }) => {
  const businessApi = new BusinessApi()
  const end_date = new Date()
  const start_date = new Date()
  end_date.setDate(end_date.getDate() + 30)
  // const end_date = current

  let param = {
    name: '',
    page: '1',
    pagesize: '20',
    start_date: start_date.toISOString().split('T')[0],
    end_date: end_date.toISOString().split('T')[0],
    lat: '',
    lng: ''
  }
  try {
    param = parseRequest(query, param)

    const response = await businessApi
      .search({
        ...param
      })
      .then((res) => {
        return res.data
      })

    return {
      props: {
        res: response
      }
    }
  } catch (error) {
    // console.log(error)
  }

  return {
    props: {
      res: null
    }
  }
})

export default Booking
