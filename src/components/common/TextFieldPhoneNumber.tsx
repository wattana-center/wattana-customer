import 'react-phone-number-input/style.css'

import React, { forwardRef } from 'react'

import PhoneInput from 'react-phone-number-input'
import { TextField } from '@mui/material'

const phoneInput = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      variant="standard"
      name="phone"
    />
  )
}

const phoneInputOutlined = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      variant="outlined"
      name="phone"
      size="small"
    />
  )
}

const CustomPhoneNumber = forwardRef(phoneInput)
const CustomPhoneNumberOutlined = forwardRef(phoneInputOutlined)

type TextFieldPhoneNumberProps = {
  value: string
  onChange: (val: string) => void
  variant?: 'outlined' | 'standard'
}

const TextFieldPhoneNumber: React.FC<TextFieldPhoneNumberProps> = (props) => {
  const { value, onChange, variant = 'standard' } = props

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={onChange}
      inputComponent={
        variant === 'standard' ? CustomPhoneNumber : CustomPhoneNumberOutlined
      }
    />
  )
}

export { TextFieldPhoneNumber }
