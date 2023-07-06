import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'

const SignStyles = makeStyles(() => ({
  root: {
    width: 500,
    marginTop: WattanaTheme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  boxLogo: {
    textAlign: 'center'
  },
  logo: {
    height: 180,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  resetPassword: {
    textDecoration: 'inherit'
  },
  button: {
    width: 400,
    [WattanaTheme.breakpoints.down('md')]: { width: '100%' },
    [WattanaTheme.breakpoints.up('lg')]: { width: 550 }
  }
}))

export { SignStyles }
