import 'firebase/auth'

import { AccountCircle, LockOpenOutlined } from '@mui/icons-material'
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material'

import { LocalSwal } from '@app/libs'
import React from 'react'
import { RoutesPath } from '@app/config'
import { UsersApi } from '@app/apis/users-api'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import firebase from 'firebase/app'
import { useLoading } from '..'
import { useRouter } from 'next/router'
import validator from 'validator'

const SignupForm: React.FC = () => {
  const userApi = new UsersApi()
  const [account, setAccount] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [texterror, setTexterror] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayNmae: ''
  })

  const router = useRouter()
  const loading = useLoading()

  const handleTextFieldOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    const name = e.target.name
    setAccount((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const vEmail = validateEmail(account.email)
    const vPassword = validatePassword(account.password)
    const vConfirm = validateConfirmPassword(
      account.password,
      account.confirmPassword
    )
    loading.open()

    if (vEmail && vPassword && vConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then(async (res) => {
          const token = await res.user.getIdToken()
          userApi.token = token
          userApi
            .virifyEmail({ email: res.user.email })
            .then(() => {
              LocalSwal.fire(
                'ดำเนินการสมัครสมาชิกเรียบร้อย',
                `เราได้ส่งจดหมายยืนยันตัวตนไปที่ ${account.email} กรุณายืนยันตัวตน`,
                'success'
              ).then(() => {
                router.push(RoutesPath.AUTHEN.CONFIRM_EMAIL)
              })
            })
            .catch((error) => {
              LocalSwal.fire({
                icon: 'error',
                title: `Oops...`,
                text: `Something went wrong! \n ${error.message}`
              })
            })
        })
        .catch((error) => {
          LocalSwal.fire({
            icon: 'error',
            title: `Oops...`,
            text: `Something went wrong! \n ${error.message}`
          })
        })
        .finally(() => {
          loading.close()
        })
    }
  }

  const validateEmail = (value: string): boolean => {
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

  const validateConfirmPassword = (password: string, confirm: string) => {
    if (password !== confirm) {
      setTexterror((prev) => ({
        ...prev,
        confirmPassword: 'กรุณากรอกรหัสผ่านให้ตรงกัน'
      }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, confirmPassword: '' }))
      return true
    }
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ marginTop: 10, padding: 5 }}>
          <form onSubmit={onFormSubmit}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">สมัครสมาชิก</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  เพื่อจองห้องพักได้ง่ายขึ้น พร้อมรับสิทธิพิเศษ
                  เฉพาะสมาชิกเท่านั้น
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="email"
                  value={account.email}
                  onChange={handleTextFieldOnChange}
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
                  name="password"
                  value={account.password}
                  onChange={handleTextFieldOnChange}
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
                <TextField
                  name="confirmPassword"
                  value={account.confirmPassword}
                  onChange={handleTextFieldOnChange}
                  helperText={texterror.confirmPassword}
                  error={texterror.confirmPassword !== ''}
                  fullWidth
                  placeholder="Confirm Password"
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
                <Typography>
                  ท่านยอมรับ{' '}
                  <Link href={`${RoutesPath.PRIVACY_POLICY}`}>
                    ข้อกำหนดการใช้งาน
                  </Link>{' '}
                  และ{' '}
                  <Link href={`${RoutesPath.PRIVACY_POLICY}`}>
                    นโยบายความเป็นส่วนตัว
                  </Link>{' '}
                  ของไอดีไนน์พรอพเพอที เมื่อดำเนินการต่อ
                </Typography>
              </Grid>
              <Grid item>
                <Link href={''}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit">
                    Sign Up
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href={RoutesPath.AUTHEN.SING_IN}>
                  <Button variant="contained" fullWidth size="large">
                    Back
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default SignupForm
