import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material'
import { AuthProfileBar, Language, Register } from '.'
import React, { useEffect, useState } from 'react'
import { RoutesPath, WattanaTheme } from '@app/config'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import SendIcon from '@mui/icons-material/Send'
import { Widgets } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  active: {
    '& p': {
      color: WattanaTheme.palette.secondary.main
    },
    fontWeight: WattanaTheme.typography.fontWeightMedium
  },
  linkText: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase'
  },
  menuButton: {
    marginRight: WattanaTheme.spacing(2)
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 'auto'
  },
  navToolbar: {
    color: WattanaTheme.palette.primary.main
  },
  header: {
    backgroundColor: WattanaTheme.palette.primary.main,
    color: WattanaTheme.palette.primary.contrastText
  },
  headerCol: {
    padding: WattanaTheme.spacing(1, 0)
  },
  icons: { fontSize: 36, color: '#FBB451' },
  img: {
    width: 243,
    height: 80,
    background: `url(${process.env.PUBLIC_URL + '/images/ID9_002.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
}))

const Navigator: React.FC = () => {
  const auth = useAuthUser()
  const router = useRouter()
  const classes = useStyles()

  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <div className={classes.header}>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Box display="flex">
                <div
                  className={classes.img}
                  onClick={() => router.push('/')}></div>
              </Box>
              <Box
                display="flex"
                flexDirection="row-reverse"
                alignItems="center"
                pt={0.5}
                pb={0.5}>
                {/* <Hidden smDown> */}
                {!auth.id && (
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Register />
                  </Box>
                )}
                {auth.id && (
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <AuthProfileBar />
                  </Box>
                )}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Language />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <Icon onClick={() => setDrawer(true)}>menu</Icon>
                </Box>
              </Box>
            </Stack>
          </Container>
        </div>
        <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
          {!auth.id && (
            <List>
              {['เข้าสู่ระบบ'].map((text, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => router.push(RoutesPath.AUTHEN.SING_IN)}>
                  <ListItemIcon>
                    <Icon>menu_open</Icon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          )}
          {auth.id && (
            <List>
              <ListItem
                button
                onClick={async () => {
                  router.push(RoutesPath.PROFILE.INDEX)
                }}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={'ข้อมูลส่วนตัว'} />
              </ListItem>
              <ListItem
                button
                onClick={async () => {
                  router.push(RoutesPath.PROFILE.MANAMENT)
                }}>
                <ListItemIcon>
                  <Widgets fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={'รายการการจอง'} />
              </ListItem>

              <ListItem
                button
                onClick={async () => {
                  auth.signOut()
                }}>
                <ListItemIcon>
                  <InboxIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={'ออกจากระบบ'} />
              </ListItem>
            </List>
          )}

          <Divider />
          <List>
            {['About us, History', 'Contact Us', 'Helps', 'Privacy Policy'].map(
              (text, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <Icon>menu_open</Icon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
        </Drawer>
      </AppBar>
    </React.Fragment>
  )
}

const Nav = withAuthUser()(Navigator)

export { Nav as Navigator }
