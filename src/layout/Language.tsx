import { Button, Icon, Menu, MenuItem } from '@mui/material'

import React from 'react'
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

const Language: React.FC = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [languageText, setLanguageText] = React.useState<string>('Englist')
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const router = useRouter()

  const handleClose = (val: string) => {
    if (val === 'Englist') router.push(router.pathname, '', { locale: 'en' })
    else router.push(router.pathname, '', { locale: 'th' })
    setLanguageText(val)
    setAnchorEl(null)
  }

  return (
    <div className={classes.overview}>
      <Button
        className={classes.signOutButton}
        aria-controls="language-options"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<Icon>arrow_drop_down</Icon>}>
        {languageText}
      </Button>
      <Menu
        id="language-options"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(languageText)}>
        <MenuItem onClick={() => handleClose('Englist')}>Englist</MenuItem>
        <MenuItem onClick={() => handleClose('Thailand')}>Thailand</MenuItem>
      </Menu>
    </div>
  )
}

export { Language }
