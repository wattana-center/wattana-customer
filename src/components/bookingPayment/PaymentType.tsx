import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material'

import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#C99400',
    height: '100%'
  },
  media: {
    // width: '100%',
    // height: 24
  }
})

const iconType = [
  'Icon-metro-credit-card.png',
  'Icon-payment-bank-transfer.png'
]

const textType = ['บัตรเครดิต/เดบิต', 'โอนเงิน']

type PaymentTypeProps = {
  current: 'BT' | 'CC'
  type: 'BT' | 'CC'
  setType: (v: 'BT' | 'CC') => void
}

const PaymentType: React.FC<PaymentTypeProps> = (props) => {
  const { type = 'CC', current } = props

  const classes = useStyles()

  const number = current === 'CC' ? 0 : 1

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            props.setType(current)
          }}>
          <CardContent>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: 100, margin: '40px 0' }}>
              <Grid item>
                <div style={{ height: 100, width: 100 }}>
                  <Image
                    alt="icon"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    src={`/icons/${iconType[number]}`}
                  />
                </div>
              </Grid>
            </Grid>

            <FormGroup>
              <FormControlLabel
                style={{ color: '#fff' }}
                control={
                  <Checkbox
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#fff'
                      }
                    }}
                    checked={current === type}
                  />
                }
                label={textType[number]}
              />
            </FormGroup>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export { PaymentType }
