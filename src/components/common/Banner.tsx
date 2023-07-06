import { Container } from '@mui/material'
import React from 'react'
import { SearchBooking } from '.'
import { WattanaTheme } from '@app/config'
import { styled } from '@mui/system'

const Main = styled('div')({
  [WattanaTheme.breakpoints.up('md')]: {
    maxHeight: 430
  },
  [WattanaTheme.breakpoints.down('md')]: {
    maxHeight: 460
  },

  [WattanaTheme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    paddingRight: 0
  },
  backgroundColor: 'rgba(0, 0, 0, 0.8)'
})

const ImagesBanner = styled('div')({
  width: '100%',
  background: `url('/images/background-banner.png')`,
  backgroundPosition: 'center'
})

const Banner: React.FC = () => {
  return (
    <Main>
      <ImagesBanner>
        <Container maxWidth="lg">
          <SearchBooking />
        </Container>
      </ImagesBanner>
    </Main>
  )
}

export { Banner }
