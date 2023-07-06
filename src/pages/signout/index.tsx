import { Grid, Typography } from '@mui/material'

import { NextPage } from 'next'
import React from 'react'

const Signout: NextPage = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="space-between">
          <Typography align="center">Logout</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Signout
