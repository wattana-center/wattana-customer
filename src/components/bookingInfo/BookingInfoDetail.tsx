import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { BookingApi, BusinessGetRes, BusinessService } from '@app/apis'
import { Colors, RoutesPath } from '@app/config'
import React, { useState } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import Image from 'next/image'
import { LoadingButton } from '@mui/lab'
import { LocalSwal } from '@app/libs'
import { TextFieldPhoneNumber } from '..'
import { makeStyles } from '@mui/styles'
import router from 'next/router'
import { useBookingConfirm } from '@app/redux-store/booking'
import { useEffect } from 'react'
import { useSelector } from '@app/helpers'

const useStyles = makeStyles(() => ({
  title: {
    color: '#C99400'
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 16
  }
}))

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault()
}

type InfoData = {
  nameTh: string
  nameEn: string
  tel: string
  email: string
}

type BookingInfoDetail = {
  data: BusinessGetRes
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const BookingInfoDetailFC: React.FC<BookingInfoDetail> = ({ data }) => {
  const classes = useStyles()
  const auth = useAuthUser()
  const [loading, setLoading] = React.useState(false)

  const bookingConfirm = useSelector((s) => s.bookingConfirm)
  const booking = useBookingConfirm()
  const [service, setService] = useState<BusinessService>()

  // const [infoData, setInfoData] = useState<InfoData>({
  //   nameTh: '',
  //   nameEn: '',
  //   tel: '',
  //   email: ''
  // })

  const [errorMessage] = useState<InfoData>({
    nameTh: '',
    nameEn: '',
    tel: '',
    email: ''
  })

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" onClick={handleClick}>
      หน้าหลัก
    </Link>,
    <Typography key="3" color="textPrimary">
      {data.name}
    </Typography>
  ]

  const onHandleSubmit = async () => {
    const bookingApi = new BookingApi()

    if (bookingConfirm.check_in && bookingConfirm.check_out && service) {
      setLoading(true)
      bookingApi
        .save({
          business_id: data.id,
          check_in: bookingConfirm.check_in.split('T')[0],
          check_out: bookingConfirm.check_out.split('T')[0],
          commission_amount: 0,
          commission_rate: 0,
          fullname_en: bookingConfirm.nameEn,
          fullname_th: bookingConfirm.nameTh,
          holder_email: bookingConfirm.email,
          holder_telphone: bookingConfirm.tel,
          payment_status: 'W',
          requirement: {
            message: ''
          },
          services: { ...service },
          status: 'W',
          total_net_cost: 0
        })
        .then((r) => {
          if (r.status === 200) {
            router.push(
              RoutesPath.BOOKING.PAYMENT.replace('{id}', `${r.data.id}`)
            )
          }
        })
        .catch((e) => {
          // console.log(e)
          LocalSwal.fire(
            'ไม่สามารถจองห้องพักได้',
            `บันทึกข้อมูลล้มเหลว message : ${e.message}`,
            'error'
          )
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
    } else {
      LocalSwal.fire(
        'ไม่สามารถจองห้องพักได้',
        `ข้อมูลที่พักไม่ถูกต้อง`,
        'error'
      )
    }
  }

  useEffect(() => {
    if (auth.id) {
      booking.update({
        ...bookingConfirm,
        nameTh: auth.displayName,
        tel: auth.phoneNumber,
        email: auth.email
      })
    }
  }, [auth])

  useEffect(() => {
    const f = data.service.find((fi) => fi.id === bookingConfirm.server_id)
    setService(f)
  }, [data])

  return (
    <>
      <Card>
        <CardContent>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Grid container spacing={4} style={{ marginTop: 0 }}>
            <Grid
              item
              sm={8}
              xs={12}
              container
              direction="column"
              spacing={2}
              alignItems="stretch">
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  จองโรงแรม
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">กรุณากรอกข้อมูลของท่าน</Typography>
              </Grid>
              <Grid item>
                <Typography>ชื่อ-นามสกุล</Typography>
                <TextField
                  value={bookingConfirm.nameTh}
                  onChange={(event) =>
                    booking.update({
                      ...bookingConfirm,
                      nameTh: event.target.value
                    })
                  }
                  helperText={errorMessage.nameTh}
                  error={errorMessage.nameTh !== ''}
                  fullWidth
                  variant="outlined"
                  margin="none"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Typography>Name-Surname</Typography>
                <TextField
                  value={bookingConfirm.nameEn}
                  onChange={(event) =>
                    booking.update({
                      ...bookingConfirm,
                      nameEn: event.target.value
                    })
                  }
                  helperText={errorMessage.nameEn}
                  error={errorMessage.nameEn !== ''}
                  fullWidth
                  variant="outlined"
                  margin="none"
                  size="small"
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <Typography>เบอร์โทร</Typography>
                  <TextFieldPhoneNumber
                    variant="outlined"
                    value={bookingConfirm.tel}
                    onChange={(val) =>
                      booking.update({
                        ...bookingConfirm,
                        tel: val
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography>อีเมล์</Typography>
                  <TextField
                    value={bookingConfirm.email}
                    onChange={(event) =>
                      booking.update({
                        ...bookingConfirm,
                        email: event.target.value
                      })
                    }
                    helperText={errorMessage.email}
                    error={errorMessage.email !== ''}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>
                    เพิ่มคำขอพิเศษ
                  </Typography>
                  <Typography variant="body1">
                    คำขอเพิ่มเติม (ไม่จำเป็นต้องระบุ)
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper style={{ padding: 20 }} variant="outlined">
                    <Typography variant="body1">
                      การให้บริการตามคำขอเพิ่มเติมกรณีขึ้นอยู่กับความพร้อมให้บริการของทางโรงแรมหรือที่พัก
                      จึงไม่สามารถรับประกันได้
                      ทั้งนี้สำหรับการเช็คอินก่อนเวลาหรือบริการรับส่งสนามบินอาจมีค่าใช้จ่ายเพิ่มเติม
                      กรุณาติดต่อโรงแรมหรือที่พักโดยตรงหากคุณต้องการตรวจสอบ
                      ข้อมูลเพิ่มเติม
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="ห้องพักปลอดบุหรี่"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="ห้องพักแบบเชื่อมถึงกัน"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="ประเภทเตียง"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="เวลาเช็คอิน"
                      />
                    </FormGroup>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={12} container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  รายละเอียด
                </Typography>
              </Grid>
              <Grid item style={{ height: 360 }}>
                <Image
                  alt="hotel"
                  width="100vw"
                  height="100vw"
                  layout="responsive"
                  src={
                    service?.images != null
                      ? service?.images[0].src
                      : `/images/no_image_available.jpeg`
                  }
                />
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <div style={{ margin: '10px 0' }}></div>
              </Grid>

              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  {data.name}
                </Typography>
              </Grid>
              <Grid item>
                <Stack spacing={2} direction="row" alignItems="center">
                  <Icon>place</Icon>
                  <Typography variant="body1">{data.address}</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                  }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>date_range</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="ระยะเวลาเข้าพัก"
                      secondary={`${bookingConfirm.month} เดือน`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>login</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="เช็คอิน"
                      secondary={new Date(
                        bookingConfirm.check_in
                      ).toLocaleDateString('th', dateOptions)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>logout</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="เช็คเอาท์"
                      secondary={new Date(
                        bookingConfirm.check_out
                      ).toLocaleDateString('th', dateOptions)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>room</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="ประเภทห้อง"
                      secondary={service?.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>bed</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="ประเภทเตียง"
                      secondary={service?.beds.map((b) => b.type).join(',')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>confirmation_number</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="จำนวนห้อง" secondary="1 ห้อง" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>family_restroom</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="จำนวนผู้เข้าพัก/ห้อง"
                      secondary={`${
                        bookingConfirm.adults != null
                          ? bookingConfirm.children != null
                            ? bookingConfirm.children + bookingConfirm.adults
                            : bookingConfirm.adults
                          : 1
                      } ผู้เข้าพัก`}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              spacing={2}>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="ท่านยอมรับ ข้อกำหนดการใช้งาน และนโยบายความเป็นส่วนตัว เพื่อดำเนินการต่อ"
                  />
                </FormGroup>
              </Grid>
              <Grid item sm={4} xs={12} textAlign="right">
                <LoadingButton
                  loading={loading}
                  onClick={() => {
                    onHandleSubmit()
                  }}
                  className={classes.bt}
                  fullWidth
                  size="medium"
                  variant="contained">
                  ยืนยันการจอง
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

const BookingInfoDetail = withAuthUser<BookingInfoDetail>()(BookingInfoDetailFC)

export { BookingInfoDetail }
