import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'

import { LocalSwal } from '@app/libs'
import { TextFieldPhoneNumber } from '..'
import firebase from 'firebase/app'
import { useAuthUser } from 'next-firebase-auth'

type PropertyTwoProps = {
  row: ReactNode[]
}

const PropertyTwo: React.FC<PropertyTwoProps> = ({ row }) => {
  return (
    <div>
      <Grid container direction="row" spacing={2} alignItems="center">
        {row.map((v, i) => (
          <Grid item key={i} md={i === 0 ? 3 : true} xs={12}>
            {v}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

type ProfileState = {
  displayName: string
  tel: string
  email: string
  status: boolean
}

const Property: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    displayName: '',
    email: '',
    tel: '',
    status: false
  })

  const user = useAuthUser()

  const onSave = async () => {
    if (user.phoneNumber !== profile.tel) {
      firebase.auth().settings.appVerificationDisabledForTesting = true

      const verifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          callback: (response) => console.log('callback', response),
          size: 'invisible'
        }
      )
      const phoneProvider = new firebase.auth.PhoneAuthProvider()

      const id = await phoneProvider.verifyPhoneNumber(profile.tel, verifier)

      const code = window.prompt('Bitte zugeschickten Code eingeben')

      const cred = firebase.auth.PhoneAuthProvider.credential(id, code)
      await user.firebaseUser.updatePhoneNumber(cred)
      console.log('phone number changed', id, cred, user)
    }

    user.firebaseUser
      .updateProfile({
        displayName: profile.displayName
      })
      .then(() => {
        LocalSwal.fire('ดำเนินการบันทึกเรียบร้อย', '', 'success')
      })
      .catch((error) => {
        LocalSwal.fire({
          icon: 'error',
          title: `Oops...`,
          text: `Something went wrong! \n ${error.message}`
        })
      })
  }

  useEffect(() => {
    if (user.id) {
      setProfile({
        displayName: user.displayName ? user.displayName : '',
        email: user.email ? user.email : '',
        tel: user.phoneNumber ? user.phoneNumber : '',
        status: user.emailVerified ? user.emailVerified : false
      })
    }
  }, [user])

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">ข้อมูลส่วนตัว</Typography>
            <Divider orientation="horizontal" flexItem />
            <PropertyTwo
              row={[
                <Typography>ชื่อ - นามสกุล</Typography>,
                <TextField
                  fullWidth
                  id="display-name"
                  variant="standard"
                  value={profile.displayName}
                  onChange={(e) => {
                    setProfile((prve) => ({
                      ...prve,
                      displayName: e.target.value
                    }))
                  }}
                />
              ]}
            />
            <PropertyTwo
              row={[
                <Typography>เบอร์โทร</Typography>,
                <TextFieldPhoneNumber
                  value={profile.tel}
                  onChange={(e) => {
                    setProfile((prve) => ({
                      ...prve,
                      tel: e
                    }))
                  }}
                />
              ]}
            />
            <div id="recaptcha-container"></div>
            <PropertyTwo
              row={[
                <Typography>อีเมล</Typography>,
                <TextField
                  fullWidth
                  disabled
                  id="tel-phone"
                  variant="standard"
                  value={profile.email}
                  onChange={(e) => {
                    setProfile((prve) => ({
                      ...prve,
                      email: e.target.value
                    }))
                  }}
                />
              ]}
            />
            <PropertyTwo
              row={[
                <Typography>สถานะ</Typography>,
                <FormGroup>
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        checked={profile.status === true ? true : false}
                      />
                    }
                    label="ยืนยันแล้ว"
                  />
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        checked={profile.status === false ? true : false}
                      />
                    }
                    label="ยังไม่ได้ยืนยัน"
                  />
                </FormGroup>
              ]}
            />
            <Button
              variant="text"
              size="large"
              onClick={() => {
                onSave()
              }}>
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export { Property }
