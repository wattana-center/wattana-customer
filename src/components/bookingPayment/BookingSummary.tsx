import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material'

import { BookingResponse } from '@app/apis'
import React from 'react'

type BookingSummaryProps = {
  data: BookingResponse
  days: number
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: undefined,
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ data, days }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5">{data.business.name}</Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="h5">Nimman Hotel</Typography>
            </Grid> */}
            <Grid item style={{ margin: '20px 0' }}>
              <Typography variant="body1">{data.business.address}</Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="body1">
                ทำเลยอดเยี่ยม <span>ดูสถานที่ใกล้เคียง</span>
              </Typography>
            </Grid> */}
            <Divider style={{ margin: '20px 0' }} />
            <Grid item>
              <Stack
                spacing={2}
                style={{ padding: '0 20px' }}
                direction="row"
                justifyContent="space-between">
                <Typography variant="body1">
                  {new Date(data.check_in).toLocaleDateString(
                    'th',
                    dateOptions
                  )}
                  {' - '}
                  {new Date(data.check_out).toLocaleDateString(
                    'th',
                    dateOptions
                  )}
                </Typography>
                <Typography variant="body1">{days} คืน</Typography>
              </Stack>
            </Grid>
            <Divider style={{ margin: '20px 0' }} />
            <Grid item>
              <Stack
                spacing={2}
                style={{ paddingRight: '20px' }}
                direction="row"
                justifyContent="space-between">
                <Typography variant="body1">{data.services.name}</Typography>
              </Stack>
            </Grid>
            {data.services.beds.map((b, k) => (
              <Grid item key={`beds-item-${k}`}>
                <Typography variant="body1">
                  {b.number | 1} {b.type} เตียง
                </Typography>
              </Grid>
            ))}

            <Grid item>
              <Typography variant="body1">1 ห้อง</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {data.services.stays} ผู้เข้าพัก
              </Typography>
            </Grid>
            <Divider style={{ margin: '20px 0' }} />
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              style={{ paddingRight: '20px' }}
              direction="row"
              justifyContent="space-between">
              <Typography variant="body1">ราคาที่พัก</Typography>
              <Typography variant="body1">{data.total_net_cost}฿</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              style={{ paddingRight: '20px' }}
              direction="row"
              justifyContent="space-between">
              <Typography variant="body1">ค่าธรรมเนียมการจอง</Typography>
              <Typography variant="body1">ฟรี</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              style={{ paddingRight: '20px' }}
              direction="row"
              justifyContent="space-between">
              <Typography variant="h6">ราคาที่ต้องจ่าย</Typography>
              <Typography variant="h6">{data.total_net_cost}฿</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              รวม: เซอร์วิสชาร์จ 10%, ภาษี 7%, ภาษีท้องถิ่น 1%
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export { BookingSummary }
