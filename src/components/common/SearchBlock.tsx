import { InputBase } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: WattanaTheme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [WattanaTheme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: WattanaTheme.shape.borderRadius,
    // backgroundColor: fade(WattanaTheme.palette.common.black, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(WattanaTheme.palette.common.black, 0.25)
    // },
    marginLeft: 0,
    width: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      marginLeft: WattanaTheme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: WattanaTheme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: WattanaTheme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${WattanaTheme.spacing(4)}px)`,
    transition: WattanaTheme.transitions.create('width'),
    width: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const SearchBlock: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  )
}

export { SearchBlock }
