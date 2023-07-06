import { AccountCircle, LockOpenOutlined } from '@mui/icons-material'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'

import { LocalSwal } from '@app/libs'
import React from 'react'
import { RoutesPath } from '@app/config'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import validator from 'validator'

const SigninWithPassword: React.FC = () => {
  const router = useRouter()

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [texterror, setTexterror] = React.useState({
    email: '',
    password: ''
  })

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handlePassowrdOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const vEmail = validateEmail(email)
    const vPassword = validatePassword(password)

    if (vEmail && vPassword) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push(RoutesPath.HOME)
        })
        .catch((error) => {
          LocalSwal.fire({
            icon: 'error',
            title: `Oops...`,
            text: `Something went wrong! \n ${error.message}`
          })
        })
    }
  }

  const validateEmail = (value: string) => {
    if (!validator.isEmail(value)) {
      setTexterror((prev) => ({ ...prev, email: 'อีเมลล์ไม่ถูกต้อง' }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, email: '' }))
      return true
    }
  }

  const validatePassword = (value: string) => {
    if (value.length < 1) {
      setTexterror((prev) => ({ ...prev, password: 'กรุณากรอกรหัสผ่าน' }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, password: '' }))
      return true
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="space-between">
        <Grid item>
          <TextField
            value={email}
            onChange={handleEmailOnChange}
            helperText={texterror.email}
            error={texterror.email !== ''}
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
        <Grid item>
          <TextField
            value={password}
            onChange={handlePassowrdOnChange}
            helperText={texterror.password}
            error={texterror.password !== ''}
            fullWidth
            placeholder="Password"
            variant="outlined"
            margin="none"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth size="large" type="submit">
            Sign In
          </Button>
        </Grid>
        <Grid item container>
          <Grid item xs={12} sm={6}>
            <Button
              variant="text"
              size="large"
              onClick={() => {
                router.push(RoutesPath.AUTHEN.SIGN_UP)
              }}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <Button
              variant="text"
              size="large"
              onClick={() => router.push(RoutesPath.AUTHEN.FORGOT_PASSWORD)}>
              Forgot password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export { SigninWithPassword }
