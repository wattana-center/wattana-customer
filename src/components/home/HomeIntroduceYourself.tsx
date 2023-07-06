import React from 'react'
import { SimpleSlider } from './SimpleSlider'
import { WattanaTheme } from '@app/config'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#339790',
    minHeight: 400,
    marginBottom: 10,
    [WattanaTheme.breakpoints.down('lg')]: {
      minHeight: 200
    }
  },
  content: {
    backgroundColor: '#339790'
  },
  contentHeader: {
    padding: '10px 5px 20px 30px'
  },
  contentBody: {
    marginBottom: 'auto'
  }
}))

const HomeIntroduceYourself: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <SimpleSlider />
      </div>
    </>
  )
}

export { HomeIntroduceYourself }
