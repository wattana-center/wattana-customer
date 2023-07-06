import { grey, red } from '@mui/material/colors'

import { createTheme } from '@mui/material'

// Create a theme instance.
const BaseTheme = createTheme({
  palette: {
    primary: {
      light: '#625d5b',
      main: '#3B3533',
      dark: '#292523',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff9773',
      main: '#FF7D51',
      dark: '#b25738',
      contrastText: '#fff'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    },
    warning: {
      main: '#FBB451'
    }
  },
  typography: {
    fontFamily: 'Kanit, Arial, Helvetica, sans-serif'
  }
})

const WattanaTheme = createTheme({
  ...BaseTheme,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderBottom: `2px solid ${BaseTheme.palette.primary.main}`,
          width: '100%',
          [BaseTheme.breakpoints.up('md')]: {
            width: 'auto'
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          borderRadius: BaseTheme.spacing(2)
        }
      }
    },
    MuiPaper: {
      variants: [],
      defaultProps: {
        sx: {
          // backgroundColor: grey[50]
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          backgroundColor: grey[50]
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          '& .MuiInputBase-root': {
            backgroundColor: grey[50]
          }
        }
      },
      styleOverrides: {
        root: {
          '&.MuiInputBase-root': {
            backgroundColor: grey[50]
          }
          // backgroundColor: grey[50],
          // borderRadius: BaseTheme.spacing(1)
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // backgroundColor: grey[50]
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: BaseTheme.spacing(3, 0)
        }
      }
    }
  }
})

export { WattanaTheme }
