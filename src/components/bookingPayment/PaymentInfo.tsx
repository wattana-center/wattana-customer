import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@mui/material'
import {
  Colors,
  OMISE_CURRENCY,
  OMISE_DEFAULTPAYMENTMETHOD,
  OMISE_FRAMELABEL,
  OMISE_PUBLICKEY,
  RoutesPath,
  WattanaTheme
} from '@app/config'
import React, { useEffect, useState } from 'react'

import { PaymentType } from '.'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      height: 260
    }
  },
  title: {
    color: '#C99400'
  },
  border: {
    borderColor: '#C99400',
    marginTop: 20,
    marginBottom: 20
  },
  bt: {
    background: Colors.primaryColor,
    fontSize: 16
  },
  img: {
    [WattanaTheme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  room: {
    [WattanaTheme.breakpoints.up('sm')]: {
      paddingRight: 20
    }
  }
}))

type PaymentInfoProps = {
  amount: number
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ amount }) => {
  const classes = useStyles()
  const router = useRouter()

  const [type, setType] = useState<'BT' | 'CC'>('BT')

  // const [omiseToken, setOmiseToken] = useState<any>()
  // const [omiseSource, setOmiseSource] = useState<any>()
  const submitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    const { OmiseCard } = window
    OmiseCard.configure({
      publicKey: OMISE_PUBLICKEY
    })

    OmiseCard.open({
      amount: amount * 100,
      currency: OMISE_CURRENCY,
      frameLabel: OMISE_FRAMELABEL,
      defaultPaymentMethod: OMISE_DEFAULTPAYMENTMETHOD,
      onCreateTokenSuccess: (nonce: string) => {
        if (nonce.startsWith('tokn_')) {
          ;(document.getElementById('omiseToken') as HTMLInputElement).value =
            nonce
        } else {
          ;(document.getElementById('omiseSource') as HTMLInputElement).value =
            nonce
        }

        ;(document.getElementById('checkoutForm') as HTMLFormElement).submit()
      },
      onFormClosed: () => {
        // console.log('close')
      }
    })
    e.preventDefault()
  }

  useEffect(() => {
    // initPayment()
  }, [])

  return (
    <>
      <Card style={{ height: '100%' }}>
        <Grid
          style={{ height: '100%' }}
          container
          direction="column"
          justifyContent="space-between">
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">ชำระเงิน</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">เลือกวิธีชำระเงิน</Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <PaymentType
                    current={'CC'}
                    type={type}
                    setType={(v) => setType(v)}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <PaymentType
                    current={'BT'}
                    type={type}
                    setType={(v) => setType(v)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item>
            <CardContent style={{ textAlign: 'center' }}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="ท่านยอมรับ ข้อกำหนดการใช้งาน และนโยบายความเป็นส่วนตัว เพื่อดำเนินการต่อ"
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              {type === 'CC' ? (
                <form
                  id="checkoutForm"
                  method="GET"
                  action={RoutesPath.BOOKING.CONFIRM.replace(
                    '{id}',
                    router.query.id as string
                  )}
                  onSubmit={submitPayment}>
                  <input type="hidden" name="omiseToken" id="omiseToken" />
                  <input type="hidden" name="omiseSource" id="omiseSource" />
                  <input
                    type="hidden"
                    name="paymentType"
                    id="paymentType"
                    value="CC"
                  />
                  <Button
                    type="submit"
                    id="checkout-payment-button"
                    className={classes.bt}
                    size="medium"
                    variant="contained">
                    ชำระเงิน
                  </Button>
                </form>
              ) : (
                <Button
                  id="checkout-payment-button"
                  className={classes.bt}
                  size="medium"
                  variant="contained"
                  onClick={() => {
                    router.push({
                      pathname: RoutesPath.BOOKING.CONFIRM.replace(
                        '{id}',
                        router.query.id as string
                      ),
                      query: { paymentType: 'BT' }
                    })
                  }}>
                  ชำระเงิน
                </Button>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export { PaymentInfo }
