import { Grid, Icon, Stack, Typography } from '@mui/material'

import { BusinessGetAllRes } from '@app/apis'
import { CardHotel } from '.'
import React from 'react'
import { RoutesPath } from '@app/config'
import { useRouter } from 'next/router'

type ListHotelsProps = {
  data: BusinessGetAllRes
}

const ListHotels: React.FC<ListHotelsProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Typography variant="body1">
          ผลการค้นหา <span>{data.total_records} แห่ง</span>
        </Typography>
        {/* <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body1">เรียงตาม</Typography>
          <Typography variant="body1">
            ความนิยม
          </Typography>
          <Icon>keyboard_arrow_up</Icon>
        </Stack> */}

        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body1">ดูแผนที่</Typography>
          <Icon>map</Icon>
        </Stack>
      </Stack>
      <div style={{ marginTop: 20, marginBottom: 20 }} />

      <Grid container spacing={1} direction="column" alignItems="center">
        {data.data.map((i, k) => (
          <Grid
            style={{ width: '100%' }}
            item
            key={`card-hotel-list-${k}`}
            onClick={() =>
              router.push({
                pathname: RoutesPath.BOOKING.DETAIL.replace('{id}', `${i.id}`),
                query: {
                  ...router.query
                }
              })
            }>
            <CardHotel
              data={i}
              image={
                i.images &&
                Array.isArray(i.images) &&
                i.images.length > 0 === true
                  ? i.images[0].src
                  : '/images/no_image_available.jpeg'
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export { ListHotels }
