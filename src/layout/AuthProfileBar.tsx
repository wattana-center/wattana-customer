import { Avatar, Button, Grid, Typography } from '@mui/material'

import Link from 'next/link'
import { LockOpenOutlined } from '@mui/icons-material'
import { MenuProfileBar } from '.'
import React from 'react'
import { RoutesPath } from '@app/config'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'

interface IUserInfo {
  displayName: string
  email: string
  photoURL: string
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       flexGrow: 1
//     },
//     facebook: {
//       color: '#2185D0'
//     },
//     margin: {
//       margin: theme.spacing(0.5, 0, 0, 0)
//     },
//     signOutButton: {
//       color: '#fff',
//       height: 72
//       // marginLeft: theme.spacing(1)
//     },
//     large: {
//       width: theme.spacing(7),
//       height: theme.spacing(7)
//     },
//     text: {
//       color: '#fff',
//       margin: 0
//     }
//   })
// )

export const AuthProfileBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // const classes = useStyles()
  const profile = useAuthUser()

  const route = useRouter()

  const [userInfo, setUserInfo] = React.useState<IUserInfo | null>(null)

  React.useEffect(() => {
    if (profile) {
      setUserInfo({
        displayName: profile?.displayName as string,
        photoURL: profile?.photoURL as string,
        email: profile?.email as string
      })

      // if (!profile?.emailVerified) {
      //   if (
      //     route.pathname !== RoutesPath.AUTHEN.CONFIRM_EMAIL &&
      //     route.pathname !== RoutesPath.AUTHEN.SIGN_UP &&
      //     route.pathname !== RoutesPath.AUTHEN.SING_IN
      //   ) {
      //     LocalSwal.fire({
      //       title: 'โปรดยืนยันอีเมล',
      //       text: 'ท่านยังไม่ได้ยืนยันอีเมล กรุณายืนยันอีเมลตามที่อยู่อีเมลที่ได้สมัครไว้!',
      //       icon: 'warning',
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: 'Yes!'
      //     }).then(() => {
      //       route.push(RoutesPath.AUTHEN.CONFIRM_EMAIL)
      //     })
      //   }
      // }
    } else {
      setUserInfo(null)
    }
  }, [profile])

  return (
    <>
      <MenuProfileBar setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
      {userInfo != null ? (
        <Button onClick={handleClick}>
          <Grid container alignItems="center" spacing={2}>
            {userInfo.photoURL ? (
              <Grid item xs>
                <Avatar alt={userInfo.displayName} src={userInfo.photoURL} />
              </Grid>
            ) : (
              <Grid container item xs alignItems="flex-end" direction="column">
                <Grid item>
                  <Typography
                    sx={{
                      color: '#fff'
                    }}>
                    {userInfo.displayName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: '#fff'
                    }}>
                    {userInfo.email}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Button>
      ) : (
        <Link href={RoutesPath.AUTHEN.SING_IN}>
          <Button
            sx={{
              color: '#fff',
              height: 72
            }}
            startIcon={<LockOpenOutlined />}>
            ลงชื่อเข้าใช้งาน
          </Button>
        </Link>
      )}
    </>
  )
}
