import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'

import { AccountCircle } from '@mui/icons-material'
import React from 'react'
import { SignStyles } from './SignStyles'
import validator from 'validator'

const ForgotPassword: React.FC = () => {
  const classes = SignStyles()

  const [email, setEmail] = React.useState<string>('')
  const [texterror, setTexterror] = React.useState<string>('')

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateEmail(email)
  }

  const handleTextFieldOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setEmail(value)
  }

  const validateEmail = (value: string): boolean => {
    if (!validator.isEmail(value)) {
      setTexterror('อีเมลล์ไม่ถูกต้อง')
      return false
    } else {
      setTexterror('')
      return true
    }
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="space-between"></Grid>
        <div className={classes.root}>
          <form onSubmit={onFormSubmit}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="space-between">
              <Grid item>
                <Typography align="center">ขอรหัสผ่านใหม่</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  กรอกอีเมลที่เคยใช้สมัครสมาชิกไว้และรอรับอีเมลตั้งรหัสผ่านใหม่จากเรา
                </Typography>
                <Typography>
                  *ไอดีที่สมัครผ่าน Facebook ให้กรอก E-mail ที่ใช้สมัคร Facebook
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="email"
                  value={email}
                  onChange={handleTextFieldOnChange}
                  helperText={texterror}
                  error={texterror !== ''}
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  margin="none"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}

export { ForgotPassword }
