import { Container, Grid, IconButton, Typography } from '@mui/material'
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube
} from '@mui/icons-material'
import { RoutesPath, WattanaTheme } from '@app/config'

import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    [WattanaTheme.breakpoints.down('md')]: {
      display: 'none'
    },
    backgroundColor: '#515A5A',
    color: WattanaTheme.palette.primary.contrastText,
    paddingTop: 30,
    paddingBottom: 30,
    // clear: 'both',
    // position: 'relative',
    // bottom: 0,
    width: '100%',
    '& svg': {
      margin: WattanaTheme.spacing(1.5)
    },
    '& hr': {
      margin: WattanaTheme.spacing(0, 0.5)
    }
  },
  applicationIcon: {
    height: 42
  },
  iconsFollow: {
    '& div > button': {
      padding: WattanaTheme.spacing(0),
      margin: WattanaTheme.spacing(0),
      '& svg': {
        padding: WattanaTheme.spacing(0),
        margin: WattanaTheme.spacing(0)
      }
    }
  }
}))

const Footer: React.FC<any> = (props) => {
  const { className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <footer {...rest} className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Grid container direction="column">
          <Grid item container justifyContent="space-between">
            <Grid item container direction="column" spacing={1} sm={6} xs={12}>
              <Grid item>
                <Typography>Download ID9 Property App</Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item>
                  <img
                    className={classes.applicationIcon}
                    src="/button/google-play-badge-en.png"
                    alt="Google play"
                  />
                </Grid>
                <Grid item>
                  <img
                    className={classes.applicationIcon}
                    src="/button/ios-store-badge-en.png"
                    alt="IOS store"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1} sm={6} xs={12}>
              <Grid item>
                <Typography>Follow Us</Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                justifyContent="flex-start"
                className={classes.iconsFollow}>
                <Grid item>
                  <IconButton
                    color="primary"
                    aria-label="facebook"
                    onClick={() => {
                      window.open('https://www.facebook.com/', '_blank')
                    }}
                    size="large">
                    <Facebook />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    aria-label="Instagram"
                    size="large">
                    <Instagram />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="primary" aria-label="youtube" size="large">
                    <YouTube />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="primary" aria-label="twitter" size="large">
                    <Twitter />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    aria-label="linked-in"
                    size="large">
                    <LinkedIn />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item container direction="column" spacing={1} sm={3} xs={12}>
              <Grid item>
                <Typography>For Customer ID9 Property</Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                justifyContent="flex-start"
                direction="column">
                <Grid item>
                  <Typography variant="caption">Customer website</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction="column" spacing={1} sm={3} xs={12}>
              <Grid item>
                <Typography>For Business ID9 Property</Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                justifyContent="flex-start"
                direction="column">
                <Grid item>
                  <Typography variant="caption">Help Center</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">Business website</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction="column" spacing={1} sm={3} xs={12}>
              <Grid item>
                <Typography>Payment Methods</Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                justifyContent="flex-start"
                direction="column">
                <Grid item>
                  <Typography variant="caption">About us, History</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction="column" spacing={1} sm={3} xs={12}>
              <Grid item>
                <Typography>About ID9 Property</Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                justifyContent="flex-start"
                direction="column"
                style={{ textDecoration: 'underline' }}>
                <Grid item>
                  <Typography variant="caption">About us, History</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">Contact Us</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">Helps</Typography>
                </Grid>
                <Grid item>
                  <Link href={RoutesPath.PRIVACY_POLICY}>
                    <Typography variant="caption">Privacy Policy</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between">
            <Grid item>
              <Typography>
                Copyright @2010-2020 ID9 GROUP Co., Ltd. All right reserved.
                Terms & ConditionsPrivacy Policy
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link href={router.pathname} locale="th">
                  TH
                </Link>
                /
                <Link href={router.pathname} locale="en">
                  EN
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
