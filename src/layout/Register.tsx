import { Button, Icon } from '@mui/material'

import React from 'react'
import { RoutesPath } from '@app/config'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  overview: {
    width: '100%',
    flexGrow: 1
  },
  signOutButton: {
    color: '#fff',
    height: 72
  }
}))

const Register: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()

  return (
    <div className={classes.overview}>
      <Button
        className={classes.signOutButton}
        aria-controls="language-options"
        aria-haspopup="true"
        onClick={() => router.push(RoutesPath.AUTHEN.SING_IN)}
        startIcon={<Icon>account_circle</Icon>}>
        สร้างบัญชีผู้ใช้
      </Button>
    </div>
  )
}

export { Register }
