import { Step, StepLabel, Stepper } from '@mui/material'

import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: 20
  }
})

const steps = ['ข้อมูลผู้เข้าพัก', 'ข้อมูลการชำระเงิน', 'ยืนยันการจอง']

type BookingInfoStepperProps = {
  activeStep?: number
}

const BookingInfoStepper: React.FC<BookingInfoStepperProps> = (props) => {
  const { activeStep = 0 } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export { BookingInfoStepper }
