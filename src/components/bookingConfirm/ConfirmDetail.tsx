import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { BookingResponse } from '@app/apis'
import { Colors } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  title: {
    color: '#C99400'
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 16
  }
}))

type ConfirmDetailProps = {
  data: BookingResponse
  days: number
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const ConfirmDetail: React.FC<ConfirmDetailProps> = ({ data, days }) => {
  const classes = useStyles()

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (data.payment_status === 'W') {
      setMessage('รอการชำระเงิน')
    }
  }, [data])

  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" className={classes.title}>
                  ยืนยันการจอง ({message})
                </Typography>

                <Typography variant="h6">แจ้งชำระเงิน</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                หมายเลขยืนยันการจอง {data.reference}
              </Typography>
            </Grid>
            <Divider style={{ margin: '10px 0' }} />
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                {data.business.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{data.business.address}</Typography>
            </Grid>
            <Divider style={{ margin: '10px 0' }} />
            <Grid item container justifyContent="space-between">
              <Grid item xs={6} container direction="column">
                <Grid item>
                  <Typography variant="h6">เช็คอิน</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {new Date(data.check_in).toLocaleDateString(
                      'th',
                      dateOptions
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6} container direction="column">
                <Grid item>
                  <Typography variant="h6">เช็คเอ้าท์</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {new Date(data.check_out).toLocaleDateString(
                      'th',
                      dateOptions
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ margin: '10px 0' }} />
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="body1">ระยะเวลาเข้าพัก</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{days} คืน</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="body1">ประเภทห้อง</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{data.services?.name}</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="body1">ประเภทเตียง</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {data.services?.beds.map((b) => b.type).join(',')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="body1">จำนวนห้อง</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">1 ห้อง</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="body1">จำนวนผู้เข้าพักต่อห้อง</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {data.services.stays} ผู้่เข้าพัก
                </Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: '10px 0' }} />
            <Grid item>
              <Typography variant="h6">นโยบายการเข้าพัก</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla facilisis at vero eros et accumsan
                et iusto odio dignissim qui blandit praesent luptatum zzril
                delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
                dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                commodo consequat. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit
                lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel{' '}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export { ConfirmDetail }
