import React, { useEffect } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import { NextPage } from 'next'
import { RoutesPath } from '@app/config'
import { SigninForm } from '@app/components/sign/SigninForm'
import { useRouter } from 'next/router'

const SigninPage: NextPage = () => {
  const router = useRouter()
  const user = useAuthUser()

  useEffect(() => {
    if (user.id != null) router.push(RoutesPath.HOME)
  }, [user])

  if (user.id == null) return <SigninForm />

  return <></>
}

export default withAuthUser()(SigninPage)
