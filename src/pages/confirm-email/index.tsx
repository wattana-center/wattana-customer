import { Container, Typography } from '@mui/material'

import { LocalSwal } from '@app/libs'
import { NextPage } from 'next'
import React from 'react'
import { RoutesPath } from '@app/config'
import { UsersApi } from '@app/apis/users-api'
import { useRouter } from 'next/router'

const ConfirmEemailPage: NextPage = () => {
  const router = useRouter()
  const userApi = new UsersApi()

  const { token } = router.query

  React.useEffect(() => {
    userApi
      .confirmEmail(token as string)
      .then((res) => {
        if (res.status === 200) {
          LocalSwal.fire(
            'ดำเนินการยืนยันสมาชิกเรียบร้อย',
            `ระบบกำลังนำท่านกลับเมนูหลัก`,
            'success'
          ).then(() => {
            router.push(RoutesPath.HOME)
          })
        }
      })
      .catch((error) => {
        LocalSwal.fire({
          icon: 'error',
          title: `Oops...`,
          text: `Something went wrong! \n ${error.message}`
        }).then(() => {
          router.push(RoutesPath.HOME)
        })
      })
    return () => {
      //
    }
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Typography></Typography>
      </Container>
    </>
  )
}

export default ConfirmEemailPage
