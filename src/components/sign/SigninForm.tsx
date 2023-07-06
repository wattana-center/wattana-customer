import { Button, Container, Grid, Link, Paper, Typography } from '@mui/material'

import Image from 'next/image'
import React from 'react'
import { RoutesPath } from '@app/config'
// import SignStyles from './SignStyles'
import { SigninWithPassword } from './SigninWithPassword'

// import { useRouter } from 'next/router'

const SigninForm = () => {
  // const router = useRouter()
  // const classes = SignStyles()

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ marginTop: 10, padding: 5 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="h5">เข้าสู่ระบบ</Typography>
            </Grid>
            <Grid item>
              <Typography>
                เพื่อความปลอดภัย กรุณาล็อกอินเข้าสู่ระบบเพื่อดูรายละเอียดของท่าน
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SigninWithPassword />
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={
                  <Image
                    src="/icons/google-logo-v2.svg"
                    alt="Facebook icon"
                    width={22}
                    height={22}
                  />
                }
                variant="outlined"
                fullWidth
                size="large"
                style={{ borderColor: '#c53627', color: '#c53627' }}>
                Sign with Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={
                  <Image
                    src={'/icons/facebook-logo.svg'}
                    alt="Facebook icon"
                    width={22}
                    height={22}
                  />
                }
                variant="outlined"
                fullWidth
                size="large"
                style={{
                  borderColor: 'rgb(83, 146, 249)',
                  color: 'rgb(83, 146, 249)'
                }}>
                Sign with Facebook
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                ท่านยอมรับ{' '}
                <Link href={`${RoutesPath.PRIVACY_POLICY}`}>
                  ข้อกำหนดการใช้งาน
                </Link>{' '}
                และ{' '}
                <Link href={`${RoutesPath.PRIVACY_POLICY}`}>
                  นโยบายความเป็นส่วนตัว
                </Link>{' '}
                ของไอดีไนน์พรอพเพอที เมื่อดำเนินการต่อ
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export { SigninForm }
