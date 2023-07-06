import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import { NextPage } from 'next'
import { Property } from '@app/components'
import React from 'react'

const Profile: NextPage = () => {
  const user = useAuthUser()

  if (user.id !== null) return <Property />

  return <></>
}

export default withAuthUser()(Profile)
