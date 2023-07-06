import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography
} from '@mui/material'
import { Colors, RoutesPath, WattanaTheme } from '@app/config'

import { Banner } from '@app/components/common'
import { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

type Provice = {
  name: string
  label: string
  lat: string
  lng: string
  radius: string
}

const provice: Provice[] = [
  {
    name: 'กรุงเทพ',
    label: '',
    lat: '13.7245601',
    lng: '100.4930288',
    radius: ''
  },
  { name: 'ปริมณฑล', label: '', lat: '', lng: '', radius: '' },
  { name: 'ภาคกลาง', label: '', lat: '', lng: '', radius: '' },
  { name: 'ภาคเหนือ', label: '', lat: '', lng: '', radius: '' },
  {
    name: 'ภาคตะวันออกเฉียงเหนือ',
    label: '',
    lat: '',
    lng: '',
    radius: ''
  },
  { name: 'ภาคใต้', label: '', lat: '', lng: '', radius: '' },
  { name: 'ภาคตะวันออก', label: '', lat: '', lng: '', radius: '' },
  { name: 'ภาคตะวันตก', label: '', lat: '', lng: '', radius: '' }
]

const Home: NextPage = () => {
  const router = useRouter()

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
            <Stack spacing={2} justifyContent="space-between" direction="row">
              <Typography variant="h5">ค้นหาตามภูมิภาค</Typography>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="h5">แผนที่</Typography>
                <Icon>map</Icon>
              </Stack>
            </Stack>

            <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

            <Grid container spacing={2}>
              {provice.map((v, i) => (
                <Grid item xs={3} key={i}>
                  <Button
                    onClick={() => {
                      router.push({
                        pathname: RoutesPath.BOOKING.INDEX,
                        query: {
                          ...router.query,
                          name: v.name,
                          label: v.label,
                          lat: v.lat,
                          lng: v.lng,
                          radius: v.radius
                        }
                      })
                    }}
                    sx={{
                      background: '#fff',
                      color: '#000',
                      '&:hover': {
                        background: Colors.primaryColor,
                        color: '#fff'
                      }
                    }}
                    fullWidth
                    size="large"
                    variant="contained">
                    {v.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
